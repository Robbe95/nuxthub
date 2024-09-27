<script setup lang="ts">
import { useEntityCrud } from '@admin/composables/useEntityCrud'

import { usePostPingerProjectsMutation } from '~/api/pinger-project/mutations/pingerProject.mutation'
import {
  useGetPingerProjectByUuidQuery,
  useGetPingerProjectsQuery,
} from '~/api/pinger-project/queries/pingerProject.query'

const crud = useEntityCrud({
  getById: useGetPingerProjectByUuidQuery,
  delete: usePostPingerProjectsMutation,
  entityName: 'name',
  getAll: useGetPingerProjectsQuery,
  post: usePostPingerProjectsMutation,
  update: usePostPingerProjectsMutation,
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <slot />
  </div>
</template>
