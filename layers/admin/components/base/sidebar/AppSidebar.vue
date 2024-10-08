<script setup lang="ts">
import AppSidebarMenuItem from '@admin/components/base/sidebar/AppSidebarMenuItem.vue'
import AppSidebarMenuTooltipContent from '@admin/components/base/sidebar/AppSidebarMenuTooltipContent.vue'
import type { NavigationItem } from '@base/types/core/navigationItem.type'
import { computed } from 'vue'

import AppSidebarFooter from './AppSidebarFooter.vue'
import AppSidebarHeader from './AppSidebarHeader.vue'

const navigationItems = computed<NavigationItem[]>(() => [
  {
    items: [
      {
        icon: 'eye',
        label: 'Pinger Projects',
        to: '/admin/pinger-project',
        type: 'option',
      },
    ],
    label: 'Entity',
    type: 'group',
  },
])
</script>

<template>
  <AppSidebarNavigation :items="navigationItems">
    <template #header>
      <AppSidebarHeader />
    </template>

    <template #trigger="{ navigationItem, isOpen }">
      <AppSidebarMenuItem
        :is-open="isOpen"
        :navigation-item="navigationItem"
      />
    </template>
    <template #content="{ navigationItem, isOpen }">
      <AppSidebarMenuTooltipContent
        :navigation-item="navigationItem"
        :is-open="isOpen"
      />
    </template>
    <template #footer>
      <AppSidebarFooter />
    </template>
  </AppSidebarNavigation>
</template>
