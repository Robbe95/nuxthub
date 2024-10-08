<script setup lang="ts">
const hideBar = ref<boolean>(false)
</script>

<template>
  <div>
    <div class="flex min-h-screen flex-col">
      <TheAdminHeader />
      <div
        class="relative z-0 mx-auto flex size-full flex-1 gap-4 transition-all duration-200 "
      >
        <AppSidebar v-if="!hideBar" />
        <div class="p-8 transition-all duration-200">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
