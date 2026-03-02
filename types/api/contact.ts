export type ContactSource = 'contact' | 'wizard';

/**
 * DTO for `POST /api/contact`.
 * Carries lead/contact data submitted from the website contact form.
 */
export interface ContactRequestDto {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  consent?: boolean;
  newsletterOptIn?: boolean;
  source?: ContactSource;
  token?: string;
  config?: unknown;
}

export interface ContactResponseDto {
  ok: true;
}

export interface ContactErrorResponseDto {
  error: string;
}
