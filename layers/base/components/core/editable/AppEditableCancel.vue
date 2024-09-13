<script setup lang="ts">
import AppButton from '@base/components/core/button/AppButton.vue'
import { EditableCancelTrigger } from 'radix-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <EditableCancelTrigger as-child>
    <slot>
      <AppButton>{{ t('components.editable.cancel') }}</AppButton>
    </slot>
  </EditableCancelTrigger>
</template>
