"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Check, Eye, EyeOff, GripVertical, Loader2 } from "lucide-react";
import { saveProjectOrder } from "@/app/actions/project-order";

/* Reorder homepage projects: drag the grip on desktop, or use the arrows on
   a phone (HTML5 drag-and-drop doesn't fire on touch). Every change saves on
   its own after a short pause, so rapid arrow taps become one write. */
export default function ProjectManager({ projects, categories }) {
  const router = useRouter();
  const [items, setItems] = useState(projects);
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error
  const [error, setError] = useState("");
  const [draggingId, setDraggingId] = useState(null);
  const dragIndex = useRef(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const saveTimer = useRef(null);

  useEffect(() => () => clearTimeout(saveTimer.current), []);

  function queueSave(next) {
    setItems(next);
    setStatus("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const latest = itemsRef.current;
      const fd = new FormData();
      fd.append("ids", latest.map((p) => p.id).join(","));
      fd.append("hidden", latest.filter((p) => !p.published).map((p) => p.id).join(","));
      if (categories) fd.append("categories", latest.map((p) => `${p.id}:${p.category}`).join(","));
      const res = await saveProjectOrder(fd);
      if (res?.success) {
        setError("");
        setStatus("saved");
        router.refresh();
      } else {
        setError(res?.message ?? "Couldn't save. Try again.");
        setStatus("error");
      }
    }, 500);
  }

  function move(from, to) {
    if (to < 0 || to >= itemsRef.current.length || from === to) return;
    const next = [...itemsRef.current];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next;
  }

  function toggle(id) {
    queueSave(itemsRef.current.map((p) => (p.id === id ? { ...p, published: !p.published } : p)));
  }

  function setCategory(id, category) {
    queueSave(itemsRef.current.map((p) => (p.id === id ? { ...p, category } : p)));
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {items.filter((p) => p.published).length} of {items.length} shown.
        </p>
        <SaveStatus status={status} />
      </div>

      {error ? (
        <div className="mb-5 rounded-2xl border border-destructive/30 bg-destructive/10 px-5 py-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <ol className="space-y-3">
        {items.map((p, index) => (
          <li key={p.id}>
            <Row
              p={p}
              index={index}
              total={items.length}
              categories={categories}
              onCategory={(c) => setCategory(p.id, c)}
              dragging={draggingId === p.id}
              onDragStart={() => {
                dragIndex.current = index;
                setDraggingId(p.id);
              }}
              onDragEnter={() => {
                const from = dragIndex.current;
                if (from === null || from === index) return;
                const next = move(from, index);
                if (next) setItems(next);
                dragIndex.current = index;
              }}
              onDragEnd={() => {
                dragIndex.current = null;
                setDraggingId(null);
                queueSave(itemsRef.current);
              }}
              onUp={() => {
                const next = move(index, index - 1);
                if (next) queueSave(next);
              }}
              onDown={() => {
                const next = move(index, index + 1);
                if (next) queueSave(next);
              }}
              onToggle={() => toggle(p.id)}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

function Row({ p, index, total, categories, onCategory, dragging, onDragStart, onDragEnter, onDragEnd, onUp, onDown, onToggle }) {
  const [dragOn, setDragOn] = useState(false);

  return (
    <div
      draggable={dragOn}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={() => {
        setDragOn(false);
        onDragEnd();
      }}
      className={`flex items-center gap-3 rounded-2xl border bg-card px-3 py-3 transition-[opacity,box-shadow] sm:gap-4 sm:px-4 ${
        dragging ? "border-primary/60 opacity-60 shadow-lg" : "border-border"
      } ${p.published ? "" : "opacity-55"}`}
    >
      <button
        type="button"
        aria-label="Drag to reorder"
        title="Drag to reorder"
        onMouseDown={() => setDragOn(true)}
        onMouseUp={() => setDragOn(false)}
        className="hidden h-9 w-6 shrink-0 cursor-grab place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:cursor-grabbing sm:grid"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <span className="w-6 shrink-0 text-center text-sm font-semibold tabular-nums text-muted-foreground">
        {index + 1}
      </span>

      <span className="relative h-12 w-[76px] shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image src={p.image} alt="" fill sizes="76px" className="object-cover object-top" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold">{p.title}</span>
        {categories ? (
          <select
            value={p.category}
            onChange={(e) => onCategory(e.target.value)}
            aria-label={`Tab for ${p.title}`}
            className="mt-1 h-8 rounded-lg border border-border bg-background px-2 text-[13px] text-muted-foreground"
          >
            {categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        ) : (
          <span className="block truncate text-[13px] text-muted-foreground">{p.published ? "Shown" : "Hidden"}</span>
        )}
      </span>

      <span className="flex shrink-0 items-center gap-1">
        <IconButton label="Move up" onClick={onUp} disabled={index === 0}>
          <ArrowUp className="h-4 w-4" />
        </IconButton>
        <IconButton label="Move down" onClick={onDown} disabled={index === total - 1}>
          <ArrowDown className="h-4 w-4" />
        </IconButton>
        <IconButton label={p.published ? "Hide from homepage" : "Show on homepage"} onClick={onToggle}>
          {p.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </IconButton>
      </span>
    </div>
  );
}

function IconButton({ label, onClick, disabled, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function SaveStatus({ status }) {
  if (status === "saving") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Saving…
      </span>
    );
  }
  if (status === "saved") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-emerald-600">
        <Check className="h-4 w-4" /> Saved
      </span>
    );
  }
  return null;
}
