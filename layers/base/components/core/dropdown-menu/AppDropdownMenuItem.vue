<script setup lang="ts">
import AppDropdownMenuDivider from '@base/components/core/dropdown-menu/AppDropdownMenuDivider.vue'
import AppDropdownMenuGroup from '@base/components/core/dropdown-menu/AppDropdownMenuGroup.vue'
import AppDropdownMenuLabel from '@base/components/core/dropdown-menu/AppDropdownMenuLabel.vue'
import AppDropdownMenuRadioGroup from '@base/components/core/dropdown-menu/AppDropdownMenuRadioGroup.vue'
import AppDropdownMenuSub from '@base/components/core/dropdown-menu/AppDropdownMenuSub.vue'
import AppDropdownMenuSubContent from '@base/components/core/dropdown-menu/AppDropdownMenuSubContent.vue'
import AppDropdownMenuSubTrigger from '@base/components/core/dropdown-menu/AppDropdownMenuSubTrigger.vue'
import AppDropdownMenuCheckboxOption from '@base/components/core/dropdown-menu/option/AppDropdownMenuCheckboxOption.vue'
import AppDropdownMenuRenderOption from '@base/components/core/dropdown-menu/option/AppDropdownMenuRenderOption.vue'
import AppDropdownMenuRouteOption from '@base/components/core/dropdown-menu/option/AppDropdownMenuRouteOption.vue'
import AppDropdownMenuSelectOption from '@base/components/core/dropdown-menu/option/AppDropdownMenuSelectOption.vue'
import type { DropdownMenuItem } from '@base/types/core/dropdownMenuItem.type'
import { DropdownMenuPortal } from 'radix-vue'

const props = defineProps<{
  item: DropdownMenuItem
}>()
</script>

<template>
  <AppDropdownMenuDivider v-if="props.item.type === 'divider'" />

  <AppDropdownMenuGroup v-else-if="props.item.type === 'group'">
    <AppDropdownMenuItem
      v-for="(groupItem, i) of props.item.items"
      :key="i"
      :item="groupItem"
    />
  </AppDropdownMenuGroup>

  <AppDropdownMenuSub v-else-if="props.item.type === 'subMenu'">
    <AppDropdownMenuSubTrigger :item="props.item" />

    <DropdownMenuPortal>
      <AppDropdownMenuSubContent>
        <AppDropdownMenuItem
          v-for="(subItem, i) of props.item.items"
          :key="i"
          :item="subItem"
        />
      </AppDropdownMenuSubContent>
    </DropdownMenuPortal>
  </AppDropdownMenuSub>

  <AppDropdownMenuCheckboxOption
    v-else-if="props.item.type === 'checkboxOption'"
    :item="props.item"
  />

  <AppDropdownMenuRadioGroup
    v-else-if="props.item.type === 'radioGroup'"
    :item="props.item"
  />

  <AppDropdownMenuRouteOption
    v-else-if="props.item.type === 'routeOption'"
    :item="props.item"
  >
    <slot :item="props.item" />
  </AppDropdownMenuRouteOption>

  <AppDropdownMenuRenderOption
    v-else-if="props.item.type === 'renderOption'"
    :item="props.item"
  >
    <slot :item="props.item" />
  </AppDropdownMenuRenderOption>

  <AppDropdownMenuSelectOption
    v-else-if="props.item.type === 'selectOption'"
    :item="props.item"
  >
    <slot :item="props.item" />
  </AppDropdownMenuSelectOption>

  <AppDropdownMenuLabel
    v-else-if="props.item.type === 'label'"
    :label="props.item.label"
  />
</template>
