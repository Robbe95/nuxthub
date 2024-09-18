import { primaryId } from '@server/database/uuid/primaryId.field'
import { relations } from 'drizzle-orm'
import {
  date,
  pgTable,
  text,
  uuid,
} from 'drizzle-orm/pg-core'

export const accounts = pgTable('accounts', {
  id: primaryId,
  provider: text('provider', { enum: [
    'github',
    'google',
  ] }).notNull(),
})

export const users = pgTable('users', {
  id: primaryId,
  createdAt: date('created_at').notNull().defaultNow(),
  email: text('email').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  newThing: text('new_thing').default('some default value'),
})

export const usersToAccounts = pgTable(
  'users_to_accounts',
  {
    id: primaryId,
    accountId: uuid('account_id')
      .notNull()
      .references(() => accounts.id),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
  },
)

export const userRelations = relations(users, ({ many }) => ({
  usersToAccounts: many(usersToAccounts),
}))

export const accountRelations = relations(accounts, ({ many }) => ({
  usersToAccounts: many(usersToAccounts),
}))

export const usersToAccountsRelations = relations(usersToAccounts, ({ one }) => ({
  account: one(accounts, {
    fields: [
      usersToAccounts.accountId,
    ],
    references: [
      accounts.id,
    ],
  }),
  user: one(users, {
    fields: [
      usersToAccounts.userId,
    ],
    references: [
      users.id,
    ],
  }),
}))
