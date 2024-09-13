<script setup lang="ts">
import AppIconButton from '@base/components/core/button/AppIconButton.vue'
import { injectPaginationContext } from '@base/components/core/pagination/pagination.context'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const paginationContext = injectPaginationContext()

const isLastPage = computed<boolean>(() => {
  return paginationContext.page.value === paginationContext.totalPages.value - 1
})

function onNextClick(): void {
  paginationContext.onPageChange(paginationContext.page.value + 1)
}
</script>

<template>
  <AppIconButton
    v-if="paginationContext.hasMoreThanOnePage.value"
    :is-disabled="isLastPage"
    :label="t('components.table.next')"
    icon="arrowRight"
    variant="ghost"
    @click="onNextClick"
  />
</template>
