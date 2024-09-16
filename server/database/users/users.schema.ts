import { primaryId } from '@server/database/uuid/primaryId.field'
import { relations } from 'drizzle-orm'
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core'

export const accounts = sqliteTable('accounts', {
  id: primaryId,
  userId: text('user_id').notNull(),
  provider: text('provider', { enum: [
    'github',
  ] }).notNull(),
})

export const users = sqliteTable('users', {
  id: primaryId,
  createdAt: integer('id', { mode: 'timestamp' }).notNull().default(new Date()),
  firstName: text('first_name'),
  lastName: text('last_name'),
})

export const usersToAccounts = sqliteTable(
  'users_to_accounts',
  {
    accountId: text('account_id')
      .notNull()
      .references(() => accounts.id),
    userId: text('userId')
      .notNull()
      .references(() => users.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [
      t.userId,
      t.accountId,
    ] }),
  }),
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
