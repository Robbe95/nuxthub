<script setup lang="ts">
import { useKeyboardShortcut } from '@base/composables/core/keyboard-shortcut/keyboardShortcut.composable'
import type { KeyboardKey } from '@base/types/core/keyboard.type'
import type { KeyboardShortcutConfig } from '@base/types/core/keyboardShortcut.type'
import { ref } from 'vue'

const props = defineProps<{
  /**
   * The keyboard shortcut configuration
   */
  config: KeyboardShortcutConfig
}>()

defineSlots<{
  /** The keyboard shortcut content */
  default: (props: {
    keys: KeyboardKey[]
  }) => any
}>()

const wrapperRef = ref<HTMLElement | null>(null)

useKeyboardShortcut({
  keys: props.config.keys,
  onTrigger: (event) => {
    const firstElement = wrapperRef.value?.firstElementChild ?? null

    if (props.config.preventDefault ?? false) {
      event.preventDefault()
    }

    if (props.config.stopPropagation ?? false) {
      event.stopPropagation()
    }

    if (firstElement instanceof HTMLElement) {
      firstElement.click()
    }
  },
})
</script>

<template>
  <div ref="wrapperRef">
    <slot :keys="props.config.keys" />
  </div>
</template>
