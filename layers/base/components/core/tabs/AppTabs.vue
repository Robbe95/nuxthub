<script setup lang="ts">
import AppBadge from '@base/components/core/badge/AppBadge.vue'
import { useTabsStyle } from '@base/components/core/tabs/tabs.style'
import AppText from '@base/components/core/text/AppText.vue'
import type { TabItem } from '@base/types/core/tabItem.type'
import {
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  /**
   * All the tabs to be rendered.
   */
  items: TabItem[]
}>()

const activeTabModel = defineModel<TabItem>('tab', {
  required: true,
})

const computedModel = computed<string>({
  get: () => activeTabModel.value.id,
  set: (value) => {
    activeTabModel.value = props.items.find((tab) => tab.id === value)!
  },
})

function isTabActive(tab: TabItem): boolean {
  return tab.id === computedModel.value
}

const tabsStyle = useTabsStyle()

const listClasses = computed<string>(() => tabsStyle.list())
const indicatorClasses = computed<string>(() => tabsStyle.indicator())
const routeTriggerGroup = computed<string>(() => tabsStyle.triggerGroup())
const routeTriggerTab = computed<string>(() => tabsStyle.triggerTab())
</script>

<template>
  <TabsRoot v-model="computedModel">
    <TabsList :class="listClasses">
      <TabsIndicator :class="indicatorClasses" />

      <TabsTrigger
        v-for="tab of items"
        :key="tab.label"
        :data-test-id="tab.testId"
        :value="tab.id"
        :class="routeTriggerGroup"
      >
        <div :class="routeTriggerTab">
          <AppText
            :class="tabsStyle.text({
              isActive: isTabActive(tab),
            })"
            as="span"
            variant="subtext"
          >
            {{ tab.label }}
          </AppText>
          <AppBadge
            v-if="tab.badge"
            :class="tab.badge.class"
          >
            {{ tab.badge.label }}
          </AppBadge>
        </div>
      </TabsTrigger>
    </TabsList>
  </TabsRoot>
</template>
