<script setup lang="ts" generic="TValue extends AcceptableValue">
import FormElement from '@base/components/core/form-element/FormElement.vue'
import AppSelect from '@base/components/core/select/AppSelect.vue'
import type { Icon } from '@base/icons/icons'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type'
import type {
  AcceptableValue,
  SelectItem,
} from '@base/types/core/selectItem.type'

const props = withDefaults(
  defineProps<{
    /**
     * Whether the select has a clear button.
     * @default false
     */
    hasClearButton?: boolean
    /**
     * Whether the select is disabled.
     */
    isDisabled?: boolean
    /**
     * Whether the select is loading.
     */
    isLoading?: boolean
    /**
     *  Whether the select is required.
     */
    isRequired?: boolean
    /**
     * Whether the select has been touched (focused and blurred).
     */
    isTouched: boolean
    /**
     * display function for the selected value
     */
    displayFn: (value: TValue) => string
    /**
     * The errors associated with the select.
     */
    errors: FormFieldErrors
    /**
     * The icon to display on the left side of the select.
     */
    iconLeft?: Icon | null
    /**
     * The items of the select.
     */
    items: SelectItem<TValue>[]
    /**
     * The label of the select.
     */
    label: string
    /**
     * The placeholder of the select.
     * @default null
     */
    placeholder?: null | string
    /**
     * The tooltip of the input.
     */
    tooltip?: string
  }>(),
  {
    hasClearButton: false,
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    isTouched: false,
    iconLeft: null,
    placeholder: null,
  },
)

const emit = defineEmits<{
  blur: []
}>()

defineSlots<{
  /** Override the display of the left icon */
  left: () => any
  /** Override the option rendering of the select */
  option: (props: {
    value: AcceptableValue
  }) => any
}>()

const model = defineModel<TValue | null>({
  required: true,
})

function onBlur(): void {
  emit('blur')
}
</script>

<template>
  <FormElement
    v-slot="{ isInvalid, id }"
    :errors="props.errors"
    :tooltip="props.tooltip"
    :is-required="props.isRequired"
    :is-touched="props.isTouched"
    :is-disabled="props.isDisabled"
    :label="props.label"
  >
    <AppSelect
      :id="id"
      v-model="model"
      :is-invalid="isInvalid"
      :items="props.items"
      :icon-left="props.iconLeft"
      :display-fn="props.displayFn"
      :is-disabled="props.isDisabled"
      :is-required="props.isRequired"
      :is-loading="props.isLoading"
      :has-clear-button="props.hasClearButton"
      :placeholder="props.placeholder"
      @blur="onBlur"
    >
      <template #left>
        <slot name="left" />
      </template>

      <template #option="{ value }">
        <slot
          :value="value"
          name="option"
        />
      </template>
    </AppSelect>
  </FormElement>
</template>
