-- Allow the signed-in admin (Supabase Auth "authenticated" role) to read
-- bookings, and enable Realtime so the admin dashboard can get notified of
-- new rows via postgres_changes. Run this in the Supabase SQL editor for
-- project whysefjbchzovkfvbzpe (after 0001_course_bookings.sql).

create policy "Authenticated can read bookings"
  on public.course_bookings
  for select
  to authenticated
  using (true);

alter publication supabase_realtime add table public.course_bookings;
