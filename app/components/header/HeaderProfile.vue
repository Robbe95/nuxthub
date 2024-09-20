<script setup lang="ts">
import { useMeQuery } from '@auth/api/queries/me.query'
import { AppText } from '@wisemen/vue-core'
import { PopoverClose } from 'radix-vue'

const { t } = useI18n()

const { clear } = useUserSession()
const meQuery = useMeQuery()
</script>

<template>
  <AppPopover
    align="center"
    hide-arrow
  >
    <AppIconButton
      :label="t('shared.settings')"
      icon="profile"
      class="flex-none rounded-full"
    />
    <template #content>
      <AppCard class="min-w-80">
        <div class="flex flex-col gap-4">
          <AppText
            class="font-medium"
            variant="subtitle"
          >
            {{ t('shared.hello', { name: meQuery.data.value?.firstName }) }}
          </AppText>

          <PopoverClose :as-child="true">
            <AppButton
              class="w-full"
              variant="outline"
              @click="clear"
            >
              {{ t('shared.logout') }}
            </AppButton>
          </PopoverClose>
        </div>
      </AppCard>
    </template>
  </AppPopover>
</template>
