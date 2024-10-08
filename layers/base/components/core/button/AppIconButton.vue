<script setup lang="ts">
import {
  type ButtonStyleProps,
  useButtonStyle,
} from '@base/components/core/button/button.style'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import type { IconStyleProps } from '@base/components/core/icon/icon.style'
import AppLoader from '@base/components/core/loader/AppLoader.vue'
import type { Icon } from '@base/icons/icons'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * Whether the button is disabled
     * @default false
     */
    isDisabled?: boolean
    /**
     * Whether the button is loading
     * @default false
     */
    isLoading?: boolean
    /**
     * The icon to display
     */
    icon: Icon
    /**
     * The label for the button for accessibility
     */
    label: string
    /**
     * The size of the button
     * @default default
     */
    size?: ButtonStyleProps['size']
    /**
     * The type of the button.
     * @default 'button'
     */
    type?: 'button' | 'reset' | 'submit'
    /**
     * The variant of the button
     * @default default
     */
    variant?: ButtonStyleProps['variant']
  }>(),
  {
    isDisabled: false,
    isLoading: false,
    size: 'default',
    type: 'button',
    variant: 'default',
  },
)

const buttonStyle = useButtonStyle()
const iconButtonClasses = computed<string>(() =>
  buttonStyle.iconButton({
    size: props.size,
    variant: props.variant,
  }))

const buttonLoaderClasses = computed<string>(() => buttonStyle.loader())
const buttonLoaderContainerClasses = computed<string>(() => buttonStyle.loaderContainer())

const iconSize = computed<IconStyleProps['size']>(() => {
  if (props.size === 'sm' || props.size === 'xs') {
    return 'sm'
  }

  if (props.size === 'lg') {
    return 'lg'
  }

  if (props.size === 'default') {
    return 'default'
  }

  return 'full'
})
</script>

<template>
  <button
    :aria-label="props.label"
    :class="iconButtonClasses"
    :disabled="isDisabled || isLoading"
    :type="props.type"
  >
    <span
      v-if="props.isLoading"
      :class="buttonLoaderContainerClasses"
    >
      <AppLoader :class="buttonLoaderClasses" />
    </span>

    <AppIcon
      v-else
      :icon="props.icon"
      :size="iconSize"
    />
  </button>
</template>
