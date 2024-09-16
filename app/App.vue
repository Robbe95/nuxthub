<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'

// const authStore = useAuthStore()

function useIdFunction() {
  return useId()
}

// async function fetchUser() {
//   try {
//     await authStore.getCurrentUser()
//   }
//   catch {
//     console.error('NO CURRENT USER')
//   }
// }

// onMounted(async () => {
//   await fetchUser()
// })
</script>

<template>
  <SeoWrapper>
    <div class="flex w-screen flex-1">
      <div class="w-full">
        <ConfigProvider :use-id="useIdFunction">
          <NuxtLoadingIndicator color="#E94935" />
          <NuxtLayout>
            <NuxtPage />
          </NuxtLayout>
          <Teleport to="#teleports">
            <AppDialogContainer />
            <AppToastContainer />
          </Teleport>
        </ConfigProvider>
      </div>
    </div>
  </SeoWrapper>
</template>
