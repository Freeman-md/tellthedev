import { FeedbackService } from '@/services/feedback-service'

export const useFeedbackEntry = (id: string) => {
  const feedback = useState<FeedbackEntry | null>(() => null)
  const timeline = useState<FeedbackTimelineEntry[]>(() => [])
  const replyTemplates = useState<FeedbackReplyTemplate[]>(() => [])

  const feedbackService = new FeedbackService()

  const {
    pending: isFetchingFeedback,
    error: fetchFeedbackError,
    execute: fetchFeedbackEntry,
    status: fetchFeedbackStatus
  } = useAsyncData(`feedback-entry-${id}`, async () => {
    const entry = await feedbackService.getFeedbackById(id)
    const events = await feedbackService.getTimelineForFeedback(id)

    feedback.value = entry
    timeline.value = events

    if (entry.project_id) {
      replyTemplates.value = await feedbackService.getReplyTemplatesForProject(entry.project_id)
    }

    return { entry, events }
  }, {
    immediate: false,
  })

  return {
    feedback,
    timeline,
    replyTemplates,
    isFetchingFeedback,
    fetchFeedbackEntry,
    fetchFeedbackStatus,
    fetchFeedbackError,
  }
}
