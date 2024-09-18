import { uuid } from 'drizzle-orm/pg-core'

export const primaryId = uuid('id').defaultRandom().primaryKey()
