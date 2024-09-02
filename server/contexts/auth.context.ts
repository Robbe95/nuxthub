import { useSupabase } from '@server/database/supabase'
import type { H3Event } from 'h3'

export async function createContext(event: H3Event) {
  const supabase = useSupabase()
  const authorization = getRequestHeader(event, 'authorization')

  async function getUserFromHeader() {
    try {
      if (authorization != null) {
        const token = authorization.split(' ')[1]

        return (await supabase.auth.getUser(token)).data.user
      }

      return null
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
