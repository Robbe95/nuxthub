<script setup lang="ts">
import { useFormGroupStyle } from '@base/components/core/form-group/formGroup.style'
import { computed } from 'vue'

defineSlots<{
  /** The elements inside the group */
  default: () => void
}>()

const formGroupStyle = useFormGroupStyle()

const groupClasses = computed<string>(() => formGroupStyle.group())
</script>

<template>
  <div :class="groupClasses">
    <slot />
  </div>
</template>
