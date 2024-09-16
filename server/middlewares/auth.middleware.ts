import { accountService } from '@server/modules/auth/services/account.service'
import { t } from '@server/trpc/trpc'
import { TRPCError } from '@trpc/server'

export function getAuthMiddleware() {
  return t.middleware(async ({ ctx, next }) => {
    if (ctx.user?.user?.id == null) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    const user = await accountService.getUserWithAccountId(ctx.user.user.id)

    return next({
      ctx: {
        user,
      },
    })
  })
}
