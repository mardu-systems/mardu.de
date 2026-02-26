'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavEntry } from '@/types/header';
import NavLink from '@/components/nav/nav-link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export type { NavEntry } from '@/types/header';

export interface HeaderProps {
  items: NavEntry[];
  showTopbar?: boolean;
  showSearch?: boolean;
  showAccount?: boolean;
  showHelp?: boolean;
  salesPhone?: string;
}

export default function SiteHeader({ items }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolledPastHero, setScrolledPastHero] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = items.filter((item): item is Extract<NavEntry, { type: 'link' }> => item.type === 'link');

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={[
          'transition-[background-color,border-color] duration-150',
          scrolledPastHero
            ? 'border-b border-black/8 bg-[var(--paper)]'
            : 'border-b border-transparent bg-transparent',
        ].join(' ')}
      >
        <nav className="mardu-container flex h-18 items-center justify-between gap-4" aria-label="Hauptnavigation">
          <Link
            href="/"
            aria-label="Mardu Home"
            className="block touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="relative h-11 w-35">
              <Image src="/logos/Logo.svg" alt="Mardu Logo" fill className="object-contain" priority />
            </div>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.label} href={item.href} label={item.label} />
            ))}
            <Button className="mardu-cta rounded-none border-black/15">Demo vereinbaren</Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Menü öffnen"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </nav>

        {mobileOpen ? (
          <div className="border-t border-black/8 bg-background/95 md:hidden">
            <div className="mardu-container flex flex-col gap-5 py-5">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  className="py-2 text-base"
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
              <Button className="mardu-cta mt-2 rounded-none border-black/15">Demo vereinbaren</Button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
