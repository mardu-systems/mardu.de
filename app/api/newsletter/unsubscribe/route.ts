import { NextResponse } from 'next/server';
import { removeSubscriber, verifyToken } from '@/lib/newsletter';
import { sendNewsletterEventToTwenty } from '@/lib/integrations/twenty';
import { renderEmailLayout, sendEmail } from '@/lib/email';
import type { NewsletterCrmEventDto } from '@/types/api/newsletter-crm';

function redirectWithStatus(req: Request, status: string) {
  const url = new URL('/newsletter/abmeldung', req.url);
  url.searchParams.set('status', status);
  return NextResponse.redirect(url);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  if (!token) {
    return redirectWithStatus(req, 'missing-token');
  }

  const data = verifyToken(token);
  if (!data || data.role !== 'unsubscribe') {
    return redirectWithStatus(req, 'invalid-token');
  }

  let removed = null;
  try {
    removed = await removeSubscriber(data.email);
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
  } catch (err) {
    console.error('Failed to unsubscribe newsletter', err);
    return redirectWithStatus(req, 'error');
  }

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
    console.error('Failed to send newsletter unsubscribe follow-up email', err);
  }

  return redirectWithStatus(req, 'success');
}
