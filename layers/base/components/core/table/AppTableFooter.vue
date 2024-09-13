<script setup lang="ts">
import AppPaginationNext from '@base/components/core/pagination/AppPaginationNext.vue'
import AppPaginationPages from '@base/components/core/pagination/AppPaginationPages.vue'
import AppPaginationPrev from '@base/components/core/pagination/AppPaginationPrev.vue'
import AppPaginationResultIndicator from '@base/components/core/pagination/AppPaginationResultIndicator.vue'
import AppPaginationRoot from '@base/components/core/pagination/AppPaginationRoot.vue'
import { useTableStyle } from '@base/components/core/table/table.style'
import type {
  Pagination,
} from '@base/types/core/pagination.type'
import { computed } from 'vue'

const props = defineProps<{
  isLoading: boolean
  pagination: Pagination<unknown>
  total: null | number
}>()

const tableStyle = useTableStyle()

const footerClasses = computed<string>(() => tableStyle.footer())
</script>

<template>
  <div
    v-if="!props.isLoading"
    :class="footerClasses"
  >
    <AppPaginationRoot
      :pagination="props.pagination"
      :total="props.total ?? 0"
    >
      <AppPaginationResultIndicator />

      <div class="flex items-center gap-x-2">
        <AppPaginationPrev />
        <AppPaginationPages />
        <AppPaginationNext />
      </div>
    </AppPaginationRoot>
  </div>
</template>
