<script setup lang="ts">
import {
  useDeletePingerProjectMutation,
  usePostPingerProjectsMutation,
} from '~/api/pinger-project/mutations/pingerProject.mutation'
import {
  useGetPingerProjectByUuidQuery,
  useGetPingerProjectsQuery,
} from '~/api/pinger-project/queries/pingerProject.query'

const crud = useEntityCrud({
  getById: useGetPingerProjectByUuidQuery,
  delete: useDeletePingerProjectMutation,
  entityName: 'name',
  getAll: useGetPingerProjectsQuery,
  post: usePostPingerProjectsMutation,
  update: usePostPingerProjectsMutation,
})

crud.onDelete(({ data, mutation }) => {
  void mutation.mutateAsync({
    pingerProjectId: data.id,
  })
})

const test = crud.getAll()
</script>

<template>
  <div class="text-foreground">
    HERE DATA
    <AdminEntityCreate v-bind="crud" />
    <div>
      {{ test.data }}
    </div>
  </div>
</template>
