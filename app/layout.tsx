import type { Metadata, Viewport } from 'next';
import './globals.css';
import React from 'react';
import SiteShell from '@/components/layout/site-shell';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: false,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mardu.de'),
  title: {
    default: 'Mardu – Zutrittskontrolle & Maschinenfreigabe für Werkstätten, Labore & Baustellen',
    template: '%s | Mardu',
  },
  description:
    'Zutrittskontrolle und Maschinenfreigabe mit Funk-Mesh, Protokollierung und Rechteverwaltung – für Makerspaces, Labore, Werkstätten und Baustellen. DSGVO-konform.',
  keywords: [
    'Zugriffskontrollsysteme',
    'Makerspace',
    'FabLab',
    'Schülerlabor',
    'Open Education Badges',
  ],
  alternates: {
    canonical: 'https://mardu.de',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Mardu – Zutrittskontrolle & Maschinenfreigabe',
    description:
      'Smarte Zutrittskontrolle und Maschinenfreigabe für Werkstätten, Labore, Makerspaces und Baustellen – flexibel, ausfallsicher, DSGVO-konform.',
    url: '/',
    siteName: 'Mardu',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/_A7_9072_quer.jpg',
        width: 1200,
        height: 630,
        alt: 'Mardu Zutrittskontrolle und Maschinenfreigabe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mardu – Zutrittskontrolle & Maschinenfreigabe',
    description:
      'Zutrittskontrolle und Maschinenfreigabe für Werkstätten, Labore, Makerspaces und Baustellen – flexibel, ausfallsicher, DSGVO-konform.',
    images: ['/_A7_9072_quer.jpg'],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mardu',
    url: 'https://mardu.de',
    logo: 'https://mardu.de/logos/Logo.svg',
    email: 'info@mardu.de',
    sameAs: ['https://www.linkedin.com/company/marduofficial'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mardu',
    url: 'https://mardu.de',
    publisher: {
      '@type': 'Organization',
      name: 'Mardu',
      url: 'https://mardu.de',
      logo: 'https://mardu.de/logos/Logo.svg',
    },
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log('runtime', process.versions.bun);
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased overflow-x-hidden">
        <SiteShell>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
