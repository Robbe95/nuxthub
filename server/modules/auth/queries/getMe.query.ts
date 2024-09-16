import { authProcedure } from '@server/trpc/trpc'

export const getMe = authProcedure
  .query(({ ctx }) => {
    return ctx.user
  })
