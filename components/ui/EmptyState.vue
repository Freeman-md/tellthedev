<template>
  <div class="text-center py-12 text-gray-500 space-y-4">
    <UIcon name="i-lucide-folder-open" class="mx-auto" size="30" />
    <p>{{ message }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ message?: string }>();
</script>
