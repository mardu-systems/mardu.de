# Blog + Payload CMS Integration

Diese Dokumentation beschreibt den Blog-spezifischen API-Vertrag fuer `/blog` und `/blog/[slug]`.

## Zweck

- Blog-Inhalte in Payload verwalten.
- Oeffentliche Auslieferung nur fuer `published`.
- Stabilen Frontend-Vertrag ueber DTOs garantieren.

## DTO-Vertrag

Kanonische Typen: [types/api/blog.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/types/api/blog.ts)

- `BlogListQueryDto`
- `BlogCategoryDto`
- `BlogAuthorDto`
- `BlogPostListItemDto`
- `BlogPostDetailDto`
- `PaginatedBlogPostsDto`

## Endpunktmatrix (Blog)

Bereitstellung ueber: [app/api/[...slug]/route.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/app/api/[...slug]/route.ts)

1. `GET /api/blog-posts`
2. `GET /api/blog-posts/:id`
3. `GET /api/blog-categories`

## Query-Parameter und Grenzen

Public UI-Filter (`/blog` URL-Contract):

- `q`: Volltextsuche (v1: Titel + Excerpt)
- `category`: Kategorie-Slug
- `page`: Seite, `>= 1`

Domain-Layer-Default:

- `limit = 9`

Payload REST (typisch):

- `where[_status][equals]=published`
- `where[slug][equals]=<slug>`
- `sort=-publishedAt`
- `depth=2`
- `limit`, `page`

## Mapping-Layer

Quelle: [lib/blog.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/lib/blog.ts)

- `getFeaturedPost()`
- `getBlogPosts(query)`
- `getBlogPostBySlug(slug)`
- `getBlogCategories()`

Mapper garantieren DTO-Stabilitaet und verwerfen unvollstaendige Payload-Dokumente defensiv.

## Access-Regeln

Quelle: [collections/blog-posts.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.de/collections/blog-posts.ts)

- Public Read: nur `published`
- Authenticated Read (Admin): alle Stati

## Response-/Fehlerbeispiele

`GET /api/blog-posts?where[_status][equals]=published&limit=1`

```json
{
  "docs": [
    {
      "id": 1,
      "title": "Example",
      "slug": "example",
      "_status": "published"
    }
  ],
  "totalDocs": 1,
  "limit": 1,
  "totalPages": 1,
  "page": 1
}
```

Typische Fehler:

- `400`: Ungueltige Query-Parameter
- `401`: Nicht authentifiziert (fuer geschuetzte Ressourcen)
- `404`: Ressource nicht gefunden

## SEO-/Routing-Verhalten

- Unbekannter Beitrag unter `/blog/[slug]` -> 404.
- `app/sitemap.ts` fuegt `/blog` und alle publizierten Slugs hinzu.

## Umgebungsvariablen

```env
DATABASE_URI=
PAYLOAD_SECRET=
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
```
