<script setup lang="ts">
import {
  formatRelativeTime,
  useFeedback,
} from '#imports';
import BaseTable from '../base/BaseTable.vue';

const searchTerms: Array<keyof FeedbackEntry> = [
  'type',
  'sentiment',
  'referrer_url',
];

const { data, headers, pending, error } = useFeedback(5, [
  'type',
  'referrer_url',
  'device_info',
  'sentiment',
  'screenshot_url',
  'created_at',
]);
</script>

<template>
  <div class="bg-white dark:bg-muted rounded-lg border border-gray-100 p-4 w-full overflow-x-hidden">
    <h3 class="text-lg font-semibold mb-4">Recent Feedback</h3>

    <BaseTable
      :headers="headers"
      :data="data as Record<string, unknown>[]"
      :searchable-fields="searchTerms"
      :enable-search="true"
      :loading="pending"
      :error="error"
      empty-message="No feedback entries available."
    >
      <template #default="{ rows }">
        <tr
          v-for="(feedback, index) in rows"
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
            <code class="text-sm whitespace-nowrap">
              {{ typeof feedback.device_info === 'object' ? JSON.stringify(feedback.device_info) : feedback.device_info }}
            </code>
          </td>
          <td>
            <UBadge :label="feedback.sentiment" variant="soft" />
          </td>
          <td>
            <NuxtImg
              v-if="feedback.screenshot_url"
              :src="feedback.screenshot_url"
              :alt="index.toString()"
              class="w-12 h-12 object-cover rounded"
            />
            <span v-else class="text-xs text-gray-400 italic">None</span>
          </td>
          <td>
            {{ formatRelativeTime(feedback.created_at as string) }}
          </td>
        </tr>
      </template>
    </BaseTable>
  </div>
</template>
