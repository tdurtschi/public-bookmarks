alter table profiles drop column website;

-- Create a table for bookmarks
create table bookmark (
  id bigserial primary key,
  user_id uuid references auth.users not null,
  url text not null,
  title text not null,
  description text null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/database/postgres/row-level-security for more details.
alter table bookmark
  enable row level security;
create policy "Collection is viewable by everyone." on bookmark
  for select using (true);
create policy "Users can insert their own bookmark." on bookmark
  for insert with check ((select auth.uid()) = user_id);
create policy "Users can update own bookmark." on bookmark
  for update using ((select auth.uid()) = user_id);