<script setup lang="ts">
import { useDropdownMenuStyle } from '@base/components/core/dropdown-menu/dropdownMenu.style'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppKeyboardShortcut from '@base/components/core/keyboard/AppKeyboardShortcut.vue'
import AppText from '@base/components/core/text/AppText.vue'
import type { DropdownMenuCheckboxOption } from '@base/types/core/dropdownMenuItem.type'
import {
  DropdownMenuCheckboxItem,
  DropdownMenuItemIndicator,
} from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  item: DropdownMenuCheckboxOption
}>()

const dropdownMenuStyle = useDropdownMenuStyle()

const checkboxClasses = computed<string>(() => dropdownMenuStyle.itemCheckbox())
const containerClasses = computed<string>(() => dropdownMenuStyle.itemContainer())
const contentClasses = computed<string>(() => dropdownMenuStyle.itemContent())
const indicatorClasses = computed<string>(() => dropdownMenuStyle.itemCheckboxIndicator())

const textClasses = computed<string>(() => dropdownMenuStyle.itemText({
  variant: props.item.variant,
}))
</script>

<template>
  <DropdownMenuCheckboxItem
    v-if="props.item.isHidden !== true"
    :checked="props.item.isSelected.value"
    :disabled="props.item.isDisabled"
    :data-test-id="props.item.testId"
    :class="containerClasses"
    @select.prevent="props.item.onSelect"
  >
    <!-- Content -->
    <div :class="contentClasses">
      <div :class="checkboxClasses">
        <DropdownMenuItemIndicator>
          <AppIcon
            :class="indicatorClasses"
            icon="checkmark"
            size="sm"
          />
        </DropdownMenuItemIndicator>
      </div>

      <AppText
        :class="textClasses"
        variant="subtext"
      >
        {{ props.item.label }}
      </AppText>
    </div>

    <AppKeyboardShortcut
      v-if="props.item.keyboardShortcutKeys !== undefined"
      :keys="props.item.keyboardShortcutKeys"
    />
  </DropdownMenuCheckboxItem>
</template>
