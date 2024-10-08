<script setup lang="ts"  generic="TSchema, TFilters">
import AppTableActiveFiltersWarning from '@base/components/core/table/AppTableActiveFiltersWarning.vue'
import AppTableBody from '@base/components/core/table/AppTableBody.vue'
import AppTableEmptyState from '@base/components/core/table/AppTableEmptyState.vue'
import AppTableEmptyStateOverlay from '@base/components/core/table/AppTableEmptyStateOverlay.vue'
import AppTableFooter from '@base/components/core/table/AppTableFooter.vue'
import AppTableHeader from '@base/components/core/table/AppTableHeader.vue'
import AppTableTop from '@base/components/core/table/AppTableTop.vue'
import {
  type TableStyleProps,
  useTableStyle,
} from '@base/components/core/table/table.style'
import type {
  PaginatedData,
  Pagination,
  PaginationFilter,
  SortChangeEvent,
} from '@base/types/core/pagination.type'
import type {
  TableColumn,
  TableEmptyTextProp,
} from '@base/types/core/table.type'
import {
  type Component,
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useSlots,
} from 'vue'
import type { RouteLocationNamedRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    /**
     * The title of the table.
     */
    title: string
    /**
     * Shows the search input in the table header
     */
    hasSearch?: boolean
    /**
     * Whether the data is loading.
     */
    isLoading: boolean
    /**
     * Hides the top of the table when set to true.
     */
    isTopHidden?: boolean
    /**
     * The different columns to be displayed.
     */
    columns: TableColumn<TSchema>[]
    /**
     * The data for the table, in paginated form.
     */
    data: PaginatedData<TSchema> | null
    /**
     * Optional empty text to replace defaults
     */
    emptyText?: TableEmptyTextProp | null
    /**
     * The content to show for expanded rows.
     */
    expandedContent?: ((row: TSchema) => Component)
    /**
     * Determines how the data will be filtered.
     */
    filters: PaginationFilter<TFilters>[]
    /**
     * The pagination options.
     */
    pagination: Pagination<TFilters>
    /**
     * Returns the row as a button.
     */
    rowClick?: ((row: TSchema) => void) | null
    /**
     * Adds a target to the RouterLink when using row-to.
     */
    rowTarget?: string
    /**
     * Returns the row as a RouterLink.
     */
    rowTo?: ((row: TSchema) => RouteLocationNamedRaw) | null
    /**
     * Whether the first column of the table is pinned.
     */
    shouldPinFirstColumn?: boolean
    /**
     * Whether the last column of the table is pinned.
     */
    shouldPinLastColumn?: boolean
    /**
     * Table style variant
     */
    variant?: TableStyleProps['variant']
  }>(),
  {
    hasSearch: false,
    isTopHidden: false,
    emptyText: null,
    rowClick: null,
    rowTo: null,
    shouldPinFirstColumn: false,
    shouldPinLastColumn: false,
    variant: 'default',
  },
)

defineSlots<{
  /** Override the empty state overlay with custom content */
  'empty-state': () => void
}>()

const tableContainerRef = ref<HTMLElement | null>(null)

// Used to observe the table's width and height to recalculate the variables below
let resizeObserver: ResizeObserver | null = null

// If `shouldPinFirstColumn` and `isScrolledToRight` are true,
// a border will be visible on the right side of the first column
const isScrolledToRight = ref<boolean>(false)

// If `shouldPinLastColumn` is true, a border will be visible on the
// left side of the last column
const hasReachedHorizontalScrollEnd = ref<boolean>(false)

// If vertically scrollable, the last item's border bottom will be removed
const canScrollVertically = ref<boolean>(false)

const slots = useSlots()

function getIsScrolledtoRight(element: HTMLElement): boolean {
  return element.scrollLeft > 0
}

function getCanScrollVertically(element: HTMLElement): boolean {
  return element.scrollHeight > element.clientHeight
}

function getHasReachedHorizontalScrollEnd(element: HTMLElement): boolean {
  return element.scrollLeft + element.clientWidth === element.scrollWidth
}

function onScroll(): void {
  handleTableResize()
}

function handleSortChange(sortChangeEvent: SortChangeEvent): void {
  props.pagination.handleSortChange(sortChangeEvent)
}

function createResizeObserver(element: HTMLElement, onResize: () => void): ResizeObserver {
  const observer = new ResizeObserver(onResize)

  observer.observe(element)

  return observer
}

function handleTableResize(): void {
  if (tableContainerRef.value === null) {
    return
  }

  isScrolledToRight.value = getIsScrolledtoRight(tableContainerRef.value)
  canScrollVertically.value = getCanScrollVertically(tableContainerRef.value)
  hasReachedHorizontalScrollEnd.value = getHasReachedHorizontalScrollEnd(tableContainerRef.value)
}

function onClearFilters(): void {
  props.pagination.clearFilters()
}

const hasEmptyStateSlot = computed<boolean>(() => {
  return slots['empty-state'] !== undefined
})

const gridColsStyle = computed<string>(() => {
  return `${props.columns.map((col) => `minmax(${col.width},${col.maxWidth ?? 'auto'})`).join(' ')}`
})

const hasNoData = computed<boolean>(() => {
  return props.data?.data.length === 0 && props.isLoading === false
})

const activeFilterCount = computed<number>(() => {
  const filters = props.pagination.paginationOptions.value.filters ?? null

  if (filters === null) {
    return 0
  }

  return Object.keys(filters).length
})

onMounted(() => {
  if (tableContainerRef.value === null) {
    throw new Error('Table ref is null')
  }

  resizeObserver = createResizeObserver(tableContainerRef.value, handleTableResize)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

const tableStyle = useTableStyle()

const containerClasses = computed<string>(() => tableStyle.container())
const gridClasses = computed<string>(() => tableStyle.grid())
const tableClasses = computed<string>(() => tableStyle.table({
  variant: props.variant,
}))
</script>

<template>
  <div :class="tableClasses">
    <AppTableTop
      v-if="!isTopHidden"
      :is-loading="props.isLoading"
      :title="props.title"
      :total="props.data?.total ?? null"
      :filters="props.filters"
      :variant="props.variant"
      :pagination="props.pagination"
      :has-search="props.hasSearch"
    />

    <div
      ref="tableContainerRef"
      :class="containerClasses"
      @scroll="onScroll"
    >
      <div
        :style="{
          gridTemplateColumns: gridColsStyle,
        }"
        :class="gridClasses"
      >
        <AppTableHeader
          :columns="props.columns"
          :pagination-options="props.pagination.paginationOptions.value"
          :variant="props.variant"
          :should-pin-first-column="props.shouldPinFirstColumn"
          :should-pin-last-column="props.shouldPinLastColumn"
          :is-scrolled-to-right="isScrolledToRight"
          :has-reached-horizontal-scroll-end="hasReachedHorizontalScrollEnd"
          @sort="handleSortChange"
        />

        <AppTableBody
          :columns="props.columns"
          :data="props.data?.data ?? []"
          :should-pin-first-column="props.shouldPinFirstColumn"
          :should-pin-last-column="props.shouldPinLastColumn"
          :is-scrolled-to-right="isScrolledToRight"
          :has-reached-horizontal-scroll-end="hasReachedHorizontalScrollEnd"
          :can-scroll-vertically="canScrollVertically"
          :has-active-filters="activeFilterCount > 0 && !props.isLoading"
          :expanded-content="props.expandedContent ?? null"
          :row-click="props.rowClick"
          :row-to="props.rowTo"
          :row-target="props.rowTarget"
        />

        <AppTableEmptyState
          v-if="!hasEmptyStateSlot && (hasNoData || props.isLoading)"
          :active-filter-count="activeFilterCount"
          :column-count="props.columns.length"
          :should-pin-first-column="props.shouldPinFirstColumn"
          :should-pin-last-column="props.shouldPinLastColumn"
          :has-reached-horizontal-scroll-end="hasReachedHorizontalScrollEnd"
          :is-scrolled-to-right="isScrolledToRight"
        />
      </div>

      <AppTableActiveFiltersWarning
        v-if="activeFilterCount > 0 && !props.isLoading && !hasNoData"
        :active-filter-count="activeFilterCount"
        @clear-filters="onClearFilters"
      />
    </div>

    <slot name="empty-state">
      <AppTableEmptyStateOverlay
        v-if="hasNoData"
        :active-filter-count="activeFilterCount"
        :empty-text="props.emptyText"
        @clear-filters="onClearFilters"
      />
    </slot>

    <AppTableFooter
      :is-loading="props.isLoading"
      :pagination="(props.pagination as Pagination<unknown>)"
      :total="props.data?.total ?? null"
    />
  </div>
</template>
