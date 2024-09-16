import { registerInputSchema } from '@server/modules/auth/models/register.model'
import { publicProcedure } from '@server/trpc/trpc'

export const register = publicProcedure
  .input(registerInputSchema)
  .mutation(({ input: _ }) => {
    return null
  })
