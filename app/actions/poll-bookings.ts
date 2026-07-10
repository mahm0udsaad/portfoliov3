"use server";

import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type PollResult = {
  authorized: boolean;
  count: number;
  latest: { id: string; name: string; willing_to_pay: boolean } | null;
  error?: string;
};

// Polled by the admin dashboard to detect new bookings. Uses the service-role
// client (bypasses RLS) after confirming the caller has an authenticated
// admin session — so it needs no realtime/publication setup.
export async function pollBookings(): Promise<PollResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { authorized: false, count: 0, latest: null };
  }

  try {
    const admin = getSupabaseAdmin();
    const { data, error, count } = await admin
      .from("course_bookings")
      .select("id, name, willing_to_pay", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      return { authorized: true, count: 0, latest: null, error: error.message };
    }

    return {
      authorized: true,
      count: count ?? 0,
      latest: data?.[0] ?? null,
    };
  } catch (err) {
    return {
      authorized: true,
      count: 0,
      latest: null,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
