# Newsletter + Whitepaper CRM Integration (Twenty Unit)

Diese Integration ist eine zusaetzliche Einheit und erweitert den vorhandenen Newsletter-Flow nur um ein optionales CRM-Syncing.

## Zweck

- Lokalen Newsletter/Whitepaper-Flow unveraendert lassen.
- Nach erfolgreichem Double-Opt-In sowie bei Abmeldung Lifecycle-Events an Twenty senden.
- Bei CRM-Fehlern den Hauptflow nicht blockieren.

## Event DTO

Quelle: [`types/api/newsletter-crm.ts`](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/types/api/newsletter-crm.ts)

```ts
type NewsletterCrmEventType = "newsletter_confirmed" | "newsletter_unsubscribed";
type NewsletterSignupSource = "newsletter" | "whitepaper";

interface NewsletterCrmEventDto {
  type: NewsletterCrmEventType;
  email: string;
  role: string;
  source: NewsletterSignupSource;
  occurredAt: string; // ISO-8601 UTC timestamp
  consentModel: "double-opt-in";
}
```

## Versand an Twenty

Quelle: [`lib/integrations/twenty.ts`](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/lib/integrations/twenty.ts)

- Methode: `POST`
- Ziel: `TWENTY_SYNC_URL`
- Header:
  - `Content-Type: application/json`
  - Optional `Authorization: Bearer <TWENTY_API_KEY>`
- Timeout: `TWENTY_SYNC_TIMEOUT_MS` (Default `6000`)

## Triggerpunkte

- Confirm: [`app/api/newsletter/confirm/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/app/api/newsletter/confirm/route.ts)
  - Event: `newsletter_confirmed`
- Unsubscribe: [`app/api/newsletter/unsubscribe/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/app/api/newsletter/unsubscribe/route.ts)
  - Event: `newsletter_unsubscribed`

## Fehlerverhalten

- Falls `TWENTY_SYNC_URL` fehlt, wird Sync uebersprungen.
- Falls Twenty nicht erreichbar ist oder Fehler liefert, wird geloggt, aber der API-Request bleibt erfolgreich.

## Environment

```env
TWENTY_SYNC_URL=
TWENTY_API_KEY=
TWENTY_SYNC_TIMEOUT_MS=6000
```

