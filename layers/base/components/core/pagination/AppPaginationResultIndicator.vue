<script setup lang="ts">
import { injectPaginationContext } from '@base/components/core/pagination/pagination.context'
import AppText from '@base/components/core/text/AppText.vue'
import { NumberUtil } from '@base/utils/core/number.util'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const paginationContext = injectPaginationContext()

const totalPages = computed<number>(() => {
  return paginationContext.totalPages.value
})

const currentPage = computed<number>(() => {
  if (totalPages.value === 0) {
    return 0
  }

  return paginationContext.page.value + 1
})
</script>

<template>
  <AppText variant="subtext">
    {{ t('components.table.page') }}
    {{ NumberUtil.toLocaleNumber(currentPage) }}
    {{ t('components.table.of') }}
    {{ NumberUtil.toLocaleNumber(totalPages) }}
  </AppText>
</template>
