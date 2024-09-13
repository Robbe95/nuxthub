import { userIdSchema } from '@auth/models/current-user/currentUserId.model'
import { accountService } from '@server/modules/auth/services/account.service'
import { authProcedure } from '@server/trpc/trpc'
import { z } from 'zod'

export const currentUserSchema = z.object({
  id: userIdSchema,
  userId: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
})
export const getMe = authProcedure
  .query(async ({ ctx }) => {
    const me = await accountService.me(ctx.user.id)

    const checkedSchema = currentUserSchema.parse(me)

    return checkedSchema
  })
