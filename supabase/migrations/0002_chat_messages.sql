-- Client-feedback chat content (voice notes + screenshot images).
-- Powers the "Live client feedback" chat on the homepage and is managed from
-- /admin/chat. Run this in the Supabase SQL editor for project whysefjbchzovkfvbzpe.

create table if not exists public.chat_messages (
  id           uuid primary key default gen_random_uuid(),
  type         text not null check (type in ('voice', 'image')),
  sort_order   integer not null default 0,
  published    boolean not null default true,

  -- shared
  name         text,
  flag         text,
  sent_at      text,

  -- voice
  audio_url    text,
  duration     integer,
  role_en      text,
  role_ar      text,
  company_en   text,
  company_ar   text,

  -- image
  image_url    text,
  alt          text,
  image_width  integer,
  image_height integer,

  created_at   timestamptz not null default now()
);

create index if not exists chat_messages_sort_order_idx
  on public.chat_messages (sort_order asc);

-- RLS: the public site reads published rows with the publishable/anon key.
-- All writes happen server-side with the service_role key, which bypasses RLS.
alter table public.chat_messages enable row level security;

drop policy if exists "chat_messages public read" on public.chat_messages;
create policy "chat_messages public read"
  on public.chat_messages
  for select
  using (published = true);

-- Public bucket for uploaded audio/images managed from the admin panel.
insert into storage.buckets (id, name, public)
values ('chat-media', 'chat-media', true)
on conflict (id) do nothing;

drop policy if exists "chat-media public read" on storage.objects;
create policy "chat-media public read"
  on storage.objects
  for select
  using (bucket_id = 'chat-media');

-- ── Seed: today's on-screen content, in the current order ──────────────────
-- Story (sort 1-6): three voice notes interleaved with three screenshots.
-- Rest (sort 7-18): the remaining voice notes, shown behind "load more".
-- Seed only runs on an empty table so re-running the migration is safe.
insert into public.chat_messages
  (type, sort_order, name, flag, sent_at,
   audio_url, duration, role_en, role_ar, company_en, company_ar,
   image_url, alt, image_width, image_height)
select * from (values
  ('voice', 1,  'Abdullah T.', '🇸🇦', '8:59 PM',  '/voice-notes/note-01.ogg', 5,   'Founder',             'مؤسس',                'TRES Specialty Coffee', 'تريس للقهوة المختصة', null::text, null::text, null::int, null::int),
  ('image', 2,  null, null, '5:28 PM',  null, null, null, null, null, null, '/testimonials/client-message-01.png', 'Arabic client message praising the delivered website', 590, 1280),
  ('voice', 3,  'Abdullah T.', '🇸🇦', '9:01 PM',  '/voice-notes/note-02.ogg', 28,  'Founder',             'مؤسس',                'TRES Specialty Coffee', 'تريس للقهوة المختصة', null, null, null, null),
  ('image', 4,  null, null, '2:37 PM',  null, null, null, null, null, null, '/testimonials/client-message-02.png', 'Arabic client message praising the creativity of the delivered app', 590, 1280),
  ('voice', 5,  'Khaled R.',   '🇸🇦', '9:04 PM',  '/voice-notes/note-03.ogg', 14,  'Operations Lead',     'مدير العمليات',       'Nehgz',                 'نحجز',                null, null, null, null),
  ('image', 6,  null, null, '11:11 PM', null, null, null, null, null, null, '/testimonials/client-message-03.png', 'Arabic client message thanking Mahmoud for his development mentorship', 738, 1600),
  ('voice', 7,  'Omar S.',     '🇪🇬', '9:10 PM',  '/voice-notes/note-04.ogg', 54,  'Founder',             'مؤسس',                'Augen Eyewear',         'أوجن للنظارات',       null, null, null, null),
  ('voice', 8,  'Faisal A.',   '🇸🇦', '9:20 PM',  '/voice-notes/note-05.ogg', 11,  'Product Manager',     'مدير المنتج',         'Sufrah',                'سفرة',                null, null, null, null),
  ('voice', 9,  'Salem N.',    '🇸🇦', '9:21 PM',  '/voice-notes/note-06.ogg', 38,  'Co-founder',          'شريك مؤسس',           'Wasit Alan',            'وسيط الآن',           null, null, null, null),
  ('voice', 10, 'Mostafa H.',  '🇪🇬', '9:23 PM',  '/voice-notes/note-07.ogg', 5,   'Founder',             'مؤسس',                'Postaty',               'بوستاتي',             null, null, null, null),
  ('voice', 11, 'Amr E.',      '🇪🇬', '9:33 PM',  '/voice-notes/note-08.ogg', 10,  'Owner',               'صاحب المتجر',         'Amstore',               'أمستور',              null, null, null, null),
  ('voice', 12, 'Yousef Q.',   '🇶🇦', '9:36 PM',  '/voice-notes/note-09.ogg', 9,   'Marketing Lead',      'مدير التسويق',        'Abreez Group',          'مجموعة أبريز',        null, null, null, null),
  ('voice', 13, 'Hany M.',     '🇪🇬', '9:43 PM',  '/voice-notes/note-10.ogg', 130, 'Engineering Manager', 'مدير الهندسة',        'Elsewedy Automation',   'السويدي للأتمتة',     null, null, null, null),
  ('voice', 14, 'Reem K.',     '🇸🇦', '10:53 PM', '/voice-notes/note-11.ogg', 18,  'HR Director',         'مديرة الموارد البشرية', 'COHR',                'كابيتال للموارد البشرية', null, null, null, null),
  ('voice', 15, 'Tarek B.',    '🇪🇬', '10:53 PM', '/voice-notes/note-12.ogg', 7,   'Owner',               'صاحب المتجر',         'Tatbela & Tabel',       'تتبيلة وتوابل',       null, null, null, null),
  ('voice', 16, 'Khaled R.',   '🇸🇦', '10:53 PM', '/voice-notes/note-13.ogg', 13,  'Operations Lead',     'مدير العمليات',       'Nehgz',                 'نحجز',                null, null, null, null),
  ('voice', 17, 'Nawaf D.',    '🇸🇦', '10:53 PM', '/voice-notes/note-14.ogg', 3,   'Partnerships',        'شراكات',              'OneCard',               'ون كارد',             null, null, null, null),
  ('voice', 18, 'Dina F.',     '🇪🇬', '10:53 PM', '/voice-notes/note-15.ogg', 15,  'Founder',             'مؤسِّسة',             'Hala QR',               'هلا QR',              null, null, null, null)
) as seed
where not exists (select 1 from public.chat_messages);
