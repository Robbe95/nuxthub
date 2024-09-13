<script setup lang="ts">
import AppTimeInput from '@base/components/core/date/time/AppTimeInput.vue'
import FormElement from '@base/components/core/form-element/FormElement.vue'
import { useComponentAttrs } from '@base/composables/core/componentAttrs.composable.js'
import type { Icon } from '@base/icons/icons.js'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type.js'
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
  }>(),
  {
    isDisabled: false,
    isLoading: false,
    isRequired: false,
    isTouched: false,
    iconLeft: null,
    placeholder: null,
    type: 'text',
  },
)

defineSlots<{
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
    <AppTimeInput
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
    >
      <template
        v-if="slots.right !== undefined"
        #right
      >
        <slot name="right" />
      </template>
    </AppTimeInput>
  </FormElement>
</template>
