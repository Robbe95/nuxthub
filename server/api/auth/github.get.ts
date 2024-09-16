export default oauthGitHubEventHandler({
  onError(event, error) {
    console.error(error)

    return sendRedirect(event, '/auth/login')
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, { user })

    return sendRedirect(event, '/todos')
  },
})
