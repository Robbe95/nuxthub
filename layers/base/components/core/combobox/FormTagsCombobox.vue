<script setup lang="ts" generic="TValue extends AcceptableValue">
import AppTagsCombobox from '@base/components/core/combobox/AppTagsCombobox.vue'
import FormElement from '@base/components/core/form-element/FormElement.vue'
import type { ComboboxItem } from '@base/types/core/comboboxItem.type'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type'
import type { AcceptableValue } from '@base/types/core/selectItem.type'

const props = withDefaults(
  defineProps<{
    /**
     * Whether the combobox is disabled.
     */
    isDisabled?: boolean
    /**
     * Whether the select is loading.
     */
    isLoading?: boolean
    /**
     *  Whether the combobox is required.
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
     * The options of the combobox.
     */
    items: ComboboxItem<TValue>[]
    /**
     * The label of the combobox.
     */
    label: string
    /**
     * The maximum number of tags that can be selected.
     */
    max?: null | number
    /**
     * The placeholder of the combobox.
     * @default null
     */
    placeholder?: null | string
    /**
     * The tooltip of the input.
     */
    tooltip?: string
  }>(),
  {
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    isTouched: false,
    emptyText: null,
    max: null,
    placeholder: null,
  },
)

const emit = defineEmits<{
  blur: []
  filter: [value: string]
}>()

defineSlots<{
  /** Override the option rendering of the combobox */
  option: (props: {
    value: TValue
  }) => any
  /** Override the tag rendering */
  tag: (props: {
    value: TValue
  }) => any
}>()

const model = defineModel<TValue[]>({
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
    <AppTagsCombobox
      :id="id"
      v-model:search="search"
      v-model="model"
      :is-invalid="isInvalid"
      :items="props.items"
      :display-fn="props.displayFn"
      :filter-fn="props.filterFn"
      :empty-text="props.emptyText"
      :is-disabled="props.isDisabled"
      :is-required="props.isRequired"
      :placeholder="props.placeholder"
      :is-loading="props.isLoading"
      :max="props.max"
      @blur="onBlur"
      @filter="onFilter"
    >
      <template #option="{ value }">
        <slot
          :value="value"
          name="option"
        />
      </template>

      <template #tag="{ value }">
        <slot
          :value="value"
          name="tag"
        />
      </template>
    </AppTagsCombobox>
  </FormElement>
</template>
