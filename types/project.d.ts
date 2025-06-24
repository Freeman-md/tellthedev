export type Project = {
  id: string;
  name: string;
  slug: string;
  description: string;
  api_key: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  origins: string[];
  widget_settings: Record<string, unknown>;
};

export type CreateProjectPayload = {
  user_id?: string;
  name: string;
  slug: string;
  description: string;
  origins: string[];
  widget_settings: Record<string, unknown>;
};
