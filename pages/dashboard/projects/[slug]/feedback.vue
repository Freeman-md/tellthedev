<script setup lang="ts">
const { currentProject } = useProjects()
const projectId = computed(() => currentProject.value?.id || null)

const {
  feedbackEntries,
  isFetchingFeedback,
  fetchFeedbackError,
  fetchFeedback,
} = useFeedbackEntries(projectId)

onMounted(() => {
  if (projectId.value) fetchFeedback()
})

const reloadPage = () => {
  window.location.reload()
}
</script>

<template>
  <div class="space-y-6">
    <SharedPageTitle title="Feedback" description="Manage and respond to user feedback" />

    <UiLoadingSpinner v-if="isFetchingFeedback" message="Loading feedback..." />

    <UiErrorState v-else-if="fetchFeedbackError" message="Failed to load feedback.">
      <UButton icon="i-lucide-refresh-ccw" @click="reloadPage">Try Again</UButton>
    </UiErrorState>

    <FeedbackTable v-else-if="feedbackEntries.length" :entries="feedbackEntries" />

    <UiEmptyState v-else message="No feedback received yet.">
      <UButton icon="i-lucide-refresh-ccw" @click="reloadPage">Refresh</UButton>
    </UiEmptyState>
  </div>
</template>
