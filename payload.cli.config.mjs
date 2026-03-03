import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import blogAuthorsModule from './collections/blog-authors.ts';
import blogCategoriesModule from './collections/blog-categories.ts';
import blogPostsModule from './collections/blog-posts.ts';
import mediaModule from './collections/media.ts';
import usersModule from './collections/users.ts';

const { BlogAuthors } = blogAuthorsModule;
const { BlogCategories } = blogCategoriesModule;
const { BlogPosts } = blogPostsModule;
const { Media } = mediaModule;
const { Users } = usersModule;

const databaseURL =
  process.env.DATABASE_URI || 'postgres://postgres:postgres@127.0.0.1:5432/mardu_payload';

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'payload-dev-secret-please-change',
  db: postgresAdapter({
    pool: {
      connectionString: databaseURL,
    },
  }),
  editor: lexicalEditor(),
  collections: [Users, Media, BlogCategories, BlogAuthors, BlogPosts],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: process.cwd(),
    },
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'],
});
