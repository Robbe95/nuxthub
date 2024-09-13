import {
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const authSchema = pgSchema('auth')

export const users = authSchema.table('users', {
  id: uuid('id').primaryKey().notNull(),
  email: text('email').notNull().unique(),
})

export const accounts = pgTable('accounts', {
  uuid: uuid('uuid').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  firstName: text('first_name'),
  lastName: text('last_name'),
})
