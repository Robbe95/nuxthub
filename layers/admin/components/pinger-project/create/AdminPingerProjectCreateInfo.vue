<script setup lang="ts">
import FormInput from '@base/components/core/input/FormInput.vue'
import type { PingerProjectCreateSchema } from '@shared/models/pinger-project/pingerProject.schema'
import type { Field } from 'formango'

interface Props {
  info: Field<PingerProjectCreateSchema['info']>
}

const { info } = defineProps<Props>()
const { t } = useI18n()

const name = info.register('name')
</script>

<template>
  <AdminBaseFormCard>
    <template #title>
      {{ t('admin.pinger_project.create.info.title') }}
    </template>
    <template #description>
      {{ t('admin.pinger_project.create.info.description') }}
    </template>

    <template #form>
      <FormInput
        v-bind="name"
        :placeholder="t('shared.name')"
        :label="t('shared.name')"
      />
    </template>
  </AdminBaseFormCard>
</template>
