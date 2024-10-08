<script setup lang="ts">
import FormElement from '@base/components/core/form-element/FormElement.vue'
import AppInput from '@base/components/core/input/AppInput.vue'
import AppSelect from '@base/components/core/select/AppSelect.vue'
import AppText from '@base/components/core/text/AppText.vue'
import type { FormFieldErrors } from '@base/types/core/formFieldErrors.type'
import type { SelectItem } from '@base/types/core/selectItem.type'
import i18nCountries from 'i18n-iso-countries'
import parsePhoneNumber, {
  AsYouType,
  type CountryCode,
  formatIncompletePhoneNumber,
  validatePhoneNumberLength,
} from 'libphonenumber-js'
import {
  getCountries,
  getCountryCallingCode,
} from 'libphonenumber-js'
import {
  computed,
  nextTick,
  ref,
  watch,
} from 'vue'
import type { Locale } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
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
     * The default country code of the phone number.
     * @default 'BE'
     */
    defaultCountryCode?: CountryCode
    /**
     * The errors associated with the input.
     */
    errors: FormFieldErrors<string>
    /**
     * The label of the input.
     */
    label: string
    /**
     * The locale of the input. For registering locales, see: https://www.npmjs.com/package/i18n-iso-countries
     * @default 'en'
     */
    locale?: Locale | null
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
    defaultCountryCode: 'BE',
    locale: null,
    placeholder: null,
  },
)

const emit = defineEmits<{
  blur: []
}>()

const countries = getCountries()

const countryCode = ref<CountryCode>(props.defaultCountryCode)

const asYouType = computed<AsYouType>(() => {
  return new AsYouType(countryCode.value)
})

const model = defineModel<null | string>({
  required: true,
})

function onBlur(): void {
  emit('blur')
}

const countryCodeModel = computed<CountryCode>({
  get: () => {
    return countryCode.value
  },
  set: (value) => {
    if (model.value === null) {
      countryCode.value = value as CountryCode

      return
    }

    const newModel = model.value?.replace(`+${getCountryCallingCode(countryCode.value)}`, `+${getCountryCallingCode(value)}`) ?? null

    if (newModel !== null) {
      model.value = formatIncompletePhoneNumber(newModel, value as CountryCode)
    }

    countryCode.value = value as CountryCode
  },
})

const inputModel = computed<null | string>({
  get: () => {
    if (model.value === null) {
      return null
    }

    const dialCode = getCountryCallingCode(countryCodeModel.value).toString()

    const formattedNumber = formatIncompletePhoneNumber(model.value, countryCodeModel.value)

    return formattedNumber.replace(`+${dialCode}`, '').trim()
  },
  set: (value) => {
    if (value === null) {
      model.value = null

      return
    }

    const phoneNumberValidation = validatePhoneNumberLength(value, countryCode.value)

    if (phoneNumberValidation === 'TOO_LONG') {
      const tempModelValue = structuredClone(model.value)

      model.value = ''
      void nextTick(() => {
        model.value = tempModelValue
      })

      return
    }

    const fullNumber = `+${getCountryCallingCode(countryCodeModel.value)} ${value}`

    asYouType.value.reset()
    asYouType.value.input(fullNumber)

    if (asYouType.value.isValid()) {
      model.value = asYouType.value.getNumber()?.formatInternational() ?? fullNumber
    }

    model.value = fullNumber
  },
})

const countryFlagUrl = computed<string>(() => {
  return getCountryFlagUrl(countryCodeModel.value)
})

const countryCodes = computed<SelectItem<CountryCode>[]>(() => {
  return countries.map((country) => ({
    label: country,
    type: 'option',
    value: country,
  }))
})

function getCountryFlagUrl(countryCode: CountryCode): string {
  return `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`
}

const dialCodeDisplayValue = computed<string>(() => {
  return `+${getCountryCallingCode(countryCodeModel.value)}`
})

watch(model, (value) => {
  if (value === null) {
    return
  }

  const country = parsePhoneNumber(value)?.country ?? null

  if (country !== null) {
    countryCode.value = country
  }
}, {
  immediate: true,
})

function getCountryName(countryCode: CountryCode): null | string {
  if (props.locale === null) {
    return null
  }

  return i18nCountries.getName(countryCode, props.locale, { select: 'official' }) ?? null
}

const countryName = computed<null | string>(() => {
  const countryCode = asYouType.value.getCountry() ?? null

  if (countryCode === null) {
    return null
  }

  return getCountryName(countryCode)
})
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
    <div class="flex items-center">
      <AppSelect
        :id="id"
        v-model="countryCodeModel"
        :is-invalid="isInvalid"
        :items="countryCodes"
        :is-value-hidden="true"
        :display-fn="() => ''"
        :is-disabled="props.isDisabled"
        :is-required="props.isRequired"
        :has-clear-button="false"
        class="w-16"
        select-trigger-class="rounded-r-none focus-within:z-[1] relative"
        @blur="onBlur"
      >
        <template #left>
          <div class="flex items-center pl-3">
            <div class="h-3 w-5 overflow-hidden rounded-sm">
              <img
                :src="countryFlagUrl"
                :alt="`Flag of ${countryName ?? countryCodeModel}`"
              >
            </div>
          </div>
        </template>

        <template #option="{ value }">
          <div class="flex w-48 items-center gap-2 text-sm">
            <div
              class="w-4 overflow-hidden rounded-sm"
            >
              <img
                v-if="false"
                :src="getCountryFlagUrl(value)"
                :alt="`Flag of ${getCountryName(value) ?? value}`"
              >
            </div>
            <p>
              {{ `${getCountryName(value) ?? value} (+${getCountryCallingCode(value)})` }}
            </p>
          </div>
        </template>
      </AppSelect>
      <AppInput
        :id="id"
        v-model="inputModel"
        :is-invalid="isInvalid"
        :is-disabled="props.isDisabled"
        :is-loading="props.isLoading"
        :is-touched="props.isTouched"
        :placeholder="props.placeholder"
        class="w-full rounded-l-none border-l-0"
        type="tel"
        @blur="onBlur"
      >
        <template #left>
          <AppText
            variant="subtext"
            class="-mr-2 ml-2 text-muted-foreground"
          >
            {{ dialCodeDisplayValue }}
          </AppText>
        </template>
      </AppInput>
    </div>
  </FormElement>
</template>
