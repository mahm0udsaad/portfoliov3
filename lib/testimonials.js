/**
 * Client voice-note testimonials — rendered as a group-chat thread.
 *
 * Sender names/roles/companies below started as PLACEHOLDER GUESSES for
 * layout; names are visually blurred in the UI. Verify each entry's real
 * role/company/flag (and the client's OK) as they get confirmed. Entries
 * with a Supabase `audioUrl` in PUBLISHED_NOTES take priority; otherwise the
 * local files in /public/voice-notes ship with the site.
 * Upload helper: node --env-file=.env.local scripts/upload-voice-notes.mjs <file.ogg> <slug>
 */

const PREVIEW_NOTES = [
  // ── evening batch ─────────────────────────────────────────────
  { id: "note-01", file: "/voice-notes/note-01.ogg", duration: 5,   sentAt: "8:59 PM",  name: "Abdullah T.", flag: "🇸🇦", en: { role: "Founder",           company: "TRES Specialty Coffee" },  ar: { role: "مؤسس",          company: "تريس للقهوة المختصة" } },
  { id: "note-02", file: "/voice-notes/note-02.ogg", duration: 28,  sentAt: "9:01 PM",  name: "Abdullah T.", flag: "🇸🇦", en: { role: "Founder",           company: "TRES Specialty Coffee" },  ar: { role: "مؤسس",          company: "تريس للقهوة المختصة" } },
  { id: "note-03", file: "/voice-notes/note-03.ogg", duration: 14,  sentAt: "9:04 PM",  name: "Khaled R.",   flag: "🇸🇦", en: { role: "Operations Lead",   company: "Nehgz" },                  ar: { role: "مدير العمليات",  company: "نحجز" } },
  { id: "note-04", file: "/voice-notes/note-04.ogg", duration: 54,  sentAt: "9:10 PM",  name: "Omar S.",     flag: "🇪🇬", en: { role: "Founder",           company: "Augen Eyewear" },         ar: { role: "مؤسس",          company: "أوجن للنظارات" } },
  { id: "note-05", file: "/voice-notes/note-05.ogg", duration: 11,  sentAt: "9:20 PM",  name: "Faisal A.",   flag: "🇸🇦", en: { role: "Product Manager",   company: "Sufrah" },                 ar: { role: "مدير المنتج",   company: "سفرة" } },
  { id: "note-06", file: "/voice-notes/note-06.ogg", duration: 38,  sentAt: "9:21 PM",  name: "Salem N.",    flag: "🇸🇦", en: { role: "Co-founder",        company: "Wasit Alan" },             ar: { role: "شريك مؤسس",     company: "وسيط الآن" } },
  { id: "note-07", file: "/voice-notes/note-07.ogg", duration: 5,   sentAt: "9:23 PM",  name: "Mostafa H.",  flag: "🇪🇬", en: { role: "Founder",           company: "Postaty" },                ar: { role: "مؤسس",          company: "بوستاتي" } },
  { id: "note-08", file: "/voice-notes/note-08.ogg", duration: 10,  sentAt: "9:33 PM",  name: "Amr E.",      flag: "🇪🇬", en: { role: "Owner",             company: "Amstore" },                ar: { role: "صاحب المتجر",   company: "أمستور" } },
  { id: "note-09", file: "/voice-notes/note-09.ogg", duration: 9,   sentAt: "9:36 PM",  name: "Yousef Q.",   flag: "🇶🇦", en: { role: "Marketing Lead",    company: "Abreez Group" },           ar: { role: "مدير التسويق",  company: "مجموعة أبريز" } },
  { id: "note-10", file: "/voice-notes/note-10.ogg", duration: 130, sentAt: "9:43 PM",  name: "Hany M.",     flag: "🇪🇬", en: { role: "Engineering Manager", company: "Elsewedy Automation" },  ar: { role: "مدير الهندسة",  company: "السويدي للأتمتة" } },
  // ── late-night batch ──────────────────────────────────────────
  { id: "note-11", file: "/voice-notes/note-11.ogg", duration: 18,  sentAt: "10:53 PM", name: "Reem K.",     flag: "🇸🇦", en: { role: "HR Director",       company: "COHR" },                   ar: { role: "مديرة الموارد البشرية", company: "كابيتال للموارد البشرية" } },
  { id: "note-12", file: "/voice-notes/note-12.ogg", duration: 7,   sentAt: "10:53 PM", name: "Tarek B.",    flag: "🇪🇬", en: { role: "Owner",             company: "Tatbela & Tabel" },        ar: { role: "صاحب المتجر",   company: "تتبيلة وتوابل" } },
  { id: "note-13", file: "/voice-notes/note-13.ogg", duration: 13,  sentAt: "10:53 PM", name: "Khaled R.",   flag: "🇸🇦", en: { role: "Operations Lead",   company: "Nehgz" },                  ar: { role: "مدير العمليات",  company: "نحجز" } },
  { id: "note-14", file: "/voice-notes/note-14.ogg", duration: 3,   sentAt: "10:53 PM", name: "Nawaf D.",    flag: "🇸🇦", en: { role: "Partnerships",      company: "OneCard" },                ar: { role: "شراكات",        company: "ون كارد" } },
  { id: "note-15", file: "/voice-notes/note-15.ogg", duration: 15,  sentAt: "10:53 PM", name: "Dina F.",     flag: "🇪🇬", en: { role: "Founder",           company: "Hala QR" },                ar: { role: "مؤسِّسة",       company: "هلا QR" } },
];

/**
 * Notes with a confirmed Supabase `audioUrl` go here; once this list has
 * entries it replaces the local-file list everywhere, production included.
 */
const PUBLISHED_NOTES = [];

function localize(locale) {
  const source = PUBLISHED_NOTES.length > 0 ? PUBLISHED_NOTES : PREVIEW_NOTES;
  return source.map(({ en, ar, file, audioUrl, ...note }) => ({
    ...note,
    ...(locale === "ar" ? ar : en),
    audioUrl: audioUrl ?? file,
  }));
}

export const voiceNotes = localize("en");
export const voiceNotesAr = localize("ar");
