ALTER TABLE projects
ADD COLUMN allowed_origins text[] DEFAULT '{}';
