<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex w-full flex-col pb-24 text-foreground">
    <AppText
      class="font-medium"
      variant="title"
    >
      {{ props.title }}
    </AppText>

    <AppText
      class="mt-2"
      variant="subtext"
    >
      {{ props.description }}
    </AppText>

    <div class="mt-6 w-full">
      <slot />
    </div>
  </div>
</template>
