<script setup lang="ts">
import { providePaginationContext } from '@base/components/core/pagination/pagination.context'
import type {
  PageChangeEvent,
  Pagination,
} from '@base/types/core/pagination.type'
import { computed } from 'vue'

const props = defineProps<{
  pagination: Pagination<unknown>
  total: number
}>()

const hasMoreThanOnePage = computed<boolean>(() => {
  return props.total > props.pagination.paginationOptions.value.pagination.perPage
})

function setPage(page: number): void {
  const updatedPaginationOptions = {
    ...props.pagination.paginationOptions.value.pagination,
    page,
  } as PageChangeEvent

  props.pagination.handlePageChange(updatedPaginationOptions)
}

providePaginationContext({
  hasMoreThanOnePage,
  page: computed<number>(() => props.pagination.paginationOptions.value.pagination.page),
  perPage: computed<number>(() => props.pagination.paginationOptions.value.pagination.perPage),
  totalPages: computed<number>(() => {
    return Math.ceil(props.total / props.pagination.paginationOptions.value.pagination.perPage)
  }),
  onPageChange: setPage,
})
</script>

<template>
  <slot />
</template>
