import { accounts, users } from '@server/database/schema'
import { eq } from 'drizzle-orm'

export const accountService = {
  async getAccounts() {
    const drizzle = useDrizzle()

    const query = await drizzle
      .select({
        id: accounts.uuid,
        userId: users.id,
        name: accounts.name,
        email: users.email,
      })
      .from(accounts)
      .leftJoin(users, eq(accounts.userId, users.id))
      .execute()

    return query
  },
  async me(userUuid: string) {
    const drizzle = useDrizzle()

    const query = await drizzle
      .select({
        id: accounts.uuid,
        userId: users.id,
        name: accounts.name,
        email: users.email,
      })
      .from(accounts)
      .leftJoin(users, eq(accounts.userId, users.id))
      .where(eq(accounts.userId, userUuid))
      .execute()

    return query[0]
  },
}
