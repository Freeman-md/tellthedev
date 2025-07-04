export type FeedbackType = 'bug' | 'idea' | 'praise' | 'general';
export type FeedbackStatus = 'open' | 'in_progress' | 'resolved' | 'ignored';
export type Sentiment = 'positive' | 'neutral' | 'negative';

export interface FeedbackEntry {
  id: string; // UUID
  project_id: string; // UUID
  type: FeedbackType;
  status: FeedbackStatus;
  content: string;
  summary?: string | null;
  sentiment?: Sentiment;
  email?: string | null;
  screenshot_url?: string | null;
  device_info?: Record<string, unknown> | null;
  referrer_url?: string | null;
  is_review: boolean;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
