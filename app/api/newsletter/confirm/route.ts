import { NextResponse } from 'next/server';
import { createToken, saveSubscriber, verifyToken } from '@/lib/newsletter';
import { sendNewsletterEventToTwenty } from '@/lib/integrations/twenty';
import { renderEmailLayout, sendEmail } from '@/lib/email';
import type { NewsletterCrmEventDto } from '@/types/api/newsletter-crm';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const data = verifyToken(token);
  if (!data) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  await saveSubscriber(data);
  const source = data.role === 'whitepaper' ? 'whitepaper' : 'newsletter';
  const crmPayload: NewsletterCrmEventDto = {
    type: 'newsletter_confirmed',
    email: data.email,
    role: data.role,
    source,
    occurredAt: new Date().toISOString(),
    consentModel: 'double-opt-in',
  };
  void sendNewsletterEventToTwenty(crmPayload).catch((err) => {
    console.error('Failed to sync subscriber to Twenty', err);
  });

  try {
    const origin = process.env.APP_URL ?? req.headers.get('origin') ?? '';
    const unsubscribeToken = createToken(data.email, 'unsubscribe');
    const unsubscribeUrl = `${origin}/api/newsletter/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
    await sendEmail({
      to: data.email,
      subject: 'Newsletter Anmeldung bestätigt',
      text: `Vielen Dank für deine Bestätigung! Wenn du den Newsletter nicht mehr erhalten möchtest, kannst du dich hier abmelden: ${unsubscribeUrl}`,
      html: renderEmailLayout(
        'Newsletter Anmeldung bestätigt',
        `<p>Vielen Dank für deine Bestätigung!</p><p>Wenn du den Newsletter nicht mehr erhalten möchtest, kannst du dich <a href="${unsubscribeUrl}">hier abmelden</a>.</p>`,
      ),
    });
  } catch (err) {
    console.error('Failed to send confirmation email', err);
  }

  return NextResponse.json({ ok: true });
}
