<template>
  <div>
    This is the dashboard page
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
  middleware: ['auth']
})

</script>
