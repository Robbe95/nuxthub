<script setup lang="ts">
import AppPopoverCloseButton from '@base/components/core/popover/AppPopoverCloseButton.vue'
import AppPopoverTrigger from '@base/components/core/popover/AppPopoverTrigger.vue'
import { usePopoverStyle } from '@base/components/core/popover/popover.style'
import {
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
} from 'radix-vue'
import { computed, useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * Whether the close button is hidden.
     * @default 'false'
     */
    isCloseButtonHidden?: boolean
    /**
     * The alignment of the popover content.
     * @default 'center'
     */
    align?: 'center' | 'end' | 'start'
    /**
     * When true, the arrow will be hidden.
     * @default false
     */
    hideArrow?: boolean
    /**
     * The offset of the popover content.
     * @default 10
     */
    offset?: number
    /**
     * The side of the trigger the popover should be on.
     * @default 'bottom'
     */
    side?: 'bottom' | 'left' | 'right' | 'top'
  }>(),
  {
    isCloseButtonHidden: false,
    align: 'center',
    hideArrow: false,
    offset: 10,
    side: 'bottom',
  },
)

defineSlots<{
  /** Content of the popover */
  content: () => void
  /** Trigger element for the popover */
  default: () => void
}>()

const slots = useSlots()

if (slots.default === undefined) {
  throw new Error('[POPOVER] The `trigger` slot is required.')
}

const popoverStyle = usePopoverStyle()

const arrowContainerClasses = computed<string>(() => popoverStyle.arrowContainer())
const closeButtonContainerClasses = computed<string>(() => popoverStyle.closeButtonContainer())
const contentClasses = computed<string>(() => popoverStyle.content())
const arrowClasses = computed<string>(() => popoverStyle.arrow())
</script>

<template>
  <PopoverRoot>
    <AppPopoverTrigger>
      <slot />
    </AppPopoverTrigger>

    <PopoverPortal>
      <PopoverContent
        :align="props.align"
        :has-arrow="!props.hideArrow"
        :side="props.side"
        :side-offset="props.offset"
        :class="contentClasses"
      >
        <AppPopoverCloseButton
          v-if="props.isCloseButtonHidden !== true"
          :class="closeButtonContainerClasses"
        />

        <slot name="content" />

        <PopoverArrow
          v-if="!props.hideArrow"
          :as-child="true"
        >
          <div :class="arrowContainerClasses">
            <div
              :class="arrowClasses"
            />
          </div>
        </PopoverArrow>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
