<script setup lang="ts">
import { defineShortcuts } from '#imports';
import { computed, ref, watch, type ComponentPublicInstance } from 'vue';

const props = defineProps<{
  headers: string[];
  data: Record<string, unknown>[];
  searchableFields?: string[];
  enableSearch?: boolean;
}>();

const emit = defineEmits<{
  (e: 'search', text: string): void;
}>();

const searchText = ref('');
const searchInputRef = ref<ComponentPublicInstance | null>(null);
const searchTerm = ref(props.searchableFields?.[0] || '');

defineShortcuts({
  "/": () => {
    const inputEl = searchInputRef.value?.$el?.querySelector('input') as HTMLInputElement | null;
    inputEl?.focus();
  },
});

const filteredData = computed(() => {
  if (!props.searchableFields || !props.enableSearch) return props.data;

  return props.data.filter((item) => {
    const fieldValue = item[searchTerm.value];
    return typeof fieldValue === 'string'
      ? fieldValue.toLowerCase().includes(searchText.value.toLowerCase())
      : false;
  });
});

watch(searchText, (val) => emit('search', val));
</script>

<template>
  <div class="space-y-4">
    <div v-if="enableSearch && searchableFields?.length" class="flex gap-2">
      <UInput
        ref="searchInputRef"
        v-model="searchText"
        icon="i-lucide-search"
        placeholder="Search..."
        :ui="{ leading: 'pointer-events-none' }"
      >
        <template #trailing>
          <UKbd value="/" />
        </template>
      </UInput>

      <USelectMenu v-model="searchTerm" :items="searchableFields" class="w-40" />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="table-auto w-full">
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

        <tbody class="divide-y divide-gray-200">
          <slot :rows="filteredData" />
        </tbody>
      </table>
    </div>
  </div>
</template>
