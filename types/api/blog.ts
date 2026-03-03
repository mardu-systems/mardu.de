export type BlogListQueryDto = {
  q?: string;
  category?: string;
  page?: number;
  limit?: number;
};

export type BlogCategoryDto = {
  id: string;
  title: string;
  slug: string;
  description?: string;
};

export type BlogAuthorDto = {
  id: string;
  name: string;
  slug: string;
  role?: string;
  avatarUrl?: string;
  avatarAlt?: string;
};

export type BlogPostListItemDto = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  coverImageAlt: string;
  publishedAt: string;
  featured: boolean;
  categories: BlogCategoryDto[];
  author: BlogAuthorDto;
};

export type BlogPostDetailDto = BlogPostListItemDto & {
  canonicalUrl?: string;
  ogImageAlt?: string;
  ogImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  content: unknown;
};

export type PaginatedBlogPostsDto = {
  posts: BlogPostListItemDto[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
