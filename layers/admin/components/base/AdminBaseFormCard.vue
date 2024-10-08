<template>
  <div class="grid grid-cols-[1fr,1px,2fr] gap-4">
    <div class="flex flex-col gap-1">
      <h2 class="font-semibold">
        <slot name="title" />
      </h2>
      <p class="text-sm text-neutral-500">
        <slot name="description" />
      </p>
    </div>
    <AppDivider direction="vertical" />
    <div class="grid grid-cols-2 gap-4">
      <slot name="form" />
    </div>
  </div>
</template>
