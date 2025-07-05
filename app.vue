<template>
  <UApp>
    <NuxtLayout>
      <Analytics />
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script lang="ts" setup>
import { Analytics } from '@vercel/analytics/nuxt';
</script>