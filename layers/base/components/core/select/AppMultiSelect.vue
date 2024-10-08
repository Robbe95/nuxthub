<script setup lang="ts" generic="TValue extends AcceptableValue">
import AppComboboxContent from '@base/components/core/combobox/AppComboboxContent.vue'
import AppComboboxItem from '@base/components/core/combobox/AppComboboxItem.vue'
import AppComboboxViewport from '@base/components/core/combobox/AppComboboxViewport.vue'
import AppMultiSelectInput from '@base/components/core/select/AppMultiSelectInput.vue'
import type { Icon } from '@base/icons/icons'
import type { ComboboxProps } from '@base/types/core/comboboxProps.type'
import type {
  AcceptableValue,
  SelectItem,
} from '@base/types/core/selectItem.type'
import {
  ComboboxAnchor,
  ComboboxArrow,
  ComboboxPortal,
  ComboboxRoot,
} from 'radix-vue'
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * The id of the select.
     */
    id?: null | string
    /**
     * Whether the select is disabled.
     * @default false
     */
    isDisabled?: boolean
    /**
     * Whether the select is in an invalid state.
     * @default false
     */
    isInvalid?: boolean
    /**
     * Whether the select is loading.
     * @default false
     */
    isLoading?: boolean
    /**
     * Display function for the selected value
     */
    displayFn: (value: TValue) => string
    /**
     * The icon to display on the left side of the select.
     * @default null
     */
    iconLeft?: Icon | null
    /**
     * The options to display in the select.
     */
    items: SelectItem<TValue>[]
    /**
     * The value of the select.
     */
    modelValue: TValue[]
    /**
     * The placeholder text to display when the select is empty.
     * @default null
     */
    placeholder?: null | string
    /**
     * The props of the popover.
     * @default null
     */
    popoverProps?: ComboboxProps['popoverProps']
  }>(),
  {
    id: null,
    isDisabled: false,
    isInvalid: false,
    isLoading: false,
    iconLeft: null,
    placeholder: null,
  },
)

const emit = defineEmits<{
  'blur': []
  'update:modelValue': [value: TValue[]]
}>()

defineSlots<{
  /** Override the display of the left icon */
  left: () => any
  /** Override the option rendering of the select */
  option: (props: {
    value: AcceptableValue
  }) => any
}>()

const isOpen = ref<boolean>(false)

const model = computed<TValue[]>({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value ?? [])
  },
})

const placeholderValue = computed<null | string>(() => {
  if (model.value.length === 0) {
    return props.placeholder
  }

  return model.value.map((value) => props.displayFn(value)).join(', ')
})

const isEmpty = computed<boolean>(() => {
  return model.value.length === 0
})

function onBlur(): void {
  if (!isOpen.value) {
    emit('blur')
  }
}

function onOpen(): void {
  isOpen.value = true
}
</script>

<template>
  <div>
    <ComboboxRoot
      v-model="model"
      v-model:open="isOpen"
      :display-value="displayFn"
      :filter-function="(options) => options"
      :disabled="props.isDisabled"
      :multiple="true"
    >
      <ComboboxAnchor>
        <AppMultiSelectInput
          :id="props.id"
          :icon-left="props.iconLeft"
          :is-disabled="props.isDisabled"
          :is-invalid="props.isInvalid"
          :is-loading="props.isLoading"
          :placeholder="placeholderValue"
          :is-empty="isEmpty"
          @blur="onBlur"
          @open="onOpen"
        >
          <template #left>
            <slot name="left" />
          </template>
        </AppMultiSelectInput>
      </ComboboxAnchor>

      <ComboboxPortal>
        <Transition
          enter-active-class="duration-150"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-150"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="isOpen"
            class="z-popover"
          >
            <AppComboboxContent :popover-props="props.popoverProps">
              <AppComboboxViewport>
                <AppComboboxItem
                  v-for="item of props.items"
                  :key="JSON.stringify(item)"
                  :item="item"
                  :display-fn="displayFn"
                  :is-multiple="true"
                >
                  <template #default="{ item: itemValue }">
                    <slot
                      v-if="itemValue.type === 'option'"
                      :value="itemValue.value"
                      name="option"
                    />
                  </template>
                </AppComboboxItem>
              </AppComboboxViewport>

              <ComboboxArrow />
            </AppComboboxContent>
          </div>
        </Transition>
      </ComboboxPortal>
    </ComboboxRoot>
  </div>
</template>
