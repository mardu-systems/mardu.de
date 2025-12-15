'use client';

import Link from 'next/link';
import Image from 'next/image';

/* ---------- Footer Props ---------- */
export type FooterLink = {
  href: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};
type SiteFooterProps = {
  navLinks?: ReadonlyArray<FooterLink>;
  metaLinks?: ReadonlyArray<FooterLink>;
};

/* ------------------------------ Component ------------------------------ */
export default function SiteFooter({ metaLinks = [] }: SiteFooterProps) {
  return (
    <footer className="dark w-full bg-[#351B59] text-foreground">
      <div className="mx-auto max-w-7xl px-4 md:px-1 py-8 md:py-12">
        <nav aria-label="Footer Navigation" className="flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center gap-6 md:gap-8">
          <Link href="/" aria-label="Mardu Home" className="block">
                <div className="relative h-12 w-[150px]">
                  <Image
                    src="/logos/LogoWeiss.svg"
                    alt="Mardu Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
          {metaLinks?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white font-semibold hover:text-foreground transition-colors text-sm"
              onClick={link.onClick}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-[#FFB703] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-accent-foreground">
            Copyright © {new Date().getFullYear()}, Mardu, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
