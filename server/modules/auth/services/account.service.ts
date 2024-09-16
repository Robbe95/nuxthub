export const accountService = {
  async getUserWithAccountId(accountId: string) {
    const drizzle = useDrizzle()

    const accountWithUser = await drizzle.query.accounts.findFirst({
      where: (accounts, { eq }) => eq(accounts.id, accountId),
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
}
