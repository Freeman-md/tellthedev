<template>
  <div class="space-y-6">
    <SharedPageTitle
      title="Feedback Details"
      description="View full context and respond to this feedback"
    />

    <LoadingSpinner v-if="isFetchingFeedback" message="Loading feedback..." />

    <ErrorState
      v-else-if="fetchFeedbackError"
      message="Failed to load feedback entry."
    >
      <UButton icon="i-lucide-refresh-ccw" @click="retryFetch">Retry</UButton>
    </ErrorState>

    <div v-else-if="feedback" class="space-y-6">
      <!-- Feedback Details -->
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Left: Main Details -->
        <div class="lg:col-span-2 space-y-4">
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold">Feedback Content</h3>
            </template>

            <div class="space-y-2">
              <div class="space-x-2">
                <UBadge
                  :label="feedback.type"
                  variant="outline"
                  color="neutral"
                />
                <UBadge :label="feedback.status" variant="soft" />
                <UBadge
                  v-if="feedback.sentiment"
                  :label="feedback.sentiment"
                  variant="subtle"
                />
              </div>

              <p class="text-base mt-2">{{ feedback.content }}</p>

              <div v-if="feedback.summary" class="text-sm text-muted mt-2">
                <strong>Summary:</strong> {{ feedback.summary }}
              </div>
            </div>
          </UCard>

          <!-- Timeline -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold">Timeline</h3>
            </template>

            <ul class="divide-y divide-gray-200">
              <li
                v-for="event in timeline"
                :key="event.id"
                class="py-3 text-sm space-y-1"
              >
                <div class="font-medium">
                  {{ event.event }}
                  <span v-if="event.status">→ {{ event.status }}</span>
                </div>
                <div class="text-muted">{{ event.message }}</div>
                <div class="text-xs text-gray-400">
                  {{ formatRelativeTime(event.created_at) }}
                </div>
              </li>
            </ul>
          </UCard>
        </div>

        <!-- Right: Metadata -->
        <div class="space-y-4">
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold">Metadata</h3>
            </template>

            <div class="text-sm space-y-2">
              <p><strong>Email:</strong> {{ feedback.email || "N/A" }}</p>
              <p>
                <strong>Referrer:</strong> {{ feedback.referrer_url || "N/A" }}
              </p>
              <p>
                <strong>Device Info:</strong>
                <code class="block text-xs whitespace-pre-wrap">
                  {{ formatDeviceInfo(feedback.device_info) }}
                </code>
              </p>
              <p><strong>Screenshot:</strong></p>
              <div>
                <NuxtImg
                  v-if="feedback.screenshot_url"
                  :src="feedback.screenshot_url"
                  alt="Screenshot"
                  class="w-full rounded border"
                />
                <span v-else class="italic text-gray-400">None</span>
              </div>
            </div>
          </UCard>

          <!-- Reply Templates (if any) -->
          <UCard v-if="replyTemplates.length">
            <template #header>
              <h3 class="text-lg font-semibold">Reply Templates</h3>
            </template>

            <ul class="space-y-2 text-sm">
              <li
                v-for="template in replyTemplates"
                :key="template.id"
                class="border rounded p-2"
              >
                <strong>{{ template.label }}</strong>
                <p class="text-muted text-xs mt-1 whitespace-pre-wrap">
                  {{ template.content }}
                </p>
              </li>
            </ul>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "#imports";
import { useFeedbackEntry } from "@/composables/useFeedbackEntry";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import ErrorState from "@/components/ui/ErrorState.vue";

const route = useRoute();
const id = route.params.id as string;

const {
  feedback,
  timeline,
  replyTemplates,
  isFetchingFeedback,
  fetchFeedbackEntry,
  fetchFeedbackError,
} = useFeedbackEntry(id);

onMounted(() => {
  fetchFeedbackEntry();
});

const formatRelativeTime = (timestamp: string) => {
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000 / 60),
    "minutes"
  );
};

const formatDeviceInfo = (deviceInfo: unknown) => {
  try {
    return typeof deviceInfo === "object"
      ? JSON.stringify(deviceInfo, null, 2)
      : String(deviceInfo);
  } catch {
    return "Invalid device info";
  }
};

const retryFetch = () => {
  fetchFeedbackEntry();
};
</script>
