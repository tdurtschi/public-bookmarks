create policy "Tags are creatable only by authenticated users" on tag 
  for insert to authenticated with check (true);