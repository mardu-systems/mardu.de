'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import DesktopNav from './desktop-nav';
import MobileNav from './mobile-nav';
import Topbar, { TOPBAR_HEIGHT } from './topbar';
import { NavEntry } from '@/types/header';

export type { NavEntry } from '@/types/header';

export interface HeaderProps {
  items: NavEntry[];
  showTopbar?: boolean;
  showSearch?: boolean;
  showAccount?: boolean;
  showHelp?: boolean;
  salesPhone?: string;
  /** Light logo for dark backgrounds */
  logoLightSrc: string;
  /** Dark logo for light backgrounds / transparent over video */
  logoDarkSrc: string;
  /** Color variant for text and logo */
  variant?: 'dark' | 'light';
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

function getHeaderBgAnimate(scrolled: boolean) {
  return {
    backgroundColor: scrolled ? 'rgba(10,0,12,0.80)' : 'rgba(0,0,0,0)',
    backdropFilter: scrolled ? 'blur(8px)' : 'blur(0px)',
  } as const;
}

export default function SiteHeader({
  items,
  showTopbar = true,
  showSearch = true,
  showAccount = true,
  showHelp = true,
  salesPhone = '+49 176 200 00 00',
  logoLightSrc,
  logoDarkSrc,
  variant = 'light',
}: HeaderProps) {
  const scrolled = useScrolled(SCROLL_THRESHOLD);
  const effectiveVariant = React.useMemo(() => {
    if (scrolled) {
      return 'dark';
    }
    return variant;
  }, [scrolled, variant]);

  // Top-Offset for fixed header
  const navTopOffset = showTopbar && !scrolled ? TOPBAR_HEIGHT : 0;

  const bgStyle = React.useMemo(() => getHeaderBgAnimate(scrolled), [scrolled]);

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
        className={clsx(
          'fixed z-50 transition-colors duration-200',
          scrolled && 'border-white/10',
        )}
        style={{ 
          top: `calc(${navTopOffset}px + 1rem)`,
          left: '1rem',
          right: '1rem',
        }}
      >
        <div className="relative mx-auto max-w-7xl bg-white rounded-2xl shadow-lg border border-gray-200/50">
          <nav className="flex h-20 items-center gap-3 px-6">
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

            <DesktopNav items={items} variant="light" />

            <LazyMeetergoButton />
          </nav>
        </div>
      </div>
    </header>
  );
}

function LazyMeetergoButton() {
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = React.useState(false);
  const SRC = 'https://liv-showcase.s3.eu-central-1.amazonaws.com/browser-v3.js';

  const ensureScript = React.useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (loaded || document.querySelector(`script[src="${SRC}"]`)) {
        setLoaded(true);
        resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = SRC;
      s.async = true;
      s.onload = () => {
        setLoaded(true);
        resolve();
      };
      s.onerror = (e) => reject(e);
      document.body.appendChild(s);
    });
  }, [loaded]);

  const onClick = React.useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loaded) {
      e.preventDefault();
      e.stopPropagation();
      try {
        await ensureScript();
        // wait a tick so the script can bind listeners, then re-dispatch
        setTimeout(() => {
          btnRef.current?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        }, 0);
      } catch (err) {
        console.error('Failed to load Meetergo script', err);
      }
    }
  }, [ensureScript, loaded]);

  return (
    <div className="hidden md:block ml-4">
      <button
        ref={btnRef}
        onClick={onClick}
        className="meetergo-modal-button inline-flex items-center justify-center h-11 px-6 rounded-lg bg-[#F5C842] hover:bg-[#F5D25C] text-black font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2"
        {...({ link: 'https://cal.meetergo.com/infomardu/30-min-meeting-or-info' } as any)}
        type="button"
      >
        Demo Vereinbaren
      </button>
    </div>
  );
}
