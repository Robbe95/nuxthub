<script setup lang="ts">
import FormElement from '@base/components/core/form-element/FormElement.vue'
import AppInput from '@base/components/core/input/AppInput.vue'
import { useComponentAttrs } from '@base/composables/core/componentAttrs.composable'
import type { Icon } from '@base/icons/icons'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type'
import { useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * The test id of the input.
     * @default undefined
     */
    testId?: string
    /**
     * Whether the input is disabled.
     */
    isDisabled?: boolean
    /**
     * Whether the input is loading.
     * @default false
     */
    isLoading?: boolean
    /**
     *  Whether the input is required.
     */
    isRequired?: boolean
    /**
     * Whether the input is touched.
     */
    isTouched: boolean
    /**
     * The errors associated with the input.
     */
    errors: FormFieldErrors
    /**
     * The left icon of the input.
     * @default null
     */
    iconLeft?: Icon | null
    /**
     * The right icon of the input.
     * @default null
     */
    iconRight?: Icon | null
    /**
     * The label of the input.
     */
    label: string
    /**
     * The placeholder of the input.
     * @default null
     */
    placeholder?: null | string
    /**
     * The tooltip of the input.
     */
    tooltip?: string
    /**
     * The type of the input.
     * @default 'text'
     */
    type?: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'
  }>(),
  {
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    isTouched: false,
    iconLeft: null,
    iconRight: null,
    placeholder: null,
    type: 'text',
  },
)

defineSlots<{
  /** Replace the left icon with custom content */
  left: () => void
  /** Replace the right icon with custom content */
  right: () => void
}>()

const model = defineModel<null | string>({
  required: true,
})

const slots = useSlots()

const { classAttr, otherAttrs } = useComponentAttrs()
</script>

<template>
  <FormElement
    v-slot="{ isInvalid, id }"
    :class="classAttr"
    :errors="props.errors"
    :is-required="props.isRequired"
    :is-touched="props.isTouched"
    :is-disabled="props.isDisabled"
    :label="props.label"
    :tooltip="props.tooltip"
  >
    <AppInput
      :id="id"
      v-model="model"
      :test-id="props.testId"
      v-bind="otherAttrs"
      :is-invalid="isInvalid"
      :placeholder="props.placeholder"
      :is-disabled="props.isDisabled"
      :type="props.type"
      :is-loading="props.isLoading"
      :icon-left="props.iconLeft"
      :icon-right="props.iconRight"
    >
      <template
        v-if="slots.left !== undefined"
        #left
      >
        <slot name="left" />
      </template>

      <template
        v-if="slots.right !== undefined"
        #right
      >
        <slot name="right" />
      </template>
    </AppInput>
  </FormElement>
</template>
