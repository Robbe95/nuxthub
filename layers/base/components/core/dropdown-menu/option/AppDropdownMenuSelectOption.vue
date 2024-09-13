<script setup lang="ts">
import { useDropdownMenuStyle } from '@base/components/core/dropdown-menu/dropdownMenu.style'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppKeyboardShortcut from '@base/components/core/keyboard/AppKeyboardShortcut.vue'
import AppText from '@base/components/core/text/AppText.vue'
import type { DropdownMenuSelectOption } from '@base/types/core/dropdownMenuItem.type'
import { DropdownMenuItem as RadixDropdownMenuItem } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  item: DropdownMenuSelectOption
}>()

const dropdownMenuStyle = useDropdownMenuStyle()

const containerClasses = computed<string>(() => dropdownMenuStyle.itemContainer())
const contentClasses = computed<string>(() => dropdownMenuStyle.itemContent())

const iconClasses = computed<string>(() => dropdownMenuStyle.itemOptionIcon({
  variant: props.item.variant,
}))

const textClasses = computed<string>(() => dropdownMenuStyle.itemText({
  variant: props.item.variant,
}))
</script>

<template>
  <RadixDropdownMenuItem
    v-if="props.item.isHidden !== true"
    :class="containerClasses"
    :data-test-id="props.item.testId"
    :disabled="props.item.isDisabled"
    @select="props.item.onSelect"
  >
    <div :class="contentClasses">
      <AppIcon
        v-if="props.item.icon !== undefined"
        :icon="props.item.icon"
        :class="iconClasses"
        size="default"
      />

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
      class="ml-4"
    />
  </RadixDropdownMenuItem>
</template>
