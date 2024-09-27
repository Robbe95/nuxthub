<script setup lang="ts"
 generic="TEntityIndexShape, TEntityDetailShape, TDetailParams, TPostParams, TUpdateParams, TDeleteParams"
>
type CrudProps = EntityCrudParams<
  TEntityIndexShape,
  TEntityDetailShape,
  TDetailParams,
  TPostParams,
  TUpdateParams,
  TDeleteParams
>

const props = defineProps<CrudProps>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <slot />
  </div>
</template>
