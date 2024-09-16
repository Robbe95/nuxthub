<script setup lang="ts">
import { useTrpc } from '~/api/useTrpc'

definePageMeta({
  // middleware: 'auth-middleware',
})

const {
  loggedIn,
  session,

} = useUserSession()

useI18n()

onMounted(() => {
  const trpc = useTrpc()

  trpc.trpc.auth.getMe.query()
})
</script>

<template>
  <div class="w-full">
    <NuxtLinkLocale

      to="http://localhost:3000/api/auth/github"
      external
    >
      {{ `${123}login` }}
    </NuxtLinkLocale>
    {{ loggedIn }}
    {{ session }}
    <!-- <MockConstruction /> -->
  </div>
</template>

<style scoped>

</style>
