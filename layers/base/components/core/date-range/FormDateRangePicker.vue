<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import '@base/components/core/date/style.css'

import AppDateRangePicker from '@base/components/core/date-range/AppDateRangePicker.vue'
import FormElement from '@base/components/core/form-element/FormElement.vue'
import type { DatePickerRangeValue } from '@base/types/core/date.type'
import type {
  DatePickerHighlightConfig,
  DatePickerMarker,
  DatePickerRangeConfig,
} from '@base/types/core/datePickerConfig.type.ts'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type'

const props = withDefaults(defineProps<{
  /**
   * The test id of the input.
   * @default undefined
   */
  testId?: string
  /**
   * All dates after the given date will be disabled.
   */
  maxDate?: Date | string
  /**
   * All dates before the given date will be disabled.
   */
  minDate?: Date | string
  /**
   * Add a clear icon to the input field where you can set the value to null.
   */
  hasClearButton?: boolean
  /**
   * Disables the input.
   */
  isDisabled?: boolean
  /**
   * Whether the input is inline.
   */
  isInline?: boolean
  /**
   * If true, removes the month and year picker.
   */
  isMonthYearPickersDisabled?: boolean
  /**
   *  Whether the input is required.
   */
  isRequired?: boolean
  /**
   * When true, will try to parse the date from the user input.
   */
  isTextInputAllowed?: boolean
  /**
   * Whether the input is touched.
   */
  isTouched: boolean
  /**
   * Disable specific dates.
   */
  disabledDates?: ((date: Date) => boolean) | Date[] | string[]
  /**
   * The errors associated with the input.
   */
  errors: FormFieldErrors
  /**
   * Specify highlighted dates.
   */
  highlightConfig?: Partial<DatePickerHighlightConfig>
  /**
   * The label of the input.
   */
  label: string
  /**
   * Add markers to the specified dates with (optional) tooltips. For color options, you can use any css valid color.
   */
  markers?: DatePickerMarker[]
  /**
   * Placeholder of the input.
   */
  placeholder?: string
  /**
   * Options configuration for the ranged datepicker.
   */
  rangeConfig: DatePickerRangeConfig
  /**
   * The tooltip of the input.
   */
  tooltip?: string
}>(), {
  hasClearButton: false,
  isDisabled: false,
  isInline: false,
  isMonthYearPickersDisabled: false,
  isRequired: false,
  isTextInputAllowed: false,
  disableAutoApply: false,
})

const modelValue = defineModel<DatePickerRangeValue | null>({
  required: true,
})
</script>

<template>
  <FormElement
    v-slot="{ isInvalid, id }"
    :tooltip="props.tooltip"
    :errors="props.errors"
    :is-required="props.isRequired"
    :is-touched="props.isTouched"
    :is-disabled="props.isDisabled"
    :label="props.label"
  >
    <AppDateRangePicker
      :id="id"
      v-model="modelValue"
      :disabled-dates="props.disabledDates"
      :has-clear-button="props.hasClearButton"
      :highlight-config="props.highlightConfig"
      :is-inline="props.isInline"
      :is-disabled="props.isDisabled"
      :is-month-year-pickers-disabled="props.isMonthYearPickersDisabled"
      :is-text-input-allowed="props.isTextInputAllowed"
      :invalid="isInvalid"
      :min-date="props.minDate"
      :markers="props.markers"
      :max-date="props.maxDate"
      :placeholder="props.placeholder"
      :range-config="props.rangeConfig"
      :test-id="props.testId"
    />
  </FormElement>
</template>

<style>
</style>
