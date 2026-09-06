"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

/* Wide (16:9) hero player for the showreel. Like HeroVideos, the <video>
   element only mounts after a click, so the page never downloads the file
   for visitors who don't watch. */
export default function VideoFeature({ videoUrl, poster, title, caption, playLabel }) {
  const [active, setActive] = useState(false);

  return (
    <figure className="mx-auto max-w-[860px]">
      <button
        type="button"
        onClick={() => setActive(true)}
        aria-label={playLabel ?? `Play ${title}`}
        className={`group relative block aspect-video w-full overflow-hidden rounded-[22px] border border-border bg-ink shadow-[0_20px_50px_oklch(0.23_0.01_70_/_0.14)] ${
          active ? "cursor-default" : "cursor-pointer"
        }`}
      >
        {active ? (
          <video
            // Callback ref plays within the click gesture, so sound is allowed.
            ref={(el) => {
              if (el) el.play().catch(() => {});
            }}
            src={videoUrl}
            poster={poster}
            playsInline
            controls
            preload="none"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <Image
              src={poster}
              alt={title}
              fill
              sizes="(max-width: 768px) 92vw, 860px"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/10" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/90 text-ink shadow-lg transition-transform group-hover:scale-110">
                <Play className="h-7 w-7 translate-x-0.5 fill-current rtl:-translate-x-0.5" />
              </span>
            </span>
          </>
        )}
        <span className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/10" />
      </button>
      {caption ? (
        <figcaption className="mt-3 text-[13.5px] text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
