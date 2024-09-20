import { useMeQuery } from '@auth/api/queries/me.query'
import { useGlobalI18n } from '@base/composables/i18n/useGlobaI18n'
import { defineNuxtRouteMiddleware } from 'nuxt/app'

export default defineNuxtRouteMiddleware(async () => {
  const { locale } = useGlobalI18n()
  const localePath = `/${locale.value}`
  const loginRedirectPath = `${localePath}/auth/login`

  try {
    const meQuery = useMeQuery()

    await meQuery.suspense()

    if (meQuery.error.value != null) {
      throw new Error('Me query error')
    }
  }
  catch {
    return navigateTo(loginRedirectPath)
  }
})
