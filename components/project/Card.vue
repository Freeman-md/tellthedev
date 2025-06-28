<template>
  <UTooltip
    class="block"
    arrow
    :content="{ side: 'bottom', sideOffset: 8 }"
    :text="undefined"
    @click="handleCardClick"
  >
    <div
      class="border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow transition cursor-pointer"
    >
      <div class="flex items-start justify-between">
        <div>
          <h3 class="font-semibold text-lg truncate">{{ project.name }}</h3>
          <p class="text-sm text-gray-500 truncate">@{{ project.slug }}</p>
        </div>
        <UButton
          icon="i-lucide-arrow-right"
          size="sm"
          variant="ghost"
          aria-label="Go to project"
          :to="`/dashboard/projects/${project.slug}`"
        />
      </div>

      <div class="mt-4 flex justify-between items-center text-xs text-gray-500">
        <span>{{ formattedDate }}</span>
        <span
          v-if="project.origins?.length"
          class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
        >
          {{ project.origins.length }} origin{{
            project.origins.length > 1 ? "s" : ""
          }}
        </span>
      </div>
    </div>

    <template #content>
      <div
        class="space-y-2 text-sm leading-relaxed bg-white dark:bg-gray-900 p-4 shadow-xl rounded-md max-w-xs"
      >
        <p class="text-gray-800 dark:text-gray-100">
          🚀 You’re on the <strong>free</strong> plan — perfect for early
          feedback.
        </p>
        <p class="text-gray-600 dark:text-gray-400 text-xs">
          Upgrade to unlock faster syncing, instant feedback processing, and
          smart insights.
        </p>

        <UButton
          to="/pricing"
          size="xs"
          variant="solid"
          color="primary"
          class="mt-2"
        >
          Upgrade now
        </UButton>
      </div>
    </template>
  </UTooltip>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatRelativeTime } from "@/shared/utils";

const { project } = defineProps<{
  project: Pick<Project, "id" | "name" | "slug" | "created_at" | "origins">;
}>();

const formattedDate = computed(() =>
  formatRelativeTime(project.created_at)
);

const handleCardClick = () => {
  navigateTo(`/dashboard/projects/${project.slug}`)
}
</script>
