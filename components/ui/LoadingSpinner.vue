<template>
  <div class="flex flex-col items-center justify-center py-12 text-gray-400 animate-pulse">
    <UIcon name="i-lucide-loader" class="mb-2 animate-spin" size="20" />
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message?: string }>();
</script>
