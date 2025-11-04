drop policy "Tags are viewable only by authenticated users" on tag;

create policy "Tags are viewable by everyone." on tag
  for select using (true);