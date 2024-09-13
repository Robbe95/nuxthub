<script setup lang="ts">
import { useComboboxStyle } from '@base/components/core/combobox/combobox.style'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppText from '@base/components/core/text/AppText.vue'
import type { Icon } from '@base/icons/icons'
import { ComboboxGroup, ComboboxLabel } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  icon?: Icon
  label: string
  size?: 'default' | 'lg' | 'sm'
}>()

const comboboxStyle = useComboboxStyle()
const groupText = computed<string>(() => comboboxStyle.groupText({
  size: props.size,
}))
</script>

<template>
  <ComboboxGroup>
    <ComboboxLabel class="px-2 py-1">
      <div class="flex items-center gap-2">
        <AppIcon
          v-if="props.icon"
          :icon="props.icon"
          :size="props.size"
        />
        <AppText
          :class="groupText"
          variant="caption"
        >
          {{ props.label }}
        </AppText>
      </div>
    </ComboboxLabel>

    <div class="pl-2">
      <slot />
    </div>
  </ComboboxGroup>
</template>
