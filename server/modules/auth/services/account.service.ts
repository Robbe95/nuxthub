import {
  accounts,
  users,
  usersToAccounts,
} from '@server/database/schema'
import type { Account, User } from '@server/utils/useDrizzle'

export const accountService = {
  async createAccountForUser(payload: { providerId: string, userId: string, provider: Account['provider'] }) {
    const drizzle = useDrizzle()

    const returningAccounts = await drizzle.insert(accounts).values({
      provider: payload.provider,
    }).returning().execute()

    await drizzle.insert(usersToAccounts).values({
      accountId: returningAccounts[0].id,
      userId: payload.userId,
    })
  },
  async createUserFromProvider(user: { id: string, name: string, email: string, provider: Account['provider'] }) {
    const drizzle = useDrizzle()

    const hasUser = await drizzle.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, user.email),
    }).execute()

    let gottenUser: User | null = hasUser ?? null

    if (hasUser == null) {
      const returningUser = await drizzle.insert(users).values({
        email: user.email,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1],
      }).returning().execute()

      gottenUser ??= returningUser[0]
    }

    if (gottenUser == null) {
      throw new Error('NO_USER_FOUND')
    }

    const userWithAccounts = await drizzle.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, user.email),
      with: {
        usersToAccounts: {
          with: {
            account: true,
          },
        },
      },
    })

    const hasProvider = userWithAccounts?.usersToAccounts.find(
      (userToAccount) => userToAccount.account.provider === user.provider,
    ) ?? null

    if (hasProvider != null) {
      return
    }

    await accountService.createAccountForUser({
      providerId: user.id,
      userId: gottenUser.id,
      provider: user.provider,
    })
  },

  async getUserWithEmail(email: string) {
    const drizzle = useDrizzle()

    const user = await drizzle.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })

    if (user == null) {
      throw new Error('No user found')
    }

    return user
  },
}
