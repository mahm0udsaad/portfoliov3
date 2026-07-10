import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client using the service role key.
// NEVER import this into a client component — it bypasses Row Level Security.
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SERVICE_ROLE;

  if (!url || !serviceRole) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SERVICE_ROLE in .env.local",
    );
  }

  return createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
