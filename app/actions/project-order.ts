"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const CATEGORIES = new Set(["systems", "websites", "apps", "designs"]);

export type ProjectOrderResult = { success: boolean; message?: string };

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");
}

function revalidateSurfaces() {
  revalidatePath("/");
  revalidatePath("/ar");
  revalidatePath("/admin/projects");
}

/** Saves the full order. Upsert, so projects new in code get a row too. */
export async function saveProjectOrder(formData: FormData): Promise<ProjectOrderResult> {
  try {
    await requireAdmin();
    const ids = String(formData.get("ids") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const hidden = new Set(
      String(formData.get("hidden") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    );
    if (ids.length === 0) return { success: false, message: "No order provided." };

    // "id:category" pairs; only sent once migration 0005 has added the column.
    const rawCategories = formData.get("categories");
    const categories = new Map<string, string>();
    for (const pair of String(rawCategories ?? "").split(",")) {
      const [id, cat] = pair.split(":");
      if (id && CATEGORIES.has(cat)) categories.set(id, cat);
    }

    const now = new Date().toISOString();
    const { error } = await getSupabaseAdmin()
      .from("project_order")
      .upsert(
        ids.map((id, i) => ({
          id,
          sort_order: i + 1,
          published: !hidden.has(id),
          updated_at: now,
          ...(rawCategories !== null ? { category: categories.get(id) ?? null } : {}),
        })),
        { onConflict: "id" },
      );
    if (error) throw new Error(error.message);

    revalidateSurfaces();
    return { success: true };
  } catch (err) {
    return { success: false, message: err instanceof Error ? err.message : "Failed to save order." };
  }
}
