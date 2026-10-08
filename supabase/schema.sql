-- Run this in the new Supabase project's SQL Editor to create the table the app uses.
create table if not exists public.oop_students (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  student_number text not null unique,
  section_number text,
  password text not null,
  progress jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- The app talks to Supabase with the anon key only, so the anon role needs
-- read/insert/update/delete access on this table.
alter table public.oop_students enable row level security;

drop policy if exists "anon full access" on public.oop_students;
create policy "anon full access" on public.oop_students
  for all to anon using (true) with check (true);
