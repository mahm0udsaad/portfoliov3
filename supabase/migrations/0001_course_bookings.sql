-- Course bookings for the "AI & Video Editing with AI" course.
-- Run this in the Supabase SQL editor for project whysefjbchzovkfvbzpe.

create table if not exists public.course_bookings (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  phone         text,
  willing_to_pay boolean not null default false,
  course        text not null default 'AI & Video Editing with AI',
  source        text,
  created_at    timestamptz not null default now()
);

create index if not exists course_bookings_created_at_idx
  on public.course_bookings (created_at desc);

-- Lock the table down: RLS on, no public policies.
-- Inserts happen server-side with the service_role key, which bypasses RLS.
alter table public.course_bookings enable row level security;
