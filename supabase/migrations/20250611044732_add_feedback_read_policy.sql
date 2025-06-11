create policy "Project owners can read feedback"
on feedback
for select
using (
  exists (
    select 1 from projects
    where projects.id = feedback.project_id
    and projects.user_id = auth.uid()
  )
);
