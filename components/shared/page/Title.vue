<template>
  <div class="space-y-1 mb-6">
    <h1 class="text-2xl font-semibold leading-tight tracking-tight">
      {{ title }}
    </h1>
    <p v-if="subtitle" class="text-gray-500 text-sm">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>
