"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function HeroVideos({ clips }) {
  // Only clips the user has clicked get a <video> element (and thus load bytes).
  const [active, setActive] = useState(() => new Set());

  function activate(i) {
    setActive((prev) => new Set(prev).add(i));
  }

  return (
    <>
      <div className="mt-16 flex items-end justify-center gap-3 sm:gap-6">
        {clips.map((clip, i) => {
          const isActive = active.has(i);
          return (
            <button
              key={clip.videoUrl}
              type="button"
              onClick={() => activate(i)}
              aria-label="Play sample video"
              className={`group relative aspect-[9/16] w-1/3 max-w-[210px] overflow-hidden rounded-[22px] border border-border bg-ink shadow-[0_20px_50px_oklch(0.23_0.01_70_/_0.12)] transition-transform ${
                i === 1 ? "sm:-translate-y-8 sm:scale-[1.06] z-10" : ""
              } ${isActive ? "cursor-default" : "cursor-pointer"}`}
            >
              {isActive ? (
                <video
                  // Callback ref plays within the click gesture, so sound is allowed.
                  ref={(el) => {
                    if (el) el.play().catch(() => {});
                  }}
                  src={clip.videoUrl}
                  poster={clip.poster}
                  playsInline
                  controls
                  loop
                  preload="none"
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <Image
                    src={clip.poster}
                    alt="Course sample video"
                    fill
                    sizes="210px"
                    className="object-cover"
                  />
                  {/* Dim + play button overlay */}
                  <span className="absolute inset-0 bg-ink/25 group-hover:bg-ink/10 transition-colors" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-background/90 text-ink shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 translate-x-0.5 fill-current" />
                    </span>
                  </span>
                </>
              )}
              <span className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/10" />
            </button>
          );
        })}
      </div>
      <p className="mt-6 text-[13.5px] text-muted-foreground">
        ▶ Tap to watch — real vertical videos made with the exact AI workflow
        you&apos;ll learn.
      </p>
    </>
  );
}
