-- Create a table for tags
create table tag (
  id serial primary key,
  tag_name text
);

alter table tag
  enable row level security;
create policy "Tags are viewable only by authenticated users" on tag 
  for select to authenticated using ( true );

alter table bookmark
  add column tags integer[];