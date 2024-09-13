<script setup lang="ts">
import AppButton from '@base/components/core/button/AppButton.vue'
import { EditableEditTrigger } from 'radix-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <EditableEditTrigger as-child>
    <slot>
      <AppButton>{{ t('components.editable.edit') }}</AppButton>
    </slot>
  </EditableEditTrigger>
</template>
