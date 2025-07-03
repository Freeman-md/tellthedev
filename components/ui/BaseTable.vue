<script setup lang="ts" generic="T">
import { defineShortcuts } from '#imports';
import { computed, ref, watch, type ComponentPublicInstance } from 'vue';
import LoadingSpinner from '../ui/LoadingSpinner.vue';
import ErrorState from '../ui/ErrorState.vue';
import EmptyState from '../ui/EmptyState.vue';

interface BaseTableProps<T> {
  headers: string[];
  data: T[];
  searchableFields?: Array<keyof T>;
  enableSearch?: boolean;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}
const props = defineProps<BaseTableProps<T>>();

const emit = defineEmits<{
  (e: 'search', text: string): void;
}>();

const searchText = ref('');
const searchInputRef = ref<ComponentPublicInstance | null>(null);

const searchableFieldOptions = computed(() =>
  (props.searchableFields ?? []).map((f) => String(f))
);

const searchTerm = ref(searchableFieldOptions.value[0] || '');


defineShortcuts({
  "/": () => {
    const inputEl = searchInputRef.value?.$el?.querySelector('input') as HTMLInputElement | null;
    inputEl?.focus();
  },
});

const filteredData = computed(() => {
  if (!props.searchableFields || !props.enableSearch) return props.data;

  return props.data.filter((item) => {
    const key = searchTerm.value as keyof T;
    const fieldValue = item?.[key];
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
        placeholder="Search by..."
        :ui="{ leading: 'pointer-events-none' }"
      >
        <template #trailing>
          <UKbd value="/" />
        </template>
      </UInput>

      <USelectMenu v-model="searchTerm" :items="searchableFieldOptions" class="w-40" />
    </div>

    <LoadingSpinner v-if="loading" message="Loading..." />
    <ErrorState v-else-if="error" :message="error" />
    <EmptyState v-else-if="!filteredData.length" :message="emptyMessage || 'No data found.'" />

    <div v-else class="overflow-x-auto">
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
