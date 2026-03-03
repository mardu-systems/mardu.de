import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { BlogAuthors } from './collections/blog-authors.js';
import { BlogCategories } from './collections/blog-categories.js';
import { BlogPosts } from './collections/blog-posts.js';
import { Media } from './collections/media.js';
import { Users } from './collections/users.js';

const databaseURL =
  process.env.DATABASE_URI || 'postgres://postgres:postgres@127.0.0.1:5432/mardu_payload';

const payloadSharedConfig = {
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
};

export default payloadSharedConfig;
