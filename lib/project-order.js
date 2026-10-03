import { createClient } from "@supabase/supabase-js";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

/* Order + visibility for homepage projects lives in Supabase
   (`project_order`); the projects themselves live in lib/home-content.js.
   Any failure returns null so the homepage keeps its code order. */

export async function getProjectOrder() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase
      .from("project_order")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return null;
    return data;
  } catch {
    return null;
  }
}

/* Saved rows decide position and visibility. Projects added in code but not
   yet in the table keep their code order and show after the saved ones. */
export function applyProjectOrder(projects, rows, { includeHidden = false } = {}) {
  if (!rows?.length) {
    return projects.map((p) => ({ ...p, published: true }));
  }
  const byId = new Map(
    rows.map((r, i) => [r.id, { index: i, published: r.published, category: r.category ?? null }]),
  );
  const rank = (p, codeIndex) => byId.get(p.id)?.index ?? rows.length + codeIndex;
  return projects
    .map((p, codeIndex) => {
      const saved = byId.get(p.id);
      return {
        project: { ...p, published: saved?.published ?? true, category: saved?.category || p.category },
        r: rank(p, codeIndex),
      };
    })
    .sort((a, b) => a.r - b.r)
    .map(({ project }) => project)
    .filter((p) => includeHidden || p.published);
}

/* Admin read with the service role: distinguishes "table missing". */
export async function getAllProjectOrderRows() {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("project_order")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      return { rows: [], tableMissing: error.code === "PGRST205", error: error.code === "PGRST205" ? null : error.message };
    }
    const rowsOut = data ?? [];
    // Category column arrives with migration 0005; until then the admin
    // hides the category picker.
    const hasCategory = rowsOut.length === 0 || "category" in rowsOut[0];
    return { rows: rowsOut, tableMissing: false, error: null, hasCategory };
  } catch (err) {
    return { rows: [], tableMissing: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}
