'use client';

import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { MeetergoCTAButton } from './meetergo-cta-button';

export interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export default function CTASection({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  className = '',
}: CTASectionProps) {
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<{ email?: string; consent?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLButtonElement>(null);

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get('global.vorname') ?? '').trim();
    const lastName = String(formData.get('global.nachname') ?? '').trim();
    const company = String(formData.get('global.firma') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();

    const nextErrors: { email?: string; consent?: string } = {};

    if (!email) {
      nextErrors.email = 'Bitte geben Sie eine E-Mail-Adresse ein.';
    } else if (emailInputRef.current && !emailInputRef.current.validity.valid) {
      nextErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }

    if (!consentChecked) {
      nextErrors.consent = 'Bitte bestätigen Sie Ihre Einwilligung.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      if (nextErrors.email) emailInputRef.current?.focus();
      else consentRef.current?.focus();
      return;
    }

    const updateValue = (name: string, value: string) => {
      const input = form.elements.namedItem(name) as HTMLInputElement | null;
      if (input) input.value = value;
    };

    updateValue('global.vorname', firstName);
    updateValue('global.nachname', lastName);
    updateValue('global.firma', company);
    updateValue('email', email);

    setFormErrors({});
    setIsSubmitting(true);
    form.submit();

    setTimeout(() => {
      setOpen(false);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section className={cn('section-hairline py-18 md:py-24', className)}>
      <div className="mardu-container">
        <div className="relative overflow-hidden rounded-[28px] border border-black/20 p-8 md:p-12">
          <Image
            src="/landing/granieBackground.png"
            alt=""
            fill
            priority={false}
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(9,12,24,0.11)_0%,rgba(12,15,26,0.38)_40%,rgba(12,15,26,0.12)_100%)]" />
          <div className="absolute inset-y-0 right-[8%] w-[22%] bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_12px)] opacity-35" />

          <div className="relative max-w-4xl">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/55">
              Nächster Schritt
            </p>
            <h2 className="headline-balance text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.05] tracking-[-0.02em] text-white">
              {title}
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-white/82 md:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Dialog
                open={open}
                onOpenChange={(nextOpen) => {
                  setOpen(nextOpen);
                  if (!nextOpen) {
                    setFormErrors({});
                    setIsSubmitting(false);
                    setConsentChecked(false);
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button className="mardu-cta rounded-none border-black/15">
                    {primaryButtonText}
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-175 max-h-[90vh] overflow-y-auto border border-black/10 bg-background">
                  <DialogHeader>
                    <DialogTitle>Anmelden</DialogTitle>
                    <DialogDescription>
                      Unser Newsletter informiert Sie regelmäßig über Produktneuheiten und
                      Sonderaktionen.
                    </DialogDescription>
                  </DialogHeader>

                  <form
                    method="post"
                    action="https://flow.cleverreach.com/fl/dc9cc0ca-817c-4e47-bad3-f00510d3efc3/confirm"
                    target="_blank"
                    className="space-y-5 pt-2"
                    onSubmit={handleNewsletterSubmit}
                    noValidate
                  >
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      name="email_confirm"
                      aria-hidden
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="global.vorname">Vorname</Label>
                        <Input
                          type="text"
                          id="global.vorname"
                          name="global.vorname"
                          autoComplete="given-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="global.nachname">Nachname</Label>
                        <Input
                          type="text"
                          id="global.nachname"
                          name="global.nachname"
                          autoComplete="family-name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="global.firma">Firma</Label>
                      <Input
                        type="text"
                        id="global.firma"
                        name="global.firma"
                        autoComplete="organization"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="after:ml-0.5 after:text-destructive after:content-['*']"
                      >
                        E-Mail
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        ref={emailInputRef}
                        onChange={() => {
                          if (formErrors.email)
                            setFormErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        aria-invalid={Boolean(formErrors.email)}
                        aria-describedby={formErrors.email ? 'cta.email-error' : undefined}
                      />
                      {formErrors.email ? (
                        <p
                          id="cta.email-error"
                          className="text-xs text-destructive"
                          aria-live="polite"
                        >
                          {formErrors.email}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-2 pt-1">
                      <Label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
                        <Checkbox
                          id="tags"
                          name="tags[]"
                          value="accept"
                          ref={consentRef}
                          className="mt-1"
                          checked={consentChecked}
                          onCheckedChange={(checked) => {
                            setConsentChecked(checked === true);
                            if (formErrors.consent)
                              setFormErrors((prev) => ({ ...prev, consent: undefined }));
                          }}
                          aria-invalid={Boolean(formErrors.consent)}
                          aria-describedby={formErrors.consent ? 'cta.consent-error' : undefined}
                        />
                        Ihre Daten werden nur für den Newsletter genutzt. Mit dem Absenden
                        bestätigen Sie die Datenverarbeitung und unsere Datenschutzerklärung.
                      </Label>
                      {formErrors.consent ? (
                        <p
                          id="cta.consent-error"
                          className="text-xs text-destructive"
                          aria-live="polite"
                        >
                          {formErrors.consent}
                        </p>
                      ) : null}
                    </div>

                    <Button
                      type="submit"
                      className="mardu-cta rounded-none border-black/15"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      ) : null}
                      Anmelden
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              {secondaryButtonText ? (
                <MeetergoCTAButton className="mt-0 ml-0 h-11 rounded-none border border-white/35 bg-white/12 px-5 text-sm uppercase tracking-[0.08em] text-white hover:bg-white/18 sm:mt-0 sm:ml-0">
                  {secondaryButtonText}
                </MeetergoCTAButton>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
