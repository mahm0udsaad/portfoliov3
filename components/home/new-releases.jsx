"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, VolumeX } from "lucide-react";
import { useInViewPreview } from "./use-inview-preview";

/* "Just released": the newest films, tagged New. Each card loops a tiny
   silent preview while visible; a tap swaps in the full film with controls
   (and sound, since the play happens inside the tap gesture). */
export default function NewReleases({ releases, labels }) {
  return (
    <ul className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0">
      {releases.map((release) => (
        <li key={release.id} className="w-[78%] shrink-0 snap-center sm:w-auto">
          <ReleaseCard release={release} labels={labels} />
        </li>
      ))}
    </ul>
  );
}

function ReleaseCard({ release, labels }) {
  const [playing, setPlaying] = useState(false);
  const previewRef = useInViewPreview(release.previewUrl, { enabled: !playing });

  return (
    <figure>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[26px] bg-ink ring-1 ring-inset ring-white/10 shadow-[0_30px_60px_-24px_oklch(var(--shadow)_/_0.7)]">
        {playing ? (
          <video
            ref={(el) => {
              if (el) el.play().catch(() => {});
            }}
            src={release.videoUrl}
            poster={release.poster}
            controls
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${labels.play}: ${release.title}`}
            className="group absolute inset-0 cursor-pointer"
          >
            <Image
              src={release.poster}
              alt={release.title}
              fill
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 300px"
              className="object-cover"
            />
            <video
              ref={previewRef}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <span className="absolute bottom-4 start-4 flex h-14 w-14 items-center justify-center rounded-full bg-signal text-signal-foreground shadow-lg transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
              <Play className="h-6 w-6 translate-x-0.5 fill-current rtl:-translate-x-0.5" />
            </span>
          </button>
        )}
        <span className="signal-pulse pointer-events-none absolute start-4 top-4 rounded-full bg-signal px-3 py-1 text-[12px] font-bold text-signal-foreground">
          {labels.newTag}
        </span>
        {!release.hasAudio && !playing ? (
          <span
            title={labels.soundOff}
            className="pointer-events-none absolute end-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm"
          >
            <VolumeX className="h-4 w-4" aria-hidden />
            <span className="sr-only">{labels.soundOff}</span>
          </span>
        ) : null}
      </div>
      <figcaption className="mt-4">
        <h4 className="font-serif text-[20px] font-semibold leading-tight">{release.title}</h4>
        <p className="mt-1.5 max-w-[42ch] text-[14.5px] leading-relaxed text-muted-foreground">
          {release.caption}
        </p>
      </figcaption>
    </figure>
  );
}
