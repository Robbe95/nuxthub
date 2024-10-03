<script setup lang="ts">
import AppTabs from '@base/components/core/tabs/AppTabs.vue'
import type { TabItem } from '@base/types/core/tabItem.type'
import { pingerProjectCreateSchema } from '@shared/models/pinger-project/pingerProject.schema'
import { useForm } from 'formango'
import { ref } from 'vue'

import { usePostPingerProjectsMutation } from '~/api/pinger-project/mutations/pingerProject.mutation'

const createMutation = usePostPingerProjectsMutation()

const tabs = ref<TabItem[]>([
  {
    id: 'info',
    label: 'Info',
  },
])

if (tabs.value[0] == null) {
  throw new Error('No tabs provided')
}

const currentTab = ref<TabItem>(tabs.value[0])

const { form, onSubmitForm } = useForm({
  schema: pingerProjectCreateSchema,
})

onSubmitForm((data) => {
  void createMutation.mutateAsync({
    name: data.info.name,
  })
})

const info = form.register('info')
</script>

<template>
  <div class="flex w-full flex-1 flex-col gap-4 text-foreground">
    <AppTabs
      :items="tabs"
      :tab="currentTab"
    />
    <div class="rounded-card border border-solid border-foreground/50 p-8">
      <AdminPingerProjectCreateInfo
        v-if="currentTab.id === 'info'"
        :info="info"
      />
    </div>
  </div>
</template>
