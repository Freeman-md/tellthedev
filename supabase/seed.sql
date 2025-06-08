insert into auth.users (id, email)
values ('00000000-0000-0000-0000-000000000000', 'dev@example.com');


insert into projects (id, user_id, name)
values (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'TellTheDev – Demo Project'
);


insert into feedback (project_id, type, message, url, status)
select id, 'bug', 'The form glitches on mobile', 'https://demo.dev/page', 'new'
from projects
where name = 'TellTheDev – Demo Project'
limit 1;

insert into feedback (project_id, type, message, url, status)
select id, 'feature', 'Add dark mode support', 'https://demo.dev/page', 'read'
from projects
where name = 'TellTheDev – Demo Project'
limit 1;
