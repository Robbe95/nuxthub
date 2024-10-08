import { createContext } from '@server/contexts/auth.context'
import { appRouter } from '@server/router/router'
import { createNuxtApiHandler } from 'trpc-nuxt'

export const nuxtHandler = createNuxtApiHandler({
  createContext,
  router: appRouter,
  onError: ({ error }) => {
    if (error.code === 'UNAUTHORIZED') {
      return
    }

    console.error(error)
  },
})
