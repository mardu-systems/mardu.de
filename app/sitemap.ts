import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.mardu.de';

/**
 * SEO sitemap endpoint (`/sitemap.xml`) using Next.js MetadataRoute DTO.
 * Add new indexable routes here when pages are introduced.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/publisher`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
