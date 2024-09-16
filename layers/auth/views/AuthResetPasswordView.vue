<script setup lang="ts">
import { resetPasswordFormSchema } from '@auth/models/reset-password/resetPasswordForm.model'
import { useToast } from '@wisemen/vue-core'
import { useForm } from 'formango'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const hasPasswordBeenReset = ref<boolean>(true)

const { t } = useI18n()
const toast = useToast()

const {
  form,
  onSubmitForm,
  onSubmitFormError,
} = useForm({
  schema: resetPasswordFormSchema,
})

const route = useRoute('auth-reset-password')

form.register('token', route.query.token as string)
form.register('email', route.query.email as string)

const description = computed<string>(() => {
  if (hasPasswordBeenReset.value) {
    return t('auth.reset_password.success.description')
  }

  return t('auth.reset_password.description')
})

onSubmitFormError(() => {
  toast.error({
    title: t('error.invalid_form_input.title'),
    description: t('error.invalid_form_input.description'),
  })
})

onSubmitForm((_values) => {
  try {
    hasPasswordBeenReset.value = true
  }
  catch (error) {
    console.error(error)
    // TODO: handle error
  }
})
</script>

<template>
  <AuthPage
    :description="description"
    :title="t('auth.reset_password.title')"
  >
    <ResetPasswordForm
      v-if="!hasPasswordBeenReset"
      :form="form"
    />

    <NuxtLinkLocale
      v-else
      :to="{
        name: 'auth-login',
      }"
    >
      {{ t('auth.reset_password.success.action') }}
    </NuxtLinkLocale>
  </AuthPage>
</template>
