'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HeroHeadline, Overline } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
    <section
      className={cn(
        'relative overflow-hidden border-b border-black/8 pt-32 pb-20 md:pt-40 md:pb-28',
        className,
      )}
    >
      <div className="mardu-container relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-7">
          <Overline>Engineering Access Platform</Overline>
          <HeroHeadline prefix="Zutrittskontrolle, die" emphasis="mitdenkt." />
          <p className="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
            {description}
          </p>
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

        <div className="relative overflow-hidden">
          <div className="relative grid gap-4 md:min-h-152">
            <Link
              href="#produkte"
              className="group relative z-20 aspect-16/10 overflow-hidden rounded-2xl border border-black/15 md:absolute md:right-0 md:top-2 md:w-[88%] md:rotate-[0.8deg]"
              aria-label="Zu den Produktlösungen mardu.space scrollen"
            >
              <Image
                src="/_A7_9094_quer.jpg"
                alt="Maschinenfreischaltung an einer Drehbank mit mardu.space"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/15 to-transparent" />
              <div className="absolute left-4 top-4 border border-white/45 bg-black/38 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white">
                mardu.space
              </div>
              <p className="absolute bottom-4 left-4 max-w-[34ch] text-sm text-white/95 group-hover:text-white">
                Maschinenzugang per NFC in Werkstatt und Labor.
              </p>
            </Link>

            <Link
              href="#produkte"
              className="group relative z-10 aspect-16/10 overflow-hidden rounded-2xl border border-black/15 md:absolute md:bottom-0 md:left-0 md:w-[82%] md:-rotate-[1.2deg]"
              aria-label="Zu den Produktlösungen mardu.construction scrollen"
            >
              <Image
                src="/mardu-constructions.webp"
                alt="Freischaltung einer Bautür mit mardu.construction"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/58 via-black/16 to-transparent" />
              <div className="absolute right-4 top-4 border border-white/45 bg-black/38 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white">
                mardu.construction
              </div>
              <p className="absolute bottom-4 left-4 max-w-[30ch] text-sm text-white/90 group-hover:text-white">
                Digitale Zutrittskontrolle für Baustellentüren und Tore.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
