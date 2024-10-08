<script setup lang="ts">
import AppBadge from '@base/components/core/badge/AppBadge.vue'
import { useTabsStyle } from '@base/components/core/tabs/tabs.style'
import AppText from '@base/components/core/text/AppText.vue'
import type { RouteTabItem } from '@base/types/core/tabItem.type'
import {
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from 'radix-vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  /**
   * All the tabs to be rendered.
   */
  tabs: RouteTabItem[]
}>()

const route = useRoute()
const router = useRouter()

const activeRouteName = computed<string>({
  get: () => route.name as string,
  set: (value: string) => {
    const tab = props.tabs.find((tab) => tab.to.name === value) ?? null

    if (tab === null) {
      throw new Error(`Tab with route name "${String(value)}" not found`)
    }

    void router.push(tab.to)
  },
})

function isTabActive(tab: RouteTabItem): boolean {
  return tab.to.name === activeRouteName.value
}

// TODO: tabs should render a RouterLink instead of a button

const tabsStyle = useTabsStyle()

const listClasses = computed<string>(() => tabsStyle.list())
const indicatorClasses = computed<string>(() => tabsStyle.indicator())
const routeTriggerGroup = computed<string>(() => tabsStyle.triggerGroup())
const routeTriggerTab = computed<string>(() => tabsStyle.triggerTab())
</script>

<template>
  <TabsRoot v-model="activeRouteName">
    <TabsList :class="listClasses">
      <TabsIndicator :class="indicatorClasses" />

      <TabsTrigger
        v-for="tab of tabs"
        :key="tab.label"
        :value="(tab.to.name as string)"
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
