<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <AuthPage
    :title=" t('auth.login.title')"
    :description=" t('auth.login.description')"
  >
    <AuthLoginForm />
  </AuthPage>
</template>
