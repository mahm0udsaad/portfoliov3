-- Lets /admin/projects move a project between homepage tabs.
-- NULL means "use the default category set in lib/home-content.js".
-- Run after 0004, in the Supabase SQL editor for project whysefjbchzovkfvbzpe.

alter table public.project_order
  add column if not exists category text
  check (category in ('systems', 'websites', 'apps', 'designs'));
