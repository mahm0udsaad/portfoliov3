#!/usr/bin/env node
/**
 * Upload a consented client voice note to Supabase storage.
 *
 *   node scripts/upload-voice-notes.mjs "~/Downloads/WhatsApp Audio ....ogg" tres-founder
 *
 * Only run this for notes where the client has explicitly agreed to have their
 * voice published. Prints the public URL to paste into lib/testimonials.js.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 * (the service key is needed to create the bucket / write to it).
 */

import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { basename, extname } from "node:path";

const BUCKET = "testimonials";

const [, , filePath, slug] = process.argv;

if (!filePath || !slug) {
  console.error(
    "Usage: node scripts/upload-voice-notes.mjs <audio-file> <slug>\n" +
      "  e.g. node scripts/upload-voice-notes.mjs ~/Downloads/note.ogg tres-founder",
  );
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing env. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local,\n" +
      "then run with:  node --env-file=.env.local scripts/upload-voice-notes.mjs ...",
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

const CONTENT_TYPES = {
  ".ogg": "audio/ogg",
  ".opus": "audio/ogg",
  ".m4a": "audio/mp4",
  ".aac": "audio/aac",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
};

const ext = extname(filePath).toLowerCase();
const contentType = CONTENT_TYPES[ext];

if (!contentType) {
  console.error(`Unsupported audio type "${ext}". Supported: ${Object.keys(CONTENT_TYPES).join(", ")}`);
  process.exit(1);
}

// Ensure the bucket exists and is public (the notes are meant to be heard).
const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
if (listErr) {
  console.error("Could not list buckets:", listErr.message);
  process.exit(1);
}

if (!buckets.some((b) => b.name === BUCKET)) {
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    allowedMimeTypes: Object.values(CONTENT_TYPES),
    fileSizeLimit: "10MB",
  });
  if (error) {
    console.error("Could not create bucket:", error.message);
    process.exit(1);
  }
  console.log(`Created public bucket "${BUCKET}".`);
}

const body = await readFile(filePath.replace(/^~/, process.env.HOME));
const objectPath = `${slug}${ext}`;

const { error: upErr } = await supabase.storage
  .from(BUCKET)
  .upload(objectPath, body, { contentType, upsert: true });

if (upErr) {
  console.error("Upload failed:", upErr.message);
  process.exit(1);
}

const {
  data: { publicUrl },
} = supabase.storage.from(BUCKET).getPublicUrl(objectPath);

console.log(`\nUploaded ${basename(filePath)} → ${BUCKET}/${objectPath}`);
console.log(`\nPaste into lib/testimonials.js:\n  audioUrl: "${publicUrl}",\n`);
