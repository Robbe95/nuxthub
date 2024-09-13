<script setup lang="ts">
import AppButton from '@base/components/core/button/AppButton.vue'
import { EditableSubmitTrigger } from 'radix-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <EditableSubmitTrigger as-child>
    <slot>
      <AppButton>{{ t('components.editable.submit') }}</AppButton>
    </slot>
  </EditableSubmitTrigger>
</template>
