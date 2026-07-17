import { createClient } from "@supabase/supabase-js";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * Cookie-free anon client for public reads. Unlike the SSR client it doesn't
 * touch cookies, so the homepage stays statically renderable / cacheable.
 * RLS restricts this key to `published = true` rows.
 */
function getPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

/**
 * Maps a raw chat_messages row to the localized shape the chat UI renders.
 * Voice bubbles and image bubbles have different fields; `kind` selects which
 * component renders in components/voice-notes.jsx.
 */
function toClientMessage(row, locale) {
  if (row.type === "image") {
    return {
      kind: "image",
      id: row.id,
      src: row.image_url,
      alt: row.alt ?? "",
      width: row.image_width ?? 590,
      height: row.image_height ?? 1280,
      time: row.sent_at ?? "",
    };
  }

  return {
    kind: "voice",
    id: row.id,
    flag: row.flag ?? "",
    name: row.name ?? "",
    role: (locale === "ar" ? row.role_ar : row.role_en) ?? "",
    company: (locale === "ar" ? row.company_ar : row.company_en) ?? "",
    duration: row.duration ?? 0,
    sentAt: row.sent_at ?? "",
    audioUrl: row.audio_url,
  };
}

/**
 * Public read for the site. Returns a single ordered array of localized
 * messages, or `null` when the table is missing/empty/errors — the caller then
 * falls back to the static content in lib/testimonials.js so nothing breaks
 * before the migration has run.
 */
export async function getPublishedChatMessages(locale = "en") {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return null;
    return data.map((row) => toClientMessage(row, locale));
  } catch {
    return null;
  }
}

/**
 * Admin read — every row (published or not) via the service-role key, ordered
 * for the manager UI. Reports a missing table the same way the bookings page
 * does so the admin can be told to run the migration.
 */
export async function getAllChatMessages() {
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("chat_messages")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      if (error.code === "PGRST205") {
        return { rows: [], tableMissing: true, error: null };
      }
      return { rows: [], tableMissing: false, error: error.message };
    }

    return { rows: data ?? [], tableMissing: false, error: null };
  } catch (err) {
    return {
      rows: [],
      tableMissing: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
