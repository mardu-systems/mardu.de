import { renderEmailLayout, sendEmail } from '@/lib/email';
import { createToken } from '@/lib/newsletter';

type SendNewsletterConfirmationEmailInput = {
  email: string;
  role: string;
  origin: string;
  firstName?: string;
  lastName?: string;
  company?: string;
};

export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { firstName: 'Unbekannt', lastName: 'Kontakt' };
  }

  const parts = trimmed.split(/\s+/);
  const firstName = parts.shift() ?? 'Unbekannt';
  const lastName = parts.join(' ').trim() || 'Kontakt';
  return { firstName, lastName };
}

export async function sendNewsletterConfirmationEmail({
  email,
  role,
  origin,
  firstName,
  lastName,
  company,
}: SendNewsletterConfirmationEmailInput): Promise<void> {
  const confirmToken = createToken(email, role, {
    ...(firstName ? { firstName } : {}),
    ...(lastName ? { lastName } : {}),
    ...(company ? { company } : {}),
  });

  const confirmUrl = `${origin}/api/newsletter/confirm?token=${encodeURIComponent(confirmToken)}`;
  await sendEmail({
    to: email,
    subject: 'Bitte bestätige deine Newsletter-Anmeldung',
    text: `Bitte bestätige deine Anmeldung indem du auf folgenden Link klickst: ${confirmUrl}`,
    html: renderEmailLayout(
      'Newsletter Anmeldung',
      `<p>Bitte bestätige deine Anmeldung indem du auf folgenden Link klickst:</p><p style="text-align:center;"><a href="${confirmUrl}">Newsletter bestätigen</a></p>`,
    ),
  });
}
