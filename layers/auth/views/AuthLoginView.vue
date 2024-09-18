<script setup lang="ts">
import type { CurrentUser } from '@auth/models/current-user/currentUser.model'
import { loginFormSchema } from '@auth/models/login/loginForm.model'
import { useAuthStore } from '@auth/stores/auth.store'
import { useToast } from '@base/composables/core/toast.composable'
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const localeRoute = useLocaleRoute()
const isLoading = ref<boolean>(false)
const { lastLoggedInUser } = storeToRefs(authStore)

const { t } = useI18n()
const toast = useToast()

const { form, onSubmitForm } = useForm({
  schema: loginFormSchema,
})

async function handleLoggedIn(user: CurrentUser): Promise<void> {
  authStore.setLastLoginAttemptEmail(null)
  authStore.setLastLoggedInUser(user)

  const path = localeRoute({
    path: '/',
  })

  await navigateTo(path)
}

function handleLoginError(): void {
  form.addErrors({
    password: {
      _errors: [
        t('auth.login.invalid_email_or_password'),
      ],
    },
  })

  toast.error({
    title: t('auth.login.error_toast.title'),
    description: t('auth.login.error_toast.description'),
  })
}

onSubmitForm(async (data) => {
  try {
    isLoading.value = true

    const currentUser = await authStore.getCurrentUser()

    if (currentUser == null) {
      throw new Error('No current user found')
    }

    void handleLoggedIn(currentUser)
  }
  catch (e) {
    console.error(e)
    handleLoginError()
    authStore.setLastLoginAttemptEmail(data.email)
  }
  finally {
    isLoading.value = false
  }
})
</script>

<template>
  <AuthPage
    :title=" t('auth.login.title')"
    :description=" t('auth.login.description')"
  >
    <AuthLoginForm
      :form="form"
      :last-logged-in-user="lastLoggedInUser"
    />
    <I18nT
      keypath="auth.login.no_account"
      class="mt-4 text-center text-sm"
      tag="p"
    >
      <template #register_account>
        <NuxtLinkLocale
          :to="{
            name: 'auth-register',
          }"
          class="text-right font-medium text-primary hover:underline focus:underline"
        >
          <AppText
            variant="subtext"
            as="span"
          >
            {{ t('auth.login.register') }}
          </AppText>
        </NuxtLinkLocale>
      </template>
    </I18nT>
  </AuthPage>
</template>
