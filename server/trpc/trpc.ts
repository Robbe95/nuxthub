/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/server/routers
 * @see https://trpc.io/docs/server/procedures
 */

import type { AuthContext } from '@server/contexts/auth.context'
import { getAuthMiddleware } from '@server/middlewares/auth.middleware'
import { initTRPC } from '@trpc/server'

export const t = initTRPC
  .context<AuthContext>()
  .create()

const authMiddleware = getAuthMiddleware()

export const publicProcedure = t.procedure
export const authProcedure = t.procedure.use(authMiddleware)

export const router = t.router
export const middleware = t.middleware
