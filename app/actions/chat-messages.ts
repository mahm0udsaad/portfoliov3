"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type ChatActionResult = { success: boolean; message?: string };

const BUCKET = "chat-media";

/** Every mutation runs behind the admin session — a signed-out caller is rejected. */
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
  revalidatePath("/admin/chat");
}

function num(value: FormDataEntryValue | null): number | null {
  const s = (value as string | null)?.trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function str(value: FormDataEntryValue | null): string | null {
  const s = (value as string | null)?.trim();
  return s && s.length > 0 ? s : null;
}

async function uploadMedia(
  file: File,
  kind: "voice" | "image",
): Promise<string> {
  const admin = getSupabaseAdmin();
  const ext =
    file.name.split(".").pop()?.toLowerCase() ||
    (kind === "voice" ? "ogg" : "png");
  const path = `${kind}/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await admin.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) throw new Error(`Upload failed: ${error.message}`);

  return admin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Removes an uploaded object when its URL points at our public bucket. */
async function removeMediaByUrl(url: string | null) {
  if (!url) return;
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return; // static/local asset — leave it alone
  const path = url.slice(idx + marker.length);
  try {
    await getSupabaseAdmin().storage.from(BUCKET).remove([path]);
  } catch {
    // best-effort cleanup
  }
}

function buildRowFromForm(formData: FormData, uploadedUrl: string | null) {
  const type = str(formData.get("type")) === "image" ? "image" : "voice";
  const published = formData.get("published") !== "false";

  const base = {
    type,
    published,
    name: str(formData.get("name")),
    flag: str(formData.get("flag")),
    sent_at: str(formData.get("sent_at")),
  };

  if (type === "image") {
    return {
      ...base,
      image_url: uploadedUrl ?? str(formData.get("image_url")),
      alt: str(formData.get("alt")),
      image_width: num(formData.get("image_width")),
      image_height: num(formData.get("image_height")),
      // clear voice-only fields
      audio_url: null,
      duration: null,
      role_en: null,
      role_ar: null,
      company_en: null,
      company_ar: null,
    };
  }

  return {
    ...base,
    audio_url: uploadedUrl ?? str(formData.get("audio_url")),
    duration: num(formData.get("duration")),
    role_en: str(formData.get("role_en")),
    role_ar: str(formData.get("role_ar")),
    company_en: str(formData.get("company_en")),
    company_ar: str(formData.get("company_ar")),
    // clear image-only fields
    image_url: null,
    alt: null,
    image_width: null,
    image_height: null,
  };
}

export async function createMessage(
  formData: FormData,
): Promise<ChatActionResult> {
  try {
    await requireAdmin();
    const admin = getSupabaseAdmin();

    const type = str(formData.get("type")) === "image" ? "image" : "voice";
    const file = formData.get("file");
    let uploadedUrl: string | null = null;
    if (file instanceof File && file.size > 0) {
      uploadedUrl = await uploadMedia(file, type);
    }

    const row = buildRowFromForm(formData, uploadedUrl);

    if (row.type === "voice" && !row.audio_url) {
      return { success: false, message: "Upload an audio file for a voice note." };
    }
    if (row.type === "image" && !row.image_url) {
      return { success: false, message: "Upload an image for a screenshot." };
    }

    const { data: last } = await admin
      .from("chat_messages")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    const sort_order = (last?.sort_order ?? 0) + 1;

    const { error } = await admin
      .from("chat_messages")
      .insert({ ...row, sort_order });
    if (error) throw new Error(error.message);

    revalidateSurfaces();
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to add message.",
    };
  }
}

export async function updateMessage(
  formData: FormData,
): Promise<ChatActionResult> {
  try {
    await requireAdmin();
    const admin = getSupabaseAdmin();

    const id = str(formData.get("id"));
    if (!id) return { success: false, message: "Missing message id." };

    const type = str(formData.get("type")) === "image" ? "image" : "voice";
    const file = formData.get("file");
    let uploadedUrl: string | null = null;
    if (file instanceof File && file.size > 0) {
      uploadedUrl = await uploadMedia(file, type);
    }

    const row = buildRowFromForm(formData, uploadedUrl);

    const { error } = await admin
      .from("chat_messages")
      .update(row)
      .eq("id", id);
    if (error) throw new Error(error.message);

    revalidateSurfaces();
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to save message.",
    };
  }
}

export async function deleteMessage(
  formData: FormData,
): Promise<ChatActionResult> {
  try {
    await requireAdmin();
    const admin = getSupabaseAdmin();

    const id = str(formData.get("id"));
    if (!id) return { success: false, message: "Missing message id." };

    const { data: existing } = await admin
      .from("chat_messages")
      .select("audio_url, image_url")
      .eq("id", id)
      .maybeSingle();

    const { error } = await admin.from("chat_messages").delete().eq("id", id);
    if (error) throw new Error(error.message);

    await removeMediaByUrl(existing?.audio_url ?? null);
    await removeMediaByUrl(existing?.image_url ?? null);

    revalidateSurfaces();
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to delete message.",
    };
  }
}

export async function moveMessage(
  formData: FormData,
): Promise<ChatActionResult> {
  try {
    await requireAdmin();
    const admin = getSupabaseAdmin();

    const id = str(formData.get("id"));
    const direction = str(formData.get("direction"));
    if (!id || (direction !== "up" && direction !== "down")) {
      return { success: false, message: "Bad move request." };
    }

    const { data: rows, error: listError } = await admin
      .from("chat_messages")
      .select("id, sort_order")
      .order("sort_order", { ascending: true });
    if (listError) throw new Error(listError.message);

    const list = rows ?? [];
    const index = list.findIndex((r) => r.id === id);
    if (index === -1) return { success: false, message: "Message not found." };

    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= list.length) {
      return { success: true }; // already at the edge — no-op
    }

    const a = list[index];
    const b = list[swapIndex];
    const results = await Promise.all([
      admin.from("chat_messages").update({ sort_order: b.sort_order }).eq("id", a.id),
      admin.from("chat_messages").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    const failed = results.find((r) => r.error);
    if (failed?.error) throw new Error(failed.error.message);

    revalidateSurfaces();
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to reorder.",
    };
  }
}

export async function togglePublished(
  formData: FormData,
): Promise<ChatActionResult> {
  try {
    await requireAdmin();
    const admin = getSupabaseAdmin();

    const id = str(formData.get("id"));
    if (!id) return { success: false, message: "Missing message id." };

    const { data: existing, error: readError } = await admin
      .from("chat_messages")
      .select("published")
      .eq("id", id)
      .maybeSingle();
    if (readError) throw new Error(readError.message);

    const { error } = await admin
      .from("chat_messages")
      .update({ published: !existing?.published })
      .eq("id", id);
    if (error) throw new Error(error.message);

    revalidateSurfaces();
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to update.",
    };
  }
}
