import { NextResponse } from 'next/server';
import { removeSubscriber, verifyToken } from '@/lib/newsletter';
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
  if (!data || data.role !== 'unsubscribe') {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  const removed = await removeSubscriber(data.email);
  const role = removed?.role ?? data.role;
  const source = role === 'whitepaper' ? 'whitepaper' : 'newsletter';
  const crmPayload: NewsletterCrmEventDto = {
    type: 'newsletter_unsubscribed',
    email: data.email,
    role,
    source,
    ...(removed?.firstName ? { firstName: removed.firstName } : {}),
    ...(removed?.lastName ? { lastName: removed.lastName } : {}),
    ...(removed?.company ? { company: removed.company } : {}),
    occurredAt: new Date().toISOString(),
    consentModel: 'double-opt-in',
  };
  void sendNewsletterEventToTwenty(crmPayload).catch((err) => {
    console.error('Failed to sync unsubscribe to Twenty', err);
  });

  try {
    await sendEmail({
      to: data.email,
      subject: 'Newsletter Abmeldung',
      text: 'Du hast dich erfolgreich vom Newsletter abgemeldet.',
      html: renderEmailLayout(
        'Newsletter Abmeldung',
        '<p>Du hast dich erfolgreich vom Newsletter abgemeldet.</p>',
      ),
    });
  } catch (err) {
    console.error('Failed to send unsubscribe email', err);
  }

  return NextResponse.json({ ok: true });
}
