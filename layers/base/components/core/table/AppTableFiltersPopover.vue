<script setup lang="ts" generic="TFilters">
import AppButton from '@base/components/core/button/AppButton.vue'
import AppIconButton from '@base/components/core/button/AppIconButton.vue'
import AppPopover from '@base/components/core/popover/AppPopover.vue'
import AppSelectDivider from '@base/components/core/select/AppSelectDivider.vue'
import AppTableBooleanFilter from '@base/components/core/table/filters/AppTableBooleanFilter.vue'
import AppTableMultiSelectFilter from '@base/components/core/table/filters/AppTableMultiSelectFilter.vue'
import AppTableNumberFilter from '@base/components/core/table/filters/AppTableNumberFilter.vue'
import AppTableSelectFilter from '@base/components/core/table/filters/AppTableSelectFilter.vue'
import AppTableTextFilter from '@base/components/core/table/filters/AppTableTextFilter.vue'
import { useTableStyle } from '@base/components/core/table/table.style'
import AppText from '@base/components/core/text/AppText.vue'
import type {
  Pagination,
  PaginationFilter,
  TableFilterEvent,
} from '@base/types/core/pagination.type'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  /**
   * The filters to be shown
   */
  filters: PaginationFilter<TFilters>[]
  /**
   * Your pagination informations
   */
  pagination: Pagination<TFilters>
}>()

const emit = defineEmits<{
  clear: []
  filter: [event: TableFilterEvent<TFilters>]
}>()

const { t } = useI18n()

const filteredFilters = computed<PaginationFilter<TFilters>[]>(() => {
  return props.filters.filter((filter) => isFilterVisible(filter))
})

const numberOfActiveFilters = computed<number>(() => {
  return Object.keys(props.pagination.paginationOptions.value.filters ?? {}).length
})

function onFilterUpdate(event: TableFilterEvent<TFilters>): void {
  emit('filter', event)
}

function onClearAllButtonClick(): void {
  emit('clear')
}

function isFilterVisible(filter: PaginationFilter<TFilters>): boolean {
  return filter.isVisible === undefined || filter.isVisible
}

const tableStyle = useTableStyle()

const filterPopoverContainerClasses = computed<string>(() => tableStyle.filterPopoverContainer())
const filterPopoverContentContainerClasses = computed<string>(() => tableStyle.filterPopoverContentContainer())
const filterPopoverButtonClasses = computed<string>(() => tableStyle.filterPopoverButton())
const filterPopoverClearContainerClasses = computed<string>(() => tableStyle.filterPopoverClearContainer())
const filterPopoverClearTextClasses = computed<string>(() => tableStyle.filterPopoverClearText())
const filterPopoverActiveFiltersClasses = computed<string>(() => tableStyle.filterPopoverActiveFilters())
const filterPopoverClearButtonClasses = computed<string>(() => tableStyle.filterPopoverClearButton())
const filterPopoverFiltersContainerClasses = computed<string>(() => tableStyle.filterPopoverFiltersContainer())
</script>

<template>
  <AppPopover
    :offset="4"
    align="end"
    is-close-button-hidden
    hide-arrow
  >
    <template #default>
      <div :class="filterPopoverContainerClasses">
        <AppIconButton
          :class="filterPopoverButtonClasses"
          variant="input-outline"
          icon="filterLines"
          icon-size="default"
          label="Filter"
        />
        <div
          v-if="numberOfActiveFilters > 0"
          :class="filterPopoverActiveFiltersClasses"
        >
          {{ numberOfActiveFilters }}
        </div>
      </div>
    </template>

    <template #content>
      <div
        :class="filterPopoverContentContainerClasses"
      >
        <div :class="filterPopoverClearContainerClasses">
          <AppText
            :class="filterPopoverClearTextClasses"
            variant="body"
          >
            {{ t('shared.filters') }}
          </AppText>
          <AppButton
            :class="filterPopoverClearButtonClasses"
            size="sm"
            variant="ghost"
            @click="onClearAllButtonClick"
          >
            {{ t('shared.clear_all') }}
          </AppButton>
        </div>
        <div
          v-for="filter in filteredFilters"
          :key="filter.id"
        >
          <AppSelectDivider
            direction="horizontal"
          />
          <div
            :class="filterPopoverFiltersContainerClasses"
          >
            <AppTableMultiSelectFilter
              v-if="filter.type === 'multiselect'"
              :filter="filter"
              :pagination="props.pagination"
              @change="onFilterUpdate"
            />
            <AppTableSelectFilter
              v-if="filter.type === 'select'"
              :filter="filter"
              :pagination="props.pagination"
              @change="onFilterUpdate"
            />
            <AppTableTextFilter
              v-if="filter.type === 'text'"
              :filter="filter"
              :pagination="props.pagination"
              @change="onFilterUpdate"
            />
            <AppTableBooleanFilter
              v-if="filter.type === 'boolean'"
              :filter="filter"
              :pagination="props.pagination"
              @change="onFilterUpdate"
            />
            <AppTableNumberFilter
              v-if="filter.type === 'number'"
              :filter="filter"
              :pagination="props.pagination"
              @change="onFilterUpdate"
            />
          </div>
        </div>
      </div>
    </template>
  </AppPopover>
</template>
