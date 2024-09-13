<script setup lang="ts">
import { useDropdownMenuStyle } from '@base/components/core/dropdown-menu/dropdownMenu.style'
import type {
  DropdownMenuRenderOption,
} from '@base/types/core/dropdownMenuItem.type'
import { DropdownMenuItem as RadixDropdownMenuItem } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  item: DropdownMenuRenderOption
}>()

const dropdownMenuStyle = useDropdownMenuStyle()

const containerClasses = computed<string>(() => dropdownMenuStyle.itemContainer())
const contentClasses = computed<string>(() => dropdownMenuStyle.itemContent())
</script>

<template>
  <RadixDropdownMenuItem
    :class="containerClasses"
  >
    <div :class="contentClasses">
      <Component
        :is="props.item.render()"
        v-if="props.item.render !== undefined"
      />
    </div>
  </RadixDropdownMenuItem>
</template>
