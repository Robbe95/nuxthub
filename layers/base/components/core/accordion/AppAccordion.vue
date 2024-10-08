<script setup lang="ts">
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppText from '@base/components/core/text/AppText.vue'
import AppCollapseTransition from '@base/components/core/transitions/AppCollapseTransition.vue'
import type { Accordion } from '@base/types/core/accordionItem.type'
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'radix-vue'
import { computed } from 'vue'

import { useAccordionStyle } from './accordion.style'

const props = withDefaults(
  defineProps<{
    /**
     * When type is "single", prevents closing content when clicking trigger for an open item.
     */
    isStatic: boolean
    /**
     * Content of the accordion.
     */
    items: Accordion[]
    /**
     * Determines whether "single" or "multiple" items can be pressed at a time.
     */
    type: 'multiple' | 'single'
  }>(),
  {
    isStatic: false,
    type: 'single',
  },
)

defineSlots<{
  /** Override the rendering of the accordion tab's title */
  title: (props: {
    title: string
    subtitle: string | undefined
  }) => any
  /** Override the rendering of the accordion tab's content */
  content: (props: {
    content: string
  }) => any
}>()

const accordionStyle = useAccordionStyle()

const rootClasses = computed<string>(() => accordionStyle.root())
const itemClasses = computed<string>(() => accordionStyle.item())
const triggerClasses = computed<string>(() => accordionStyle.trigger())
const iconClasses = computed<string>(() => accordionStyle.icon())
const contentClasses = computed<string>(() => accordionStyle.content())
const contentDivClasses = computed<string>(() => accordionStyle.contentDiv())
const titleClasses = computed<string>(() => accordionStyle.title())
</script>

<template>
  <AccordionRoot
    :type="props.type"
    :collapsible="!props.isStatic"
    :class="rootClasses"
  >
    <template
      v-for="item in props.items"
      :key="item.value"
    >
      <AccordionItem
        :value="item.value"
        :class="itemClasses"
      >
        <AccordionHeader class="flex">
          <AccordionTrigger :class="triggerClasses">
            <slot
              :title="item.title"
              :subtitle="item.subtitle"
              name="title"
            >
              <div :class="titleClasses">
                <AppText variant="subtext">
                  {{ item.title }}
                </AppText>
                <AppText variant="caption">
                  {{ item.subtitle }}
                </AppText>
              </div>
            </slot>
            <AppIcon
              :class="iconClasses"
              icon="chevronDown"
            />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent :class="contentClasses">
          <AppCollapseTransition>
            <slot
              :content="item.content"
              name="content"
            >
              <div :class="contentDivClasses">
                {{ item.content }}
              </div>
            </slot>
          </AppCollapseTransition>
        </AccordionContent>
      </AccordionItem>
    </template>
  </AccordionRoot>
</template>
