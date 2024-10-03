<script setup lang="ts">
import { useGetPingerProjectsQuery } from '~/api/pinger-project/queries/pingerProject.query'

const pingerProjectsQuery = useGetPingerProjectsQuery()
</script>

<template>
  <div class="text-foreground">
    <div class="text-foreground">
      Pinger Projects
    </div>
    <NuxtLinkLocale to="/admin/pinger-project/create">
      Create
    </NuxtLinkLocale>
    HERE DATA
    {{ pingerProjectsQuery.data.value }}
  </div>
</template>
