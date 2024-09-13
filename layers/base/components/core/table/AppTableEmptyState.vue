<script setup lang="ts">
import AppSkeletonLoaderRow from '@base/components/core/skeleton-loader/AppSkeletonLoaderRow.vue'
import { useTableStyle } from '@base/components/core/table/table.style'
import { NumberUtil } from '@base/utils/core/number.util.js'
import { computed } from 'vue'

const props = defineProps<{
  hasReachedHorizontalScrollEnd: boolean
  isScrolledToRight: boolean
  activeFilterCount: number
  columnCount: number
  shouldPinFirstColumn: boolean
  shouldPinLastColumn: boolean
}>()

const hasLeftBorder = computed<boolean>(() => props.isScrolledToRight && props.shouldPinFirstColumn)
const hasRightBorder = computed<boolean>(() => !props.hasReachedHorizontalScrollEnd && props.shouldPinLastColumn)

const tableStyle = useTableStyle()

const emptyColumnClasses = computed<string>(() => tableStyle.emptyColumn({
  hasLeftBorder: hasLeftBorder.value,
  hasRightBorder: hasRightBorder.value,
  shouldPinFirstColumn: props.shouldPinFirstColumn,
  shouldPinLastColumn: props.shouldPinLastColumn,
}))

const emptyContainerClasses = computed<string>(() => tableStyle.emptyContainer())
const emptyGridClasses = computed<string>(() => tableStyle.emptyGrid())
const emptyBackgroundClasses = computed<string>(() => tableStyle.emptyBackground())
</script>

<template>
  <div
    :style="{
      gridColumn: '1 / -1',
    }"
    :class="emptyContainerClasses"
  >
    <div
      v-for="i in 7"
      :key="i"
      :style="{
        gridColumn: '1 / -1',
      }"
      :class="emptyGridClasses"
    >
      <div
        v-for="columnIndex of props.columnCount"
        :key="columnIndex"
        :class="emptyColumnClasses"
      >
        <AppSkeletonLoaderRow
          :style="{
            width: `${NumberUtil.generateRandomNumber(70, 100)}%`,
          }"
        />
      </div>
    </div>

    <div :class="emptyBackgroundClasses" />
  </div>
</template>
