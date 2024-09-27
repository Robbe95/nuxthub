<script setup lang="ts">
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

  onDelete: (payload) => {
    console.log(payload)
  },
})

crud
</script>

<template>
  <div>
    <slot />
  </div>
</template>
