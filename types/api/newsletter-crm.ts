export type NewsletterCrmEventType = "newsletter_confirmed" | "newsletter_unsubscribed";

export type NewsletterSignupSource = "newsletter" | "whitepaper";

export interface NewsletterCrmEventDto {
    type: NewsletterCrmEventType;
    email: string;
    role: string;
    source: NewsletterSignupSource;
    occurredAt: string;
    consentModel: "double-opt-in";
}

