<script setup lang="ts">
import AppDropdownMenuRadio from '@base/components/core/dropdown-menu/option/AppDropdownMenuRadioOption.vue'
import type { DropdownMenuRadioGroup as DropdownMenuRadioGroupType } from '@base/types/core/dropdownMenuItem.type'
import { DropdownMenuRadioGroup } from 'radix-vue'

const props = defineProps<{
  item: DropdownMenuRadioGroupType
}>()
</script>

<template>
  <DropdownMenuRadioGroup
    :model-value="JSON.stringify(props.item.modelValue.value)"
    @update:model-value="(value) => props.item.updateModelValue(JSON.parse(value as unknown as string))"
  >
    <AppDropdownMenuRadio
      v-for="(radioItem, i) of props.item.items"
      :key="i"
      :data-test-id="radioItem.testId"
      :item="radioItem"
    />
  </DropdownMenuRadioGroup>
</template>
