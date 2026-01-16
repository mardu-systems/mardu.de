import SiteHeader from '@/components/nav/header/site-header';
import { defaultHeaderItems } from '@/data/default-header-items';
import SiteFooter from '@/components/nav/footer/footer';
import React from 'react';
import { defaultFooterMetaLinks, defaultFooterNavLinks } from '@/data/default-footer-items';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SiteHeader items={defaultHeaderItems} />
      <div data-theme="light" style={{ colorScheme: 'light' }}>
        {children}
      </div>
      <SiteFooter
        description="Verwalte Zutritt und Maschinennutzung – mobil auf der Baustelle oder stationär inder Werkstatt. - Mardu passt sich an deine Bedürfnisse an."
        navLinks={defaultFooterNavLinks}
        metaLinks={defaultFooterMetaLinks}
      />
    </div>
  );
}
