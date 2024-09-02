import { accountService } from '@server/modules/auth/services/account.service'
import { publicProcedure } from '@server/trpc/trpc'

export const getAccounts = publicProcedure
  .query(async () => {
    const accounts = await accountService.getAccounts()

    return accounts
  })
