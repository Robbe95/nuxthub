<script setup lang="ts">
import AppButton from '@base/components/core/button/AppButton.vue'
import { useTableStyle } from '@base/components/core/table/table.style'
import AppText from '@base/components/core/text/AppText.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  activeFilterCount: number
}>()

const emit = defineEmits<{
  clearFilters: []
}>()

const { t } = useI18n()

function onClearFilters(): void {
  emit('clearFilters')
}

const tableStyle = useTableStyle()

const filterWarningContainerClasses = computed<string>(() => tableStyle.filterWarningContainer())
const filterWarningTextClasses = computed<string>(() => tableStyle.filterWarningText())
</script>

<template>
  <div
    :class="filterWarningContainerClasses"
  >
    <AppText
      :class="filterWarningTextClasses"
      variant="caption"
    >
      {{ t('components.table.results_might_be_hidden_because_of_active_filters', { count: props.activeFilterCount }) }}
    </AppText>

    <AppButton
      size="xs"
      icon-right="close"
      variant="muted"
      @click="onClearFilters"
    >
      {{ t('components.table.clear_filters') }}
    </AppButton>
  </div>
</template>
