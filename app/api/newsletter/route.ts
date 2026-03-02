import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendNewsletterConfirmationEmail } from '@/lib/newsletter-confirmation';

const Schema = z.object({
  email: z.email(),
  role: z.string(),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  company: z.string().trim().optional(),
  token: z.string().optional(),
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { email, role, token, firstName, lastName, company } = parsed.data;
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
    console.warn('Newsletter captcha check skipped due to partial captcha configuration');
  }

  try {
    const origin = process.env.APP_URL ?? req.headers.get('origin') ?? '';
    await sendNewsletterConfirmationEmail({
      email,
      role,
      origin,
      ...(firstName ? { firstName } : {}),
      ...(lastName ? { lastName } : {}),
      ...(company ? { company } : {}),
    });
  } catch (err) {
    console.error('Failed to send confirmation email', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
