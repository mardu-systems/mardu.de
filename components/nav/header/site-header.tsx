'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

import DesktopNav from './desktop-nav';
import Topbar, { TOPBAR_HEIGHT } from './topbar';
import { NavEntry } from '@/types/header';
import { MeetergoCTAButton } from '@/components/utilities/meetergo-cta-button';

export type { NavEntry } from '@/types/header';

export interface HeaderProps {
  items: NavEntry[];
  showTopbar?: boolean;
  showSearch?: boolean;
  showAccount?: boolean;
  showHelp?: boolean;
  salesPhone?: string;
}

const SCROLL_THRESHOLD = 24;

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

const MobileNav = dynamic(() => import('./mobile-nav'), { ssr: false });

export default function SiteHeader({
  items,
  showTopbar = true,
  showSearch = true,
  showAccount = true,
  showHelp = true,
  salesPhone = '+49 176 200 00 00',
}: HeaderProps) {
  const scrolled = useScrolled(SCROLL_THRESHOLD);

  // Top-Offset for fixed header
  const navTopOffset = showTopbar && !scrolled ? TOPBAR_HEIGHT : 0;

  return (
    <header>
      {/* Meetergo script will be loaded lazily on button click */}
      {showTopbar && (
        <Topbar
          showSearch={showSearch}
          showAccount={showAccount}
          showHelp={showHelp}
          salesPhone={salesPhone}
        />
      )}

      <div
        className={clsx('fixed z-50 transition-colors duration-200', scrolled && 'border-white/10')}
        style={{
          top: `calc(${navTopOffset}px + 1rem)`,
          left: '1rem',
          right: '1rem',
        }}
      >
        <div className="relative mx-auto max-w-7xl bg-white rounded-2xl shadow-lg border border-gray-200/50">
          <nav className="flex h-20 items-center gap-3 px-6" aria-label="Hauptnavigation">
            <div className="flex items-center">
              <Link href="/" aria-label="Mardu Home" className="block">
                <div className="relative h-12 w-[150px]">
                  <Image
                    src="/logos/Logo.svg"
                    alt="Mardu Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            <div className="flex flex-1 md:hidden justify-end">
              <MobileNav items={items} variant="light" />
            </div>

            <DesktopNav items={items} />
            <div className="hidden md:block ml-4">
              <MeetergoCTAButton
                className="w-full sm:w-auto h-12 px-6 rounded-lg bg-[#F5C842] hover:bg-[#F5D25C] text-black font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2 mt-3 sm:mt-0 sm:ml-4"
              >
                Demo Vereinbaren
              </MeetergoCTAButton>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
