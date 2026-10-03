-- Homepage project order + visibility, managed from /admin/projects.
-- Project text and images stay in lib/home-content.js (bilingual, versioned
-- with the code); this table only stores where each project sits and whether
-- it is shown. The first five visible rows form the featured deck.
-- Run this in the Supabase SQL editor for project whysefjbchzovkfvbzpe.

create table if not exists public.project_order (
  id          text primary key,          -- matches `id` in lib/home-content.js
  sort_order  integer not null default 0,
  published   boolean not null default true,
  updated_at  timestamptz not null default now()
);

-- RLS: the public site reads every row with the publishable key (it needs
-- hidden rows too, to tell "hidden" apart from "new in code"). Writes happen
-- server-side with the service_role key, which bypasses RLS.
alter table public.project_order enable row level security;

drop policy if exists "project_order public read" on public.project_order;
create policy "project_order public read"
  on public.project_order
  for select
  using (true);

-- Seed with today's on-screen order. Safe to re-run.
insert into public.project_order (id, sort_order)
values
  ('skylight', 1), ('kiara', 2), ('multigates', 3), ('nehgz', 4), ('tres', 5),
  ('postaty', 6), ('wasit', 7), ('augen', 8), ('tabel', 9), ('abreez', 10),
  ('cohr', 11), ('halaqr', 12), ('haladesign', 13), ('sewedy', 14)
on conflict (id) do nothing;
