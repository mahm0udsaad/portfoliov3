"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  Lock,
  MessageCircle,
  Pause,
  Play,
  Send,
  Users,
  X,
} from "lucide-react";
import { voiceNotes, voiceNotesAr } from "@/lib/testimonials";

const FEEDBACK_IMAGES = [
  {
    id: "client-message-01",
    src: "/testimonials/client-message-01.png",
    width: 590,
    height: 1280,
    alt: "Arabic client message praising the delivered website",
    time: "5:28 PM",
  },
  {
    id: "client-message-02",
    src: "/testimonials/client-message-02.png",
    width: 590,
    height: 1280,
    alt: "Arabic client message praising the creativity of the delivered app",
    time: "2:37 PM",
  },
  {
    id: "client-message-03",
    src: "/testimonials/client-message-03.png",
    width: 738,
    height: 1600,
    alt: "Arabic client message thanking Mahmoud for his development mentorship",
    time: "11:11 PM",
  },
];

function formatTime(totalSeconds) {
  const seconds = Math.max(0, Math.round(totalSeconds || 0));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/* Deterministic bar heights (seeded by note id) so SSR and client render the
   same waveform without shipping audio analysis. */
function waveformBars(seed, count = 26) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const bars = [];
  for (let i = 0; i < count; i++) {
    hash = (hash * 1103515245 + 12345) >>> 0;
    bars.push(0.28 + ((hash % 1000) / 1000) * 0.72);
  }
  return bars;
}

function VoiceMessage({ note, playLabel, pauseLabel }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const bars = useMemo(() => waveformBars(note.id), [note.id]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      // Group-chat behavior: starting one note pauses every other one.
      document.querySelectorAll("audio[data-voice-note]").forEach((other) => {
        if (other !== audio) other.pause();
      });
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }

  function seek(event) {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    let ratio = (event.clientX - rect.left) / rect.width;
    if (document.documentElement.dir === "rtl") ratio = 1 - ratio;
    audio.currentTime = Math.min(Math.max(ratio, 0), 1) * audio.duration;
  }

  function onTimeUpdate() {
    const audio = audioRef.current;
    if (!audio) return;
    const duration = Number.isFinite(audio.duration)
      ? audio.duration
      : note.duration;
    setElapsed(audio.currentTime);
    setProgress(duration ? audio.currentTime / duration : 0);
  }

  return (
    <div className="w-[240px] max-w-[82%] rounded-[var(--radius-lg)] rounded-ss-[5px] border border-border bg-card px-3 pb-2 pt-2.5 shadow-[0_6px_20px_oklch(0.23_0.01_70_/_0.08)] sm:w-[280px]">
      <p className="flex min-w-0 items-baseline gap-1.5 text-[11px] leading-tight">
        <span aria-hidden>{note.flag}</span>
        <span className="select-none font-semibold blur-[3px]" aria-hidden>
          {note.name}
        </span>
        <span className="truncate text-[10px] text-muted-foreground">
          {note.role} · {note.company}
        </span>
      </p>

      <div className="mt-2 flex items-center gap-2.5">
        <button
          type="button"
          onClick={toggle}
          aria-label={`${playing ? pauseLabel : playLabel} — ${note.role}, ${note.company}`}
          className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-[var(--radius-full)] bg-primary text-primary-foreground transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          {playing ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 translate-x-[1px] rtl:-scale-x-100" />
          )}
        </button>

        <div
          className="flex h-9 flex-1 cursor-pointer items-center gap-[2.5px]"
          onClick={seek}
          aria-hidden
        >
          {bars.map((height, index) => (
            <span
              key={index}
              className={`w-[3px] rounded-[var(--radius-full)] transition-colors ${
                index / bars.length <= progress && progress > 0
                  ? "bg-primary"
                  : "bg-muted-foreground/30"
              }`}
              style={{ height: `${Math.round(height * 100)}%` }}
            />
          ))}
        </div>

        <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground">
          {playing || elapsed > 0
            ? formatTime(elapsed)
            : formatTime(note.duration)}
        </span>
      </div>

      <time className="mt-1 block text-end font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
        {note.sentAt}
      </time>

      <audio
        ref={audioRef}
        data-voice-note
        src={note.audioUrl}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
          setElapsed(0);
        }}
      />
    </div>
  );
}

function ImageMessage({ message, label, onOpen, viewLabel }) {
  return (
    <figure className="w-[168px] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card p-1.5 shadow-[0_8px_28px_oklch(0.23_0.01_70_/_0.10)] sm:w-[190px]">
      <button
        type="button"
        onClick={() => onOpen(message)}
        aria-label={`${viewLabel} — ${message.alt}`}
        className="block w-full cursor-zoom-in rounded-[calc(var(--radius-lg)-5px)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        <Image
          src={message.src}
          alt={message.alt}
          width={message.width}
          height={message.height}
          sizes="(max-width: 640px) 168px, 190px"
          className="h-auto w-full rounded-[calc(var(--radius-lg)-5px)]"
        />
      </button>
      <figcaption className="flex items-center justify-between gap-3 px-1.5 pb-1 pt-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
        <span>{label}</span>
        <time>{message.time}</time>
      </figcaption>
    </figure>
  );
}

function TextMessage({ children, time }) {
  return (
    <div className="max-w-[78%] rounded-[var(--radius-lg)] rounded-se-[5px] bg-ink px-4 py-3 text-ink-foreground shadow-[0_6px_20px_oklch(0.23_0.01_70_/_0.10)] sm:max-w-[68%]">
      <p className="text-[13px] leading-relaxed sm:text-[14px]">{children}</p>
      <time className="mt-1.5 block text-end font-mono text-[9px] uppercase tracking-[0.08em] text-ink-foreground/65">
        {time}
      </time>
    </div>
  );
}

function Lightbox({ image, onClose, closeLabel }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Portal to <body>: the chat layer is transformed by GSAP, which would
  // otherwise trap position:fixed inside the pinned viewport.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/85 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute end-4 top-4 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-[var(--radius-full)] bg-ink-foreground/15 text-ink-foreground transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        <X className="h-5 w-5" />
      </button>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 640px) 92vw, 60vh"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[86svh] w-auto rounded-[var(--radius-lg)] shadow-2xl"
      />
    </div>,
    document.body,
  );
}

export default function ClientChat({ locale = "en", labels = {} }) {
  const text = {
    eyebrow: "Live client feedback",
    heading: "Work that gets",
    headingEm: "talked about.",
    chatTitle: "After launch",
    chatMeta: "Real reactions · shared with permission",
    today: "Recent messages",
    imageLabel: "Client message",
    viewImage: "View full size",
    close: "Close",
    play: "Play voice note",
    pause: "Pause voice note",
    loadMore: "Load more messages",
    inputHint: "Type a message…",
    sendLabel: "Send message",
    footer: "Private by default. Your message stays in this demo.",
    now: "Now",
    ...labels,
  };

  const notes = locale === "ar" ? voiceNotesAr : voiceNotes;

  const [draft, setDraft] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const threadRef = useRef(null);

  /* The opening story is 6 real messages: three voice notes interleaved with
     the three screenshot bubbles. Everything else waits behind "load more". */
  const storyNotes = notes.slice(0, 3);
  const extraNotes = notes.slice(3);
  const storyMessages = [];
  for (let i = 0; i < 3; i++) {
    if (storyNotes[i]) storyMessages.push({ kind: "voice", note: storyNotes[i] });
    storyMessages.push({ kind: "image", image: FEEDBACK_IMAGES[i] });
  }

  function loadMore() {
    setExpanded(true);
    window.requestAnimationFrame(() => {
      // ScrollTrigger listens for resize — the pin math must re-measure the
      // now-taller thread.
      window.dispatchEvent(new Event("resize"));
      threadRef.current?.scrollBy({ top: 120, behavior: "smooth" });
    });
  }

  function sendMessage(event) {
    event.preventDefault();
    const message = draft.trim();
    if (!message) return;

    setSentMessages((current) => [
      ...current,
      {
        id: `local-${Date.now()}`,
        text: message,
        time: text.now,
      },
    ]);
    setDraft("");

    window.requestAnimationFrame(() => {
      threadRef.current?.scrollTo({
        top: threadRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }

  return (
    <section
      id="testimonials"
      className="relative h-full overflow-hidden border-y border-border bg-muted/40 px-4 sm:px-6 md:px-14"
    >
      <div className="relative mx-auto flex h-full max-w-[860px] flex-col justify-center pb-5 pt-20 md:py-8">
        <div data-chat-intro className="mb-4 shrink-0 text-center md:mb-5">
          <div className="mb-3 inline-flex items-center gap-2 rounded-[var(--radius-full)] border border-primary/25 bg-background px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary md:text-[12px]">
            <span className="h-2 w-2 rounded-[var(--radius-full)] bg-primary" />
            {text.eyebrow}
          </div>
          <h2 className="font-serif text-[28px] font-normal leading-[1.04] tracking-tight sm:text-[34px] md:text-[42px]">
            {text.heading} <em className="text-primary">{text.headingEm}</em>
          </h2>
        </div>

        <div className="mx-auto h-[min(61svh,540px)] min-h-[390px] w-full max-w-[760px] shrink-0">
          <div
            data-chat-shell
            className="flex h-full min-h-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[0_24px_70px_oklch(0.23_0.01_70_/_0.14)]"
          >
            <div className="flex shrink-0 items-center gap-3 bg-ink px-4 py-3 text-ink-foreground sm:px-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-full)] bg-primary text-primary-foreground">
                <Users className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold leading-tight sm:text-[14.5px]">
                  {text.chatTitle}
                </p>
                <p className="mt-1 flex items-center gap-1.5 truncate text-[10.5px] leading-tight text-ink-foreground/70 sm:text-[11.5px]">
                  <span className="h-1.5 w-1.5 rounded-[var(--radius-full)] bg-primary" />
                  {text.chatMeta}
                </p>
              </div>
              <MessageCircle className="h-5 w-5 text-ink-foreground/65" />
            </div>

            <div
              ref={threadRef}
              data-chat-thread
              aria-live="polite"
              className={`chat-thread min-h-0 flex-1 space-y-3 bg-background px-3 py-4 sm:px-5 ${
                expanded ? "overflow-y-auto" : "overflow-hidden"
              }`}
            >
              <div className="sticky top-0 z-10 mx-auto w-fit rounded-[var(--radius-full)] border border-border bg-card px-3 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground shadow-sm">
                {text.today}
              </div>

              {storyMessages.map((message, index) => (
                <div
                  key={message.note?.id ?? message.image.id}
                  data-chat-message
                  data-side={index % 2 ? "right" : "left"}
                  className="flex w-full justify-start"
                >
                  {message.kind === "voice" ? (
                    <VoiceMessage
                      note={message.note}
                      playLabel={text.play}
                      pauseLabel={text.pause}
                    />
                  ) : (
                    <ImageMessage
                      message={message.image}
                      label={text.imageLabel}
                      viewLabel={text.viewImage}
                      onOpen={setLightboxImage}
                    />
                  )}
                </div>
              ))}

              {expanded &&
                extraNotes.map((note) => (
                  <div key={note.id} className="flex w-full justify-start">
                    <VoiceMessage
                      note={note}
                      playLabel={text.play}
                      pauseLabel={text.pause}
                    />
                  </div>
                ))}

              {!expanded && extraNotes.length > 0 && (
                <div className="flex w-full justify-center pt-1">
                  <button
                    type="button"
                    onClick={loadMore}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-[var(--radius-full)] border border-primary/30 bg-card px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                    {text.loadMore} ({extraNotes.length})
                  </button>
                </div>
              )}

              {sentMessages.map((message) => (
                <div key={message.id} className="flex w-full justify-end">
                  <TextMessage time={message.time}>{message.text}</TextMessage>
                </div>
              ))}
            </div>

            <form
              data-chat-composer
              onSubmit={sendMessage}
              className="flex shrink-0 items-center gap-2 border-t border-border bg-card px-3 py-2.5 sm:px-4"
            >
              <label htmlFor="portfolio-chat-message" className="sr-only">
                {text.inputHint}
              </label>
              <input
                id="portfolio-chat-message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={text.inputHint}
                autoComplete="off"
                className="h-10 min-w-0 flex-1 rounded-[var(--radius-full)] border border-border bg-muted/60 px-4 text-[12px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-background sm:text-[13px]"
              />
              <button
                type="submit"
                aria-label={text.sendLabel}
                disabled={!draft.trim()}
                className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-[var(--radius-full)] bg-ink text-ink-foreground transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
              >
                <Send className="h-4 w-4 rtl:-scale-x-100" />
              </button>
            </form>
          </div>
        </div>

        <p className="mt-2.5 flex shrink-0 items-center justify-center gap-1.5 text-center text-[10px] text-muted-foreground sm:text-[11px]">
          <Lock className="h-3.5 w-3.5 shrink-0 text-primary/70" />
          {text.footer}
        </p>
      </div>

      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
          closeLabel={text.close}
        />
      )}
    </section>
  );
}
