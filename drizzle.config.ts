import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './utils/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_0Gxm3kwthOjg@ep-long-art-a8zg1cgs-pooler.eastus2.azure.neon.tech/AI-Content-Generator?sslmode=require',
  },
});
