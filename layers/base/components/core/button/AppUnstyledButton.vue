<script setup lang="ts">
import { useButtonStyle } from '@base/components/core/button/button.style'
import { computed } from 'vue'

defineSlots<{
  /** Content of the button */
  default: () => void
}>()

const buttonStyle = useButtonStyle()
const unstyledButtonClasses = computed<string>(() => buttonStyle.unstyledButton())
</script>

<template>
  <button
    :class="unstyledButtonClasses"
    type="button"
  >
    <slot />
  </button>
</template>
