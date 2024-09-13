import process from 'node:process'

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dbCredentials: {
    url: process.env.NUXT_DB_URL ?? '',
  },
  dialect: 'postgresql',

  out: './server/database/migrations',
  schema: [
    './server/database/schema.ts',
  ],
  schemaFilter: 'public',
  strict: true,
  verbose: true,
})
