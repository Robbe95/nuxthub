import { getAccounts } from '@server/modules/auth/queries/getAccounts.query'
import { getMe } from '@server/modules/auth/queries/getMe.query'
import { router } from '@server/trpc/trpc'

export const authRouter = router({
  getAccounts,
  getMe,
})
