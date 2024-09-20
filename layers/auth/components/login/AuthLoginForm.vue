<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col gap-2">
    <AppButtonLink
      to="/api/auth/github"
      icon-left="github"
      external
    >
      {{ t('auth.login.login_with_github') }}
    </AppButtonLink>
    <AppButtonLink
      icon-left="google"
      to="/api/auth/google"
      external
    >
      {{ t('auth.login.login_with_google') }}
    </AppButtonLink>
  </div>
</template>
