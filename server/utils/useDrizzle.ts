import * as schema from '@server/database/schema'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const tables = schema

let client: null | postgres.Sql = null

export function useDrizzle() {
  const runtimeConfig = useRuntimeConfig()
  const connectionString = runtimeConfig.dbUrl

  if (!connectionString) {
    throw new Error('Missing `NUXT_DB_URL` environment variable')
  }

  if (client == null) {
    client = postgres(connectionString, { prepare: false })
  }

  return drizzle(client, { schema })
}

export type Account = typeof schema.accounts.$inferSelect
