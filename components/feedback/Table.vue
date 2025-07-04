<script setup lang="ts">
import { formatRelativeTime } from "@/shared/utils";

defineProps<{
  entries: FeedbackEntry[];
}>();

const goToFeedback = (id: string) => {
  navigateTo(`feedback/${id}`);
};
</script>

<template>
  <div
    class="bg-white dark:bg-muted rounded-lg border border-gray-100 p-4 w-full overflow-x-auto"
  >
    <UiBaseTable
      :headers="[
        'Type',
        'Status',
        'Content',
        'Sentiment',
        'Screenshot',
        'Referrer',
        'Created At',
      ]"
      :data="entries"
      :searchable-fields="[
        'type',
        'status',
        'content',
        'sentiment',
        'referrer_url',
      ]"
      :enable-search="true"
      empty-message="No feedback entries found."
    >
      <template #default="{ rows }">
        <tr
          v-for="(entry, index) in rows"
          :key="entry.id"
          class="*:py-4 *:pr-4"
          @click="goToFeedback(entry.id)"
        >
          <td>
            <UBadge :label="entry.type" variant="outline" color="neutral" />
          </td>
          <td>
            <UBadge :label="entry.status" variant="soft" />
          </td>
          <td class="max-w-xs truncate text-sm">
            {{ entry.content }}
          </td>
          <td>
            <UBadge :label="entry.sentiment" variant="soft" />
          </td>
          <td>
            <NuxtImg
              v-if="entry.screenshot_url"
              :src="entry.screenshot_url"
              :alt="index.toString()"
              class="w-12 h-12 object-cover rounded"
            />
            <span v-else class="text-xs text-gray-400 italic">None</span>
          </td>
          <td>
            <small>{{ entry.referrer_url || "—" }}</small>
          </td>
          <td>
            {{ formatRelativeTime(entry.created_at) }}
          </td>
        </tr>
      </template>
    </UiBaseTable>
  </div>
</template>
