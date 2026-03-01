import { NextResponse } from 'next/server';
import { z } from 'zod';
import { type ContactEmailData, sendContactEmail } from '@/lib/email';
import { syncContactLeadToTwenty } from '@/lib/integrations/twenty';

const Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  config: z.any().optional(),
  token: z.string().optional(),
  source: z.enum(['contact', 'wizard']).optional(),
  consent: z.boolean().optional(),
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    const { token, ...data } = parsed.data as z.infer<typeof Schema>;
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

    await sendContactEmail(data as ContactEmailData);

    void syncContactLeadToTwenty({
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      source: data.source,
      consent: data.consent,
    }).catch((crmError) => {
      console.error('Failed to sync contact lead to Twenty', crmError);
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Failed to send contact email', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
