'use client';

import * as React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    meetergo?: {
      launchScheduler: (link: string, prefill?: Record<string, unknown>) => void;
      isReady: () => boolean;
    };
  }
}

export interface MeetergoCTAButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  link?: string;
}

export function MeetergoCTAButton({
  className,
  children,
  onClick,
  link = 'https://cal.meetergo.com/infomardu/30-min-meeting-or-info',
  ...props
}: MeetergoCTAButtonProps) {
  const SRC = 'https://liv-showcase.s3.eu-central-1.amazonaws.com/browser-v3.js';
  const [loading, setLoading] = React.useState(false);

  const ensureScript = React.useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      if (window.meetergo?.isReady()) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(`script[src="${SRC}"]`);
      if (existingScript) {
        // If script exists but meetergo isn't ready, verify if it's loaded
        if (existingScript.getAttribute('data-loaded') === 'true') {
          resolve();
        } else {
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', (e) => reject(e));
        }
        return;
      }

      const s = document.createElement('script');
      s.src = SRC;
      s.async = true;
      s.setAttribute('data-loaded', 'false');
      s.onload = () => {
        s.setAttribute('data-loaded', 'true');
        resolve();
      };
      s.onerror = (e) => {
        s.setAttribute('data-loaded', 'error');
        reject(e);
      };
      document.body.appendChild(s);
    });
  }, []);

  const handleClick = React.useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e);
      }

      e.preventDefault();
      e.stopPropagation();

      try {
        setLoading(true);
        await ensureScript();

        // Small delay to ensure initialization if script just loaded
        if (!window.meetergo) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        if (window.meetergo) {
          window.meetergo.launchScheduler(link);
        } else {
          console.error('Meetergo SDK not initialized');
        }
      } catch (err) {
        console.error('Failed to load Meetergo script', err);
      } finally {
        setLoading(false);
      }
    },
    [ensureScript, link, onClick],
  );

  return (
    <Button
      onClick={handleClick}
      className={cn(className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {children || 'Demo Vereinbaren'}
    </Button>
  );
}
