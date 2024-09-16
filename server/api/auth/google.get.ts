import { accountService } from '@server/modules/auth/services/account.service'

export default oauthGoogleEventHandler({
  onError(event, error) {
    console.error(error)

    return sendRedirect(event, '/auth/login')
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, { user })

    await accountService.createUserFromProvider({ ...user, provider: 'google' })

    return sendRedirect(event, '/')
  },
})
