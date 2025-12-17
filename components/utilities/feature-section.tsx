import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type FeatureSectionProps = {
  title: string | ReactNode;

  description: string | ReactNode;

  imageSrc: string;

  imageAlt: string;

  buttonText?: string;

  buttonHref?: string;

  backgroundColor?: string;
};

export default function FeatureSection({
  className,
  title,
  description,
  imageSrc,
  imageAlt,
  buttonText,
  buttonHref,
  backgroundColor = '#351B59',
}: React.ComponentProps<'div'> & FeatureSectionProps) {
  return (
    <section
      className={cn('w-full py-12 md:py-16 lg:py-20 my-10 px-4 md:px-8', className)}
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">{title}</h2>

            <div className="text-base md:text-lg leading-relaxed opacity-95 space-y-4">
              {typeof description === 'string' ? <p>{description}</p> : description}
            </div>

            {buttonText && buttonHref && (
              <div className="pt-4">
                <Link
                  href={buttonHref}
                  className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-[#F5C842] hover:bg-[#F5D25C] text-black font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2"
                >
                  {buttonText}
                </Link>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="relative flex items-center justify-center">
            <div className="md:pl-10 lg:pl-12 md:pt-10 lg:pt-12 w-full max-w-150 rounded-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1200}
                height={500}
                className="w-full h-auto object-contain rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
