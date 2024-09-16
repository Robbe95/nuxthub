import { accountService } from '@server/modules/auth/services/account.service'

export default oauthGitHubEventHandler({
  onError(event, error) {
    console.error(error)

    return sendRedirect(event, '/auth/login')
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, { user })

    await accountService.createUserFromGithub(user)

    return sendRedirect(event, '/')
  },
})
