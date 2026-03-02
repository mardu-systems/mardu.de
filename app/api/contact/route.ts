import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail } from '@/lib/email';
import { syncContactLeadToTwenty } from '@/lib/integrations/twenty';
import { sendNewsletterConfirmationEmail, splitFullName } from '@/lib/newsletter-confirmation';
import { normalizePhoneNumber } from '@/lib/phone';
import type { ContactRequestDto, ContactResponseDto } from '@/types/api/contact';

const PhoneSchema = z
  .string()
  .optional()
  .refine(
    (value) => value == null || value.trim().length === 0 || Boolean(normalizePhoneNumber(value)),
    'Invalid phone number format',
  )
  .transform((value) => normalizePhoneNumber(value));

const Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  phone: PhoneSchema,
  message: z.string().max(500).optional(),
  config: z.any().optional(),
  token: z.string().optional(),
  source: z.enum(['contact', 'wizard']).optional(),
  consent: z.boolean().optional(),
  newsletterOptIn: z.boolean().optional(),
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    const details = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ error: 'Invalid payload', details }, { status: 400 });
  }

  try {
    const { token, ...data } = parsed.data;
    const payload: ContactRequestDto = { ...data, token };
    const isDev = process.env.NODE_ENV === 'development';
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const shouldVerifyCaptcha = !isDev && Boolean(token && secret);

    if (shouldVerifyCaptcha) {
      const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secret}&response=${token}`,
      });
      const captchaJson = await captchaRes.json();
      if (!captchaJson.success) {
        return NextResponse.json({ error: 'Invalid captcha' }, { status: 400 });
      }
    } else if (!isDev && (token || secret)) {
      console.warn('Contact form captcha check skipped due to partial captcha configuration');
    }

    await sendContactEmail(payload);

    if (payload.newsletterOptIn) {
      const origin = process.env.APP_URL ?? req.headers.get('origin') ?? '';
      const { firstName, lastName } = splitFullName(payload.name);
      void sendNewsletterConfirmationEmail({
        email: payload.email,
        role: payload.source === 'wizard' ? 'whitepaper' : 'newsletter',
        origin,
        firstName,
        lastName,
        ...(payload.company ? { company: payload.company } : {}),
      }).catch((newsletterError) => {
        console.error('Failed to send newsletter confirmation from contact flow', newsletterError);
      });
    }

    void syncContactLeadToTwenty({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      phone: payload.phone,
      message: payload.message,
      source: payload.source,
      consent: payload.consent,
      newsletterOptIn: payload.newsletterOptIn,
    }).catch((crmError) => {
      console.error('Failed to sync contact lead to Twenty', crmError);
    });

    const response: ContactResponseDto = { ok: true };
    return NextResponse.json(response);
  } catch (err) {
    console.error('Failed to send contact email', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
