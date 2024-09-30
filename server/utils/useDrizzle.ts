import * as schema from '@server/database/schema'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const tables = schema

let client: postgres.Sql | null = null

export function useDrizzle() {
  const runtimeConfig = useRuntimeConfig()
  const connectionString = runtimeConfig.dbUrl

  if (connectionString == null) {
    throw new Error('Missing `NUXT_DB_URL` environment variable')
  }

  if (client == null) {
    client = postgres(connectionString, { prepare: false })
  }

  return drizzle(client, { schema })
}

export type Account = typeof schema.accounts.$inferSelect
export type User = typeof schema.users.$inferSelect
export type PingerProject = typeof schema.pingerProject.$inferSelect
export type PingerUrl = typeof schema.pingerUrl.$inferSelect
export type PingerPing = typeof schema.pingerPing.$inferSelect
