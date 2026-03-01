export interface TwentyContactLeadDto {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  source?: 'contact' | 'wizard';
  consent?: boolean;
}
