<script setup lang="ts">
import type { BadgeStyleProps } from '@base/components/core/badge/badge.style'
import { useBadgeStyle } from '@base/components/core/badge/badge.style'
import AppText from '@base/components/core/text/AppText.vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * Set true to remove border, padding and shadow classes.
     */
    isUnstyled?: boolean
    /**
     * Badge rounded borders variant.
     */
    rounded?: BadgeStyleProps['rounded']
    /**
     * Badge style variant.
     */
    variant?: BadgeStyleProps['variant']
  }>(),
  {
    isUnstyled: false,
    rounded: 'default',
    variant: 'default',
  },
)

defineSlots<{
  /** The content of the badge */
  default: () => void
}>()

const badgeStyle = useBadgeStyle()
const badgeClasses = computed<string>(() => badgeStyle.badge({
  rounded: props.rounded,
  unstyled: props.isUnstyled,
  variant: props.variant,
}))
</script>

<template>
  <div :class="badgeClasses">
    <AppText variant="caption">
      <slot />
    </AppText>
  </div>
</template>
