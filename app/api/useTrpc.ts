import type { AppRouter } from '@server/router/router'
import {
  createTRPCNuxtClient,
  httpBatchLink,
} from 'trpc-nuxt/client'

export function useTrpc() {
  const client = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  })

  return {
    trpc: client,
  }
}
