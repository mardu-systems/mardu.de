export interface TwentyContactLeadDto {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: 'contact' | 'wizard';
  consent?: boolean;
  newsletterOptIn?: boolean;
}
