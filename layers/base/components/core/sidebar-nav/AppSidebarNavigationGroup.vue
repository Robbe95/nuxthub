<script setup lang="ts">
import AppText from '@base/components/core/text/AppText.vue'
import type { NavigationItemGroup } from '@base/types/core/navigationItem.type.ts'
import { computed } from 'vue'

import { useSidebarNavStyle } from './sidebarNav.style'

const props = defineProps<{
  item: NavigationItemGroup
}>()

const sidebarNavStyle = useSidebarNavStyle()

const groupContainerClasses = computed<string>(() => sidebarNavStyle.groupContainer())
const groupTitleClasses = computed<string>(() => sidebarNavStyle.groupTitle())
</script>

<template>
  <ul :class="groupContainerClasses">
    <AppText
      :class="groupTitleClasses"
      variant="caption"
    >
      {{ props.item.label }}
    </AppText>
    <slot />
  </ul>
</template>
