<script setup lang="ts">
import { useTableStyle } from '@base/components/core/table/table.style'
import AppText from '@base/components/core/text/AppText.vue'
import { computed } from 'vue'

const tableStyle = useTableStyle()

const textCellClasses = computed<string>(() => tableStyle.cell())
</script>

<template>
  <AppText
    :class="textCellClasses"
    variant="subtext"
  >
    <slot />
  </AppText>
</template>
