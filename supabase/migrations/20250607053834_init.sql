create table if not exists projects (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users not null,
    name text not null,
    created_at timestamp default now()
);

create table if not exists feedback (
    id uuid primary key default gen_random_uuid(),
    project_id uuid references projects(id) on delete cascade,
    type text check (type in ('bug', 'features', 'general')) not null,
    message text not null,
    screenshot_url text,
    url text,
    status text default 'new' check (status in ('new', 'read', 'resolved')),
    created_at timestamp default now()
);

alter table projects enable row level security;
alter table feedback enable row level security;


create policy "Users can select their own projects"
on projects
for select
using (auth.uid() = user_id);

create policy "Users can update their own projects"
on projects
for update
using (auth.uid() = user_id);

create policy "Users can delete their own projects"
on projects
for delete
using (auth.uid() = user_id);


create policy "Users can insert their own projects"
on projects
for insert
with check (auth.uid() = user_id);


create policy "Anyone can insert feedback"
on feedback
for insert
with check (true);

create policy "Project owners can update feedback"
on feedback
for update
using (
  exists (
    select 1 from projects
    where projects.id = feedback.project_id
    and projects.user_id = auth.uid()
  )
);

create policy "Project owners can delete feedback"
on feedback
for delete
using (
  exists (
    select 1 from projects
    where projects.id = feedback.project_id
    and projects.user_id = auth.uid()
  )
);

