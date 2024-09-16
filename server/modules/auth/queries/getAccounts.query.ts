import { publicProcedure } from '@server/trpc/trpc'

export const getAccounts = publicProcedure
  .query(() => {
    // const accounts = await accountService.getAccounts()

    return []
  })
