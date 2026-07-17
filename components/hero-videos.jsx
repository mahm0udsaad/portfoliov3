"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function HeroVideos({ clips, watchHint }) {
  // Only clips the user has clicked get a <video> element (and thus load bytes).
  const [active, setActive] = useState(() => new Set());
  const [slide, setSlide] = useState(0);
  const trackRef = useRef(null);

  function activate(i) {
    setActive((prev) => new Set(prev).add(i));
  }

  /* One "step" is the distance between snap points: total scrollable range
     divided across the gaps. scrollLeft is negative in RTL, so use magnitude. */
  function slideStep(track) {
    return (track.scrollWidth - track.clientWidth) / (clips.length - 1);
  }

  function onTrackScroll() {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(Math.abs(track.scrollLeft) / slideStep(track));
    setSlide(Math.min(clips.length - 1, Math.max(0, index)));
  }

  function scrollToSlide(i) {
    const track = trackRef.current;
    if (!track) return;
    const dir = getComputedStyle(track).direction === "rtl" ? -1 : 1;
    track.scrollTo({ left: dir * slideStep(track) * i, behavior: "smooth" });
  }

  return (
    <>
      {/* Mobile: one video fills ~80% of the screen, swipe for the rest.
          Desktop keeps the original three-up row. */}
      <div
        ref={trackRef}
        onScroll={onTrackScroll}
        className="hide-scrollbar mt-10 -mx-6 flex snap-x snap-mandatory items-end gap-4 overflow-x-auto px-[10%] pb-2 md:mx-0 md:mt-16 md:snap-none md:justify-center md:gap-6 md:overflow-visible md:px-0"
      >
        {clips.map((clip, i) => {
          const isActive = active.has(i);
          return (
            <button
              key={clip.videoUrl}
              type="button"
              onClick={() => activate(i)}
              aria-label="Play sample video"
              className={`group relative aspect-[9/16] w-[80%] max-w-[360px] shrink-0 snap-center overflow-hidden rounded-[22px] border border-border bg-ink shadow-[0_20px_50px_oklch(0.23_0.01_70_/_0.12)] transition-transform md:w-1/3 md:max-w-[210px] ${
                i === 1 ? "md:-translate-y-8 md:scale-[1.06] z-10" : ""
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
                    sizes="(max-width: 768px) 80vw, 210px"
                    className="object-cover"
                  />
                  {/* Dim + play button overlay */}
                  <span className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/10" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background/90 text-ink shadow-lg transition-transform group-hover:scale-110">
                      <Play className="h-6 w-6 translate-x-0.5 fill-current rtl:-translate-x-0.5" />
                    </span>
                  </span>
                </>
              )}
              <span className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/10" />
            </button>
          );
        })}
      </div>

      {/* Slide dots — mobile only */}
      <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
        {clips.map((clip, i) => (
          <button
            key={clip.videoUrl}
            type="button"
            aria-label={`Go to video ${i + 1}`}
            aria-current={slide === i}
            onClick={() => scrollToSlide(i)}
            className="grid h-8 w-8 place-items-center"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                slide === i ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
            />
          </button>
        ))}
      </div>

      <p className="mt-4 text-[13.5px] text-muted-foreground md:mt-6">
        {watchHint ??
          "▶ Tap to watch — real vertical videos made with the exact AI workflow you'll learn."}
      </p>
    </>
  );
}
