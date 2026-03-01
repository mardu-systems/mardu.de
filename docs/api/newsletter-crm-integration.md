# Newsletter + Whitepaper CRM Integration (Twenty Unit)

Diese Integration ist eine zusaetzliche Einheit und erweitert den vorhandenen Newsletter-Flow nur um ein optionales CRM-Syncing.

## Zweck

- Lokalen Newsletter/Whitepaper-Flow unveraendert lassen.
- Nach erfolgreichem Double-Opt-In sowie bei Abmeldung Kontakte an Twenty synchronisieren.
- Contact-Form Leads direkt in Twenty als `people` + optional `companies` anlegen/aktualisieren.
- Bei CRM-Fehlern den Hauptflow nicht blockieren.

## Event DTO

Quelle: [`types/api/newsletter-crm.ts`](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/types/api/newsletter-crm.ts)

```ts
type NewsletterCrmEventType = 'newsletter_confirmed' | 'newsletter_unsubscribed';
type NewsletterSignupSource = 'newsletter' | 'whitepaper';

interface NewsletterCrmEventDto {
  type: NewsletterCrmEventType;
  email: string;
  role: string;
  source: NewsletterSignupSource;
  firstName?: string;
  lastName?: string;
  company?: string;
  occurredAt: string; // ISO-8601 UTC timestamp
  consentModel: 'double-opt-in';
}
```

## Contact DTO

Quelle: [`types/api/twenty-sync.ts`](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/types/api/twenty-sync.ts)

```ts
interface TwentyContactLeadDto {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  source?: 'contact' | 'wizard';
  consent?: boolean;
}
```

## Versand an Twenty

Quelle: [`lib/integrations/twenty.ts`](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/lib/integrations/twenty.ts)

- Primär über Twenty REST API:
  - `GET /people` (lookup per email)
  - `POST /people?upsert=true` oder `PATCH /people/{id}`
  - `GET /companies` (lookup per Firmenname)
  - `POST /companies?upsert=true` (optional, wenn Firma angegeben)
  - Basis-URL: `TWENTY_API_BASE_URL`
  - Auth: `Authorization: Bearer <TWENTY_API_KEY>`
- Timeout: `TWENTY_SYNC_TIMEOUT_MS` (Default `6000`)

## Triggerpunkte

- Confirm: [`app/api/newsletter/confirm/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/app/api/newsletter/confirm/route.ts)
  - Event: `newsletter_confirmed`
- Unsubscribe: [`app/api/newsletter/unsubscribe/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/app/api/newsletter/unsubscribe/route.ts)
  - Event: `newsletter_unsubscribed`
- Contact: [`app/api/contact/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/app/api/contact/route.ts)
  - Lead-Sync als Person + optionale Firma

## Fehlerverhalten

- Falls `TWENTY_API_KEY` fehlt, wird People/Companies-Sync uebersprungen.
- Falls Twenty nicht erreichbar ist oder Fehler liefert, wird geloggt, aber der API-Request bleibt erfolgreich.

## Environment

```env
TWENTY_API_BASE_URL=https://twenty.mardu.systems/rest
TWENTY_API_KEY=
TWENTY_SYNC_TIMEOUT_MS=6000
```
