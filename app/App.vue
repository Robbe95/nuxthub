<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'

function useIdFunction() {
  return useId() as string
}
</script>

<template>
  <SeoWrapper>
    <div class="flex w-screen flex-1">
      <div class="w-full">
        <ConfigProvider :use-id="useIdFunction">
          <NuxtLoadingIndicator
            color="#E94935"
            class="[color:var(--foreground)]"
          />
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
