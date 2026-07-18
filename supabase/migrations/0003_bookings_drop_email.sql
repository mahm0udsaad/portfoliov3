-- The reserve-seat form now collects name + phone only (email removed), so the
-- email column must be optional. Run this in the Supabase SQL editor for
-- project whysefjbchzovkfvbzpe. Safe to run on a table that already has data.

alter table public.course_bookings
  alter column email drop not null;

-- Optional: index phone for quick admin lookup by number.
create index if not exists course_bookings_phone_idx
  on public.course_bookings (phone);
