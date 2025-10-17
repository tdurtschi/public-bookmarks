create policy "Users can delete own bookmark." on bookmark
  for delete using ((select auth.uid()) = user_id);