<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import '@base/components/core/date/style.css'

import AppMonthPicker from '@base/components/core/date/month/AppMonthPicker.vue'
import FormElement from '@base/components/core/form-element/FormElement.vue'
import type { MonthPickerValue } from '@base/types/core/date.type'
import type { DatePickerHighlightConfig } from '@base/types/core/datePickerConfig.type'
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
  maxDate?: Date
  /**
   * All dates before the given date will be disabled.
   */
  minDate?: Date
  /**
   * Add a clear icon to the input field where you can set the value to null.
   */
  hasClearButton?: boolean
  /**
   * Disables the input.
   */
  isDisabled?: boolean
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
  disabledDates?: ((date: Date) => boolean) | Date[]
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
   * Placeholder of the input.
   */
  placeholder?: string
  /**
   * The tooltip of the input.
   */
  tooltip?: string
}>(), {
  hasClearButton: false,
  isDisabled: false,
  isRequired: false,
  isTextInputAllowed: false,
})

const modelValue = defineModel<MonthPickerValue | null>({
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
    <AppMonthPicker
      :id="id"
      v-model="modelValue"
      :disabled-dates="props.disabledDates"
      :has-clear-button="props.hasClearButton"
      :highlight="props.highlightConfig"
      :is-disabled="props.isDisabled"
      :is-invalid="isInvalid"
      :is-text-input-allowed="props.isTextInputAllowed"
      :min-date="props.minDate"
      :max-date="props.maxDate"
      :placeholder="props.placeholder"
      :test-id="props.testId"
    />
  </FormElement>
</template>

<style>
</style>
