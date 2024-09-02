import { authRouter } from '@server/modules/auth/router/auth.router'
import { router } from '@server/trpc/trpc'

export const appRouter = router({
  auth: authRouter,
})

export type AppRouter = typeof appRouter
