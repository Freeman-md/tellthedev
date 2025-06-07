alter table projects
alter column created_at type timestamptz
using created_at::timestamptz;

alter table feedback
alter column created_at type timestamptz
using created_at::timestamptz;

alter table projects
add column if not exists updated_at timestamptz default now();

alter table feedback
add column if not exists updated_at timestamptz default now();
