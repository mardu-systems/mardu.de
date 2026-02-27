# Mardu.space

This is the official repository for the Mardu website.

## License

**Copyright © 2026 Mardu. All Rights Reserved.**

This project is not open source. The source code is available for viewing and educational purposes only. You may not use, copy, modify, or distribute the code, assets, or designs without explicit written permission from the copyright holder.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Environment Variables

Set `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID` to your Google Analytics 4 measurement ID to enable analytics. If the variable is not provided, analytics will remain disabled and a warning will be logged during initialization.

To enable email delivery from the configurator, configure the following variables:

```
RESEND_API_KEY=
EMAIL_FROM=
EMAIL_TO=
APP_URL=
NEWSLETTER_SECRET=
DATA_DIR=
TWENTY_SYNC_URL=
TWENTY_API_KEY=
TWENTY_SYNC_TIMEOUT_MS=6000
```

The newsletter signup uses a double opt-in process. `APP_URL` should match your site and `NEWSLETTER_SECRET` can be any random string used to sign confirmation tokens.

`DATA_DIR` allows you to point newsletter and preorder JSON storage to a directory outside of the repo. When omitted, the app falls back to `./data` inside the project root.

If `TWENTY_SYNC_URL` is set, confirmed newsletter/whitepaper signups and unsubscriptions are sent as CRM lifecycle events to the configured endpoint. This integration is optional and non-blocking.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
