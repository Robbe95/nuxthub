import { AuthTransformer } from '@auth/models/auth.transformer'
import type { CurrentUser } from '@auth/models/current-user/currentUser.model'
import { currentUserDtoSchema } from '@auth/models/current-user/currentUserDto.model'
import type { ForgotPasswordForm } from '@auth/models/forgot-password/forgotPasswordForm.model'
import type { RegisterForm } from '@auth/models/register/registerForm.model'
import type { ResetPasswordForm } from '@auth/models/reset-password/resetPasswordForm.model'
import { useUnauthorizedApi } from '@base/composables/api/useApi'
import { z } from 'zod'

import { useTrpc } from '~/api/useTrpc'

export class AuthService {
  static async forgotPassword(form: ForgotPasswordForm): Promise<void> {
    const unauthorizedHttpClient = useUnauthorizedApi()

    await unauthorizedHttpClient.post({
      body: AuthTransformer.toForgotPasswordDto(form),
      responseSchema: z.unknown(),
      url: '/forgot-password',
    })
  }

  static async getCurrentUser(): Promise<CurrentUser> {
    const { trpc } = useTrpc()

    const data = await trpc.auth.getMe.query()
    const currentUserDto = currentUserDtoSchema.parse(data)

    return AuthTransformer.toCurrentUser(currentUserDto)
  }

  static async register(form: RegisterForm): Promise<void> {
    const unauthorizedHttpClient = useUnauthorizedApi()

    await unauthorizedHttpClient.post({
      body: AuthTransformer.toRegisterDto(form),
      responseSchema: z.unknown(),
      url: '/contracts',
    })
  }

  static async resetPassword(form: ResetPasswordForm): Promise<void> {
    const unauthorizedHttpClient = useUnauthorizedApi()

    await unauthorizedHttpClient.post({
      body: AuthTransformer.toResetPasswordDto(form),
      responseSchema: z.unknown(),
      url: '/reset-password',
    })
  }
}
