'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HeroHeadline, Overline } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { ArrowRight, Orbit, ShieldCheck, Radio } from 'lucide-react';

export interface HeroSectionProps {
  title: string;
  description: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  className?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  mediaType?: 'image' | 'video';
  videoUrl?: string;
  onPlayClick?: () => void;
}

export default function HeroSection({
  title,
  description,
  imageSrc,
  imageAlt,
  className = '',
  buttonText,
  buttonHref = '/contact',
  secondaryButtonText,
  secondaryButtonHref,
  mediaType = 'image',
  videoUrl,
  onPlayClick,
}: HeroSectionProps) {
  void title;
  void imageSrc;
  void imageAlt;
  void mediaType;
  void videoUrl;
  void onPlayClick;

  return (
    <section className={cn('relative overflow-hidden border-b border-black/8 pt-32 pb-20 md:pt-40 md:pb-28', className)}>
      <div className="mardu-container relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-7">
          <Overline>Engineering Access Platform</Overline>
          <HeroHeadline prefix="Zutrittskontrolle, die" emphasis="mitdenkt." />
          <p className="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">{description}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            {buttonText ? (
              <Link href={buttonHref}>
                <Button className="mardu-cta rounded-none border-black/15">
                  {buttonText}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            ) : null}
            {secondaryButtonText && secondaryButtonHref ? (
              <Link href={secondaryButtonHref}>
                <Button variant="outline" className="mardu-ghost rounded-none">
                  {secondaryButtonText}
                </Button>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative border border-black/10 bg-white/45 p-5 backdrop-blur-[1px] md:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] bg-size-[22px_22px]" />
          <div className="relative aspect-5/4 overflow-hidden border border-black/15 bg-linear-to-br from-white to-[#f0eee7]">
            <div className="absolute left-7 top-7 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/45">
              <Orbit className="size-3.5" /> Mesh Topology
            </div>
            <svg viewBox="0 0 400 280" className="absolute inset-0 size-full">
              <g fill="none" stroke="rgba(15,23,42,0.22)" strokeWidth="1">
                <path d="M48 220 L120 140 L210 175 L318 95" />
                <path d="M120 140 L200 86 L298 130" />
                <path d="M200 86 L258 50" />
              </g>
              <g fill="rgba(255,90,31,0.88)" stroke="rgba(15,23,42,0.38)" strokeWidth="0.5">
                <circle cx="48" cy="220" r="5" />
                <circle cx="120" cy="140" r="5" />
                <circle cx="210" cy="175" r="5" />
                <circle cx="318" cy="95" r="5" />
                <circle cx="200" cy="86" r="5" />
                <circle cx="258" cy="50" r="5" />
              </g>
            </svg>
          </div>

          <div className="relative mt-5 grid gap-3 text-xs uppercase tracking-[0.13em] text-foreground/60 md:grid-cols-3">
            <p className="inline-flex items-center gap-2 border border-black/10 px-3 py-2">
              <Radio className="size-3.5" /> Dual-Band Mesh
            </p>
            <p className="inline-flex items-center gap-2 border border-black/10 px-3 py-2">
              <ShieldCheck className="size-3.5" /> Rechte + Audit Trail
            </p>
            <p className="inline-flex items-center gap-2 border border-black/10 px-3 py-2">
              <Orbit className="size-3.5" /> Remote + Lokal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
