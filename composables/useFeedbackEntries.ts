import { useAsyncData, useState } from '#imports'
import { FeedbackService } from '@/services/feedback-service'

export const useFeedbackEntries = (projectId: Ref<string | null>) => {
  const feedbackEntries = useState<FeedbackEntry[]>('feedback-entries', () => [])
  const feedbackService = new FeedbackService()

  const {
    pending: isFetchingFeedback,
    execute: fetchFeedback,
    refresh: refreshFeedback,
    error: fetchFeedbackError,
    status: fetchFeedbackStatus,
  } = useAsyncData(`feedback-${projectId.value}`, async () => {
    if (!projectId.value) throw new Error('Project ID missing')
    feedbackEntries.value = await feedbackService.fetchFeedbackForProject(projectId.value)
  }, {
    immediate: false,
    watch: [projectId],
  })

  return {
    feedbackEntries,
    isFetchingFeedback,
    fetchFeedback,
    refreshFeedback,
    fetchFeedbackError,
    fetchFeedbackStatus,
  }
}
