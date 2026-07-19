"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronUp,
  ChevronDown,
  Pencil,
  Trash2,
  Plus,
  Play,
  Pause,
  ImageIcon,
  Maximize2,
  Eye,
  EyeOff,
  Loader2,
  X,
} from "lucide-react";
import {
  createMessage,
  updateMessage,
  deleteMessage,
  moveMessage,
  togglePublished,
} from "@/app/actions/chat-messages";

const EMPTY = {
  id: null,
  type: "voice",
  name: "",
  flag: "",
  sent_at: "",
  duration: "",
  role_en: "",
  role_ar: "",
  company_en: "",
  company_ar: "",
  audio_url: "",
  alt: "",
  image_url: "",
  image_width: "",
  image_height: "",
  published: true,
};

export default function ChatManager({ messages }) {
  const router = useRouter();
  const [editing, setEditing] = useState(null); // null | EMPTY-shaped object
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [preview, setPreview] = useState(null); // null | { src, alt }
  const [isPending, startTransition] = useTransition();

  function run(action, formData, opts = {}) {
    setError("");
    setBusyId(opts.busyId ?? null);
    startTransition(async () => {
      const res = await action(formData);
      setBusyId(null);
      if (!res?.success) {
        setError(res?.message ?? "Something went wrong.");
        return;
      }
      if (opts.closeForm) setEditing(null);
      router.refresh();
    });
  }

  function rowAction(action, fields, busyId) {
    const fd = new FormData();
    Object.entries(fields).forEach(([k, v]) => fd.append(k, String(v)));
    run(action, fd, { busyId });
  }

  return (
    <div>
      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-5 py-4 text-sm text-destructive mb-5">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between gap-4 mb-5">
        <p className="text-sm text-muted-foreground">
          {messages.length} message{messages.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={() => {
            setError("");
            setEditing({ ...EMPTY });
          }}
          className="inline-flex items-center gap-2 rounded-full bg-ink text-ink-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add message
        </button>
      </div>

      <ul className="space-y-3">
        {messages.map((m, index) => (
          <MessageRow
            key={m.id}
            m={m}
            first={index === 0}
            last={index === messages.length - 1}
            busy={busyId === m.id && isPending}
            onPreview={() =>
              setPreview({ src: m.image_url, alt: m.alt || "Screenshot" })
            }
            onMove={(direction) =>
              rowAction(moveMessage, { id: m.id, direction }, m.id)
            }
            onTogglePublished={() =>
              rowAction(togglePublished, { id: m.id }, m.id)
            }
            onEdit={() => {
              setError("");
              setEditing(rowToForm(m));
            }}
            onDelete={() => {
              if (confirm("Delete this message? This can't be undone.")) {
                rowAction(deleteMessage, { id: m.id }, m.id);
              }
            }}
          />
        ))}
      </ul>

      {messages.length === 0 && (
        <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
          No messages yet. Add your first one.
        </div>
      )}

      {editing && (
        <MessageForm
          initial={editing}
          pending={isPending}
          onCancel={() => setEditing(null)}
          onSubmit={(formData) =>
            run(editing.id ? updateMessage : createMessage, formData, {
              closeForm: true,
            })
          }
        />
      )}

      {preview && (
        <ImageLightbox
          src={preview.src}
          alt={preview.alt}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  );
}

function ImageLightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/80 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute top-4 right-4 grid place-items-center h-11 w-11 rounded-full bg-ink-foreground/10 text-ink-foreground hover:bg-ink-foreground/20 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
      {/* Plain img: screenshots have arbitrary dimensions and we want them shown
          in full without next/image's fixed-size constraints. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_30px_80px_oklch(0.23_0.01_70_/_0.4)]"
      />
    </div>
  );
}

function rowToForm(m) {
  return {
    id: m.id,
    type: m.type,
    name: m.name ?? "",
    flag: m.flag ?? "",
    sent_at: m.sent_at ?? "",
    duration: m.duration ?? "",
    role_en: m.role_en ?? "",
    role_ar: m.role_ar ?? "",
    company_en: m.company_en ?? "",
    company_ar: m.company_ar ?? "",
    audio_url: m.audio_url ?? "",
    alt: m.alt ?? "",
    image_url: m.image_url ?? "",
    image_width: m.image_width ?? "",
    image_height: m.image_height ?? "",
    published: m.published,
  };
}

function MessageRow({
  m,
  first,
  last,
  busy,
  onPreview,
  onMove,
  onTogglePublished,
  onEdit,
  onDelete,
}) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const isImage = m.type === "image";
  const hasImage = isImage && Boolean(m.image_url);
  const hasAudio = !isImage && Boolean(m.audio_url);

  function toggleAudio() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play();
    } else {
      a.pause();
    }
  }

  return (
    <li className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-3.5">
      <div className="flex flex-col">
        <button
          type="button"
          disabled={first || busy}
          onClick={() => onMove("up")}
          aria-label="Move up"
          className="grid place-items-center h-6 w-6 rounded-md text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          type="button"
          disabled={last || busy}
          onClick={() => onMove("down")}
          aria-label="Move down"
          className="grid place-items-center h-6 w-6 rounded-md text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={isImage ? onPreview : toggleAudio}
        disabled={isImage ? !hasImage : !hasAudio}
        aria-label={
          isImage
            ? "View image full screen"
            : playing
              ? "Pause voice note"
              : "Play voice note"
        }
        title={
          isImage
            ? hasImage
              ? "Click to view full screen"
              : "No image uploaded"
            : hasAudio
              ? playing
                ? "Pause"
                : "Play voice note"
              : "No audio uploaded"
        }
        className="group relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground overflow-hidden enabled:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isImage ? (
          hasImage ? (
            <>
              <Image
                src={m.image_url}
                alt=""
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/55 text-ink-foreground opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 className="w-4 h-4" />
              </span>
            </>
          ) : (
            <ImageIcon className="w-5 h-5" />
          )
        ) : playing ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 translate-x-[1px]" />
        )}
      </button>

      {hasAudio && (
        <audio
          ref={audioRef}
          src={m.audio_url}
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      )}

      <div className="min-w-0 flex-1">
        {m.type === "image" ? (
          <>
            <p className="text-sm font-medium truncate">
              {m.alt || "Screenshot"}
            </p>
            <p className="text-xs text-muted-foreground">
              Image · {m.sent_at || "—"}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium truncate">
              {m.flag} {m.name || "Voice note"}
              <span className="text-muted-foreground font-normal">
                {m.company_en ? ` · ${m.company_en}` : ""}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Voice · {m.duration ? `${m.duration}s` : "—"} · {m.sent_at || "—"}
            </p>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={onTogglePublished}
        disabled={busy}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors disabled:opacity-50 ${
          m.published
            ? "bg-accent text-accent-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {m.published ? (
          <Eye className="w-3.5 h-3.5" />
        ) : (
          <EyeOff className="w-3.5 h-3.5" />
        )}
        {m.published ? "Live" : "Hidden"}
      </button>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onEdit}
          aria-label="Edit"
          className="grid place-items-center h-9 w-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          aria-label="Delete"
          className="grid place-items-center h-9 w-9 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </li>
  );
}

function MessageForm({ initial, pending, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial);
  const fileRef = useRef(null);
  const isEdit = Boolean(initial.id);
  const isImage = form.type === "image";

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file || !isImage) return;
    // Auto-fill natural dimensions for screenshots.
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      setForm((f) => ({
        ...f,
        image_width: img.naturalWidth,
        image_height: img.naturalHeight,
      }));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("type", form.type);
    fd.append("published", form.published ? "true" : "false");
    fd.append("name", form.name);
    fd.append("flag", form.flag);
    fd.append("sent_at", form.sent_at);
    if (isImage) {
      fd.append("alt", form.alt);
      fd.append("image_url", form.image_url);
      fd.append("image_width", String(form.image_width ?? ""));
      fd.append("image_height", String(form.image_height ?? ""));
    } else {
      fd.append("duration", String(form.duration ?? ""));
      fd.append("role_en", form.role_en);
      fd.append("role_ar", form.role_ar);
      fd.append("company_en", form.company_en);
      fd.append("company_ar", form.company_ar);
      fd.append("audio_url", form.audio_url);
    }
    const file = fileRef.current?.files?.[0];
    if (file) fd.append("file", file);
    if (isEdit) fd.append("id", form.id);
    onSubmit(fd);
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/50 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onCancel}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-lg my-8 rounded-3xl border border-border bg-card p-6 md:p-7 shadow-[0_30px_80px_oklch(0.23_0.01_70_/_0.20)]"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl">
            {isEdit ? "Edit message" : "New message"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="grid place-items-center h-9 w-9 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* type toggle */}
        <div className="grid grid-cols-2 gap-2 mb-5 p-1 rounded-full bg-muted">
          {["voice", "image"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set("type", t)}
              className={`rounded-full py-2 text-sm font-semibold capitalize transition-colors ${
                form.type === t
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              {t === "voice" ? "Voice note" : "Screenshot"}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <Field label={isImage ? "Replace image" : "Replace audio"}>
            <input
              ref={fileRef}
              type="file"
              accept={isImage ? "image/*" : "audio/*"}
              onChange={onFileChange}
              className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-ink file:text-ink-foreground file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-primary file:cursor-pointer"
            />
            {isEdit && (isImage ? form.image_url : form.audio_url) ? (
              <p className="text-xs text-muted-foreground mt-1.5 truncate">
                Current: {isImage ? form.image_url : form.audio_url}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1.5">
                {isImage
                  ? "PNG/JPG screenshot. Dimensions auto-detected."
                  : "OGG/MP3/M4A audio file."}
              </p>
            )}
          </Field>

          {isImage ? (
            <>
              <Field label="Alt text (accessibility)">
                <TextInput
                  value={form.alt}
                  onChange={(v) => set("alt", v)}
                  placeholder="Client message praising the delivered website"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Time label">
                  <TextInput
                    value={form.sent_at}
                    onChange={(v) => set("sent_at", v)}
                    placeholder="5:28 PM"
                  />
                </Field>
                <Field label="Dimensions">
                  <div className="flex items-center gap-2">
                    <TextInput
                      value={form.image_width}
                      onChange={(v) => set("image_width", v)}
                      placeholder="590"
                    />
                    <span className="text-muted-foreground">×</span>
                    <TextInput
                      value={form.image_height}
                      onChange={(v) => set("image_height", v)}
                      placeholder="1280"
                    />
                  </div>
                </Field>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Name" className="col-span-2">
                  <TextInput
                    value={form.name}
                    onChange={(v) => set("name", v)}
                    placeholder="Abdullah T."
                  />
                </Field>
                <Field label="Flag">
                  <TextInput
                    value={form.flag}
                    onChange={(v) => set("flag", v)}
                    placeholder="🇸🇦"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Role (EN)">
                  <TextInput
                    value={form.role_en}
                    onChange={(v) => set("role_en", v)}
                    placeholder="Founder"
                  />
                </Field>
                <Field label="Role (AR)">
                  <TextInput
                    value={form.role_ar}
                    onChange={(v) => set("role_ar", v)}
                    placeholder="مؤسس"
                    dir="rtl"
                  />
                </Field>
                <Field label="Company (EN)">
                  <TextInput
                    value={form.company_en}
                    onChange={(v) => set("company_en", v)}
                    placeholder="TRES Specialty Coffee"
                  />
                </Field>
                <Field label="Company (AR)">
                  <TextInput
                    value={form.company_ar}
                    onChange={(v) => set("company_ar", v)}
                    placeholder="تريس للقهوة المختصة"
                    dir="rtl"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Duration (seconds)">
                  <TextInput
                    value={form.duration}
                    onChange={(v) => set("duration", v)}
                    placeholder="28"
                    inputMode="numeric"
                  />
                </Field>
                <Field label="Time label">
                  <TextInput
                    value={form.sent_at}
                    onChange={(v) => set("sent_at", v)}
                    placeholder="9:01 PM"
                  />
                </Field>
              </div>
            </>
          )}

          <label className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
              className="h-4 w-4 rounded border-border accent-[oklch(0.52_0.13_150)]"
            />
            Show on the site
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 mt-7">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 rounded-full text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 bg-ink text-ink-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary transition-colors disabled:opacity-60"
          >
            {pending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEdit ? "Save changes" : "Add message"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, ...props }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary"
      {...props}
    />
  );
}
