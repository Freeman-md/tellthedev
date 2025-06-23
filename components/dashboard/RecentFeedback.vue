<script setup lang="ts">
import { formatRelativeTime, useFeedback } from "#imports";
import BaseTable from "../base/BaseTable.vue";

const { data, headers } = useFeedback(2, [
  "type",
  "status",
  "referrer_url",
  "screenshot_url",
  "sentiment",
  "created_at",
  "device_info",
]);
</script>

<template>
  <div class="bg-white dark:bg-muted rounded-lg border border-gray-100 p-4 w-full overflow-x-hidden">
    <h3 class="text-lg font-semibold mb-4">Recent Feedback</h3>
    <BaseTable :headers="headers">
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(feedback, index) in data"
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
            <NuxtImg :src="feedback.screenshot_url" :alt="index" />
          </td>
          <td>
            {{ formatRelativeTime(feedback.created_at!) }}
          </td>
        </tr>
      </tbody>
    </BaseTable>
  </div>
</template>
