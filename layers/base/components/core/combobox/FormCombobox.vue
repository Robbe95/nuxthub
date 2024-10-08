<script setup lang="ts" generic="TValue extends AcceptableValue">
import AppCombobox from '@base/components/core/combobox/AppCombobox.vue'
import FormElement from '@base/components/core/form-element/FormElement.vue'
import type { Icon } from '@base/icons/icons'
import type { ComboboxItem } from '@base/types/core/comboboxItem.type'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type'
import type { AcceptableValue } from '@base/types/core/selectItem.type'

const props = withDefaults(
  defineProps<{
    /**
     * Whether the combobox has a clear button.
     * @default false
     */
    hasClearButton?: boolean
    /**
     * Whether the chevron icon is hidden.
     * @default false
     */
    isChevronHidden?: boolean
    /**
     * Whether the combobox is disabled.
     * @default false
     */
    isDisabled?: boolean
    /**
     * Whether the select is loading.
     * @default false
     */
    isLoading?: boolean
    /**
     * Whether the combobox is required.
     * @default false
     */
    isRequired?: boolean
    /**
     * Whether the combobox has been touched (focused and blurred).
     */
    isTouched: boolean
    /**
     * Display function for the selected value
     */
    displayFn: (value: TValue) => string
    /**
     * The text to display when there are no options.
     * @default t('components.combobox.empty')
     */
    emptyText?: null | string
    /**
     * The errors associated with the combobox.
     */
    errors: FormFieldErrors
    /**
     * The function to filter the options.
     */
    filterFn: (options: TValue[], searchTerm: string) => TValue[]
    /**
     * The icon to display on the left side of the combobox.
     * @default null
     */
    iconLeft?: Icon | null
    /**
     * The icon to display on the right side of the combobox.
     * @default null
     */
    iconRight?: Icon | null
    /**
     * The options of the combobox.
     */
    items: ComboboxItem<TValue>[]
    /**
     * The label of the combobox.
     */
    label: string
    /**
     * The placeholder of the combobox.
     * @default null
     */
    placeholder?: null | string
    /**
     * The tooltip of the combobox.
     */
    tooltip?: string
  }>(),
  {
    isChevronHidden: false,
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    isTouched: false,
    emptyText: null,
    iconLeft: null,
    iconRight: null,
    placeholder: null,
  },
)

const emit = defineEmits<{
  blur: []
  filter: [value: string]
}>()

defineSlots<{
  /** Override the left content of the combobox input */
  left: () => void
  /** Override the option rendering of the combobox, and have access to the dataTestId */
  option: (props: {
    dataTestId?: string
    value: TValue
  }) => any
}>()

const model = defineModel<TValue | null>({
  required: true,
})

const search = defineModel<null | string>('search', {
  default: '',
  required: false,
})

function onBlur(): void {
  emit('blur')
}

function onFilter(filter: string): void {
  emit('filter', filter)
}
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
    <AppCombobox
      :id="id"
      v-model:search="search"
      v-model="model"
      :is-invalid="isInvalid"
      :items="props.items"
      :display-fn="props.displayFn"
      :filter-fn="props.filterFn"
      :empty-text="props.emptyText"
      :has-clear-button="props.hasClearButton"
      :is-disabled="props.isDisabled"
      :is-required="props.isRequired"
      :placeholder="props.placeholder"
      :is-loading="props.isLoading"
      :icon-left="props.iconLeft"
      :icon-right="props.iconRight"
      :is-chevron-hidden="props.isChevronHidden"
      @blur="onBlur"
      @filter="onFilter"
    >
      <template #left>
        <slot name="left" />
      </template>

      <template #option="{ value, dataTestId }">
        <slot
          :value="value"
          :data-test-id="dataTestId"
          name="option"
        />
      </template>
    </AppCombobox>
  </FormElement>
</template>
