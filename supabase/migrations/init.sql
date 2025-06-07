create table if not exists projects (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users not null,
    name text not null,
    created_at timestamp default now()
)

create table if not exists feedback (
    id uuid primary key default gen_random_uuid(),
    project_id uuid references projects(id) on delete cascade,
    type text check (type in ('bug', 'features', 'general')) not null,
    message text not null,
    screenshot_url text,
    url text,
    status text default 'new' check (status in ('new', 'read', 'resolved')),
    created_at timestamp default now()
)