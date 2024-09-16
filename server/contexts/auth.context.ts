import type { H3Event } from 'h3'

export async function createContext(event: H3Event) {
  async function getUserFromHeader() {
    try {
      const session = await getUserSession(event)

      return session
    }
    catch (error) {
      console.error('Error in auth.context.ts', error)

      return null
    }
  }

  const user = await getUserFromHeader()

  return {
    user,
  }
}
export type AuthContext = Awaited<ReturnType<typeof createContext>>
