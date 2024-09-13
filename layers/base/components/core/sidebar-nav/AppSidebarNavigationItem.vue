<script setup lang="ts">
import AppKeyboardShortcutProvider from '@base/components/core/keyboard/AppKeyboardShortcutProvider.vue'
import AppTooltip from '@base/components/core/tooltip/AppTooltip.vue'
import type { NavigationItemOption } from '@base/types/core/navigationItem.type.ts'
import { computed } from 'vue'

import { useSidebarNavStyle } from './sidebarNav.style'

const props = defineProps<{
  item: NavigationItemOption
}>()

const sidebarNavStyle = useSidebarNavStyle()

const itemClasses = computed<string>(() => sidebarNavStyle.item())
</script>

<template>
  <li
    :key="props.item.label"
    :class="itemClasses"
  >
    <AppTooltip
      :disable-close-on-trigger-click="true"
      :hide-arrow="true"
      side="right"
    >
      <Component
        :is="props.item.keyboardShortcut === undefined ? 'div' : AppKeyboardShortcutProvider"
        :config="props.item.keyboardShortcut"
      >
        <slot
          :icon="props.item.icon"
          :label="props.item.label"
          :to="props.item.to"
          name="trigger"
        />
      </Component>

      <template #content>
        <slot
          :label="props.item.label"
          :keyboard-shortcut="props.item.keyboardShortcut"
          name="content"
        />
      </template>
    </AppTooltip>
  </li>
</template>
