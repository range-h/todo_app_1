-- Create todos table in Supabase
-- Run this script in the Supabase SQL Editor

create table public.todos (
  id bigserial primary key,
  text text not null,
  completed boolean default false,
  "createdAt" timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.todos enable row level security;

-- Create policy to allow all operations (for public access)
-- Note: Adjust this based on your authentication requirements
create policy "Allow all operations for todos"
  on public.todos
  for all
  using (true)
  with check (true);

-- Create index for better query performance
create index idx_todos_created_at on public.todos("createdAt" desc);
