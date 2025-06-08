alter table feedback
drop constraint feedback_type_check;

alter table feedback
add constraint feedback_type_check
check (type in ('bug', 'feature', 'general'));