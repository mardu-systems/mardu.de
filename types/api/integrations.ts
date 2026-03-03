export type IntegrationStatus = 'available' | 'beta' | 'planned';

export type IntegrationSort = 'featured' | 'alphabetical' | 'latest';

export type IntegrationListQueryDto = {
  q?: string;
  category?: string;
  protocol?: string;
  status?: IntegrationStatus;
  page?: number;
  limit?: number;
  sort?: IntegrationSort;
};

export type IntegrationCategoryDto = {
  id: string;
  title: string;
  slug: string;
  description?: string;
};

export type IntegrationProtocolDto = {
  id: string;
  title: string;
  slug: string;
  badgeStyle: 'neutral' | 'success' | 'warn' | 'info';
};

export type IntegrationListItemDto = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  status: IntegrationStatus;
  vendor?: string;
  featured: boolean;
  sortOrder: number;
  logoUrl?: string;
  logoAlt?: string;
  categories: IntegrationCategoryDto[];
  protocols: IntegrationProtocolDto[];
};

export type IntegrationDetailDto = IntegrationListItemDto & {
  heroImageUrl?: string;
  heroImageAlt?: string;
  comingAt?: string;
  docsUrl?: string;
  requestUrl?: string;
  useCases: string[];
  supportedActions: string[];
  compatibilityNotes?: string;
  content: unknown;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  ogImageAlt?: string;
};

export type PaginatedIntegrationsDto = {
  items: IntegrationListItemDto[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  statusCounts: {
    available: number;
    beta: number;
    planned: number;
  };
};
