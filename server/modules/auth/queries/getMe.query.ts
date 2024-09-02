import { userIdSchema } from '@auth/models/current-user/currentUserId.model'
import { accountService } from '@server/modules/auth/services/account.service'
import { authProcedure } from '@server/trpc/trpc'
import { z } from 'zod'

export const currentUserSchema = z.object({
  id: userIdSchema,
  userId: z.string(),
  name: z.string(),
  email: z.string(),
})
export const getMe = authProcedure
  .query(async ({ ctx }) => {
    const me = await accountService.me(ctx.user.id)

    // const checkedSchema = currentUserSchema.parse(me)

    return me
  })
