export type Project = {
  id: string;
  name: string;
  slug: string;
  description: string;
  api_key_dev: string;
  api_key_live: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  origins: string[];
};

export type CreateProjectPayload = {
  user_id?: string;
  name: string;
  slug: string;
  description: string;
  origins: string[];
};
