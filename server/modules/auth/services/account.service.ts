import {
  accounts,
  users,
  usersToAccounts,
} from '@server/database/schema'
import type { Account } from '@server/utils/useDrizzle'

export const accountService = {
  async getUserWithAccountId(accountId: string) {
    const drizzle = useDrizzle()

    const accountWithUser = await drizzle.query.accounts.findFirst({
      where: (accounts, { eq }) => eq(accounts.providerId, accountId),
      with: {
        usersToAccounts: {
          limit: 1,
          with: {
            user: true,
          },
        },
      },
    }).execute()

    const user = accountWithUser?.usersToAccounts?.[0]?.user

    if (user == null) {
      throw new Error('No user found')
    }

    return user
  },
  async createAccountForUser(payload: { providerId: string, userId: string, provider: Account['provider'] }) {
    const drizzle = useDrizzle()

    const returningAccounts = await drizzle.insert(accounts).values({
      providerId: payload.providerId,
      provider: payload.provider,
    }).returning().execute()

    await drizzle.insert(usersToAccounts).values({
      accountId: returningAccounts[0].id,
      userId: payload.userId,
    })
  },
  async createUserFromGithub(user: { id: string, name: string, email: string }) {
    const drizzle = useDrizzle()

    const hasGithubAccount = await drizzle.query.accounts.findFirst({
      where: (accounts, { eq }) => and(eq(accounts.providerId, user.id), eq(accounts.provider, 'github')),
    }).execute()

    if (hasGithubAccount != null) {
      return
    }

    const hasUser = await drizzle.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, user.email),
    }).execute()

    let userId: null | string = hasUser?.id ?? null

    if (hasUser == null) {
      const returningUser = await drizzle.insert(users).values({
        email: user.email,
        firstName: user.name,
        lastName: '',
      }).returning().execute()

      userId ??= returningUser[0].id
    }

    if (userId == null) {
      throw new Error('No user id found')
    }

    accountService.createAccountForUser({
      providerId: user.id,
      userId,
      provider: 'github',
    })
  },
}
