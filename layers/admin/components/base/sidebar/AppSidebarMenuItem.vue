<script setup lang="ts">
import type { NavigationItem } from '@base/types/core/navigationItem.type'

const props = defineProps<{
  isOpen: boolean
  navigationItem: NavigationItem
}>()
</script>

<template>
  <div v-if="props.navigationItem.type === 'option'">
    <NuxtLinkLocale
      :to="props.navigationItem.to"
      active-class="active"
      class="group block rounded-button"
    >
      <div
        :class="[
          props.isOpen ? 'justify-start px-3' : 'justify-center',
        ]"
        class="flex h-10 w-full items-center gap-3 rounded-button duration-200 group-hover:bg-zinc-900 group-[.active]:bg-zinc-900"
      >
        <AppIcon
          :icon="props.navigationItem.icon"
          size="lg"
        />
        <AppText
          v-if="props.isOpen"
          variant="subtext"
        >
          {{ props.navigationItem.label }}
        </AppText>
      </div>
    </NuxtLinkLocale>
  </div>
</template>
