<script setup lang="ts">
import {
  computed,
  defineShortcuts,
  formatRelativeTime,
  ref,
  useFeedback,
} from "#imports";
import BaseTable from "../base/BaseTable.vue";

const searchText = ref("");
const searchInputRef = ref<HTMLInputElement | null>(null);

defineShortcuts({
  "/": () => {
    searchInputRef.value?.focus();
  },
});

const searchTerms: Array<keyof FeedbackEntry> = [
  "type",
  "sentiment",
  "referrer_url",
];
const searchTerm = ref(searchTerms[0]);

const { data, headers } = useFeedback(2, [
  "type",
  "referrer_url",
  "device_info",
  "sentiment",
  "screenshot_url",
  "created_at",
]);

const filteredData = computed(() => {
  return data.value.filter((feedback) => {
    const fieldValue = feedback[searchTerm.value];
    if (typeof fieldValue === 'string') {
      return fieldValue.toLowerCase().includes(searchText.value.toLowerCase());
    }
    return false;
  });
});
</script>

<template>
  <div
    class="bg-white dark:bg-muted rounded-lg border border-gray-100 p-4 w-full overflow-x-hidden"
  >
    <h3 class="text-lg font-semibold mb-4">Recent Feedback</h3>

    <UButtonGroup>
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

      <USelectMenu v-model="searchTerm" :items="searchTerms" class="w-40" />
    </UButtonGroup>

    <BaseTable :headers="headers">
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(feedback, index) in filteredData"
          :key="index"
          class="*:py-4 *:pr-4"
        >
          <td>
            <UBadge :label="feedback.type" variant="outline" color="neutral" />
          </td>
          <td>
            <small>{{ feedback.referrer_url }}</small>
          </td>
          <td>
            <code class="text-sm whitespace-nowrap">{{
              feedback.device_info
            }}</code>
          </td>
          <td>
            <UBadge :label="feedback.sentiment" variant="soft" />
          </td>
          <td>
            <NuxtImg :src="feedback.screenshot_url" :alt="index.toString()" />
          </td>
          <td>
            {{ formatRelativeTime(feedback.created_at as string) }}
          </td>
        </tr>
      </tbody>
    </BaseTable>
  </div>
</template>
