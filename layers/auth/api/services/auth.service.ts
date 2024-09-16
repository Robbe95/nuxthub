import { AuthTransformer } from '@auth/models/auth.transformer'
import type { CurrentUser } from '@auth/models/current-user/currentUser.model'
import { currentUserDtoSchema } from '@auth/models/current-user/currentUserDto.model'

import { useTrpc } from '~/api/useTrpc'

export class AuthService {
  static async getCurrentUser(): Promise<CurrentUser> {
    const { trpc } = useTrpc()
    const data = await trpc.auth.getMe.query()
    const currentUserDto = currentUserDtoSchema.parse(data)

    return AuthTransformer.toCurrentUser(currentUserDto)
  }
}
