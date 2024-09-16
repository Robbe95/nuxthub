// auth.d.ts

import type { User as DrizzleUser } from '@server/utils/useDrizzle.ts'

declare module '#auth-utils' {
  interface User extends DrizzleUser {
  }

  interface UserSession {
    // Add your own fields
  }
}

export {}
