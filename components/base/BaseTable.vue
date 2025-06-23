<template>
  <div class="overflow-x-auto">
    <table class="table-auto">
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="text-sm py-2 pr-8 whitespace-nowrap border-b border-gray-200"
          >
            {{ header }}
          </th>
        </tr>
      </thead>

      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  headers: Array<string>;
}>();
</script>
