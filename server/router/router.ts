import { authRouter } from '@server/modules/auth/router/auth.router'
import { pingerRouter } from '@server/modules/pinger/router/pinger.router'
import { router } from '@server/trpc/trpc'

export const appRouter = router({
  auth: authRouter,
  pinger: pingerRouter,
})

export type AppRouter = typeof appRouter
