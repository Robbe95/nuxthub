import { createQueryKeys } from '@lukemorales/query-key-factory'

export const authKeys = createQueryKeys('auth', {
  me: (email: string) => ({
    queryKey: [
      email,
    ],
  }),
})
