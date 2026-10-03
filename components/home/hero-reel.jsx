"use client";

import Image from "next/image";
import Link from "next/link";
import { useInViewPreview } from "./use-inview-preview";

/* The newest launch film looping silently in a phone frame. On mobile only
   the top of the phone shows, rising from the hero's bottom edge; on desktop
   the whole device stands beside the copy. Tapping jumps to the films. */
export function HeroPhone({ release, reel }) {
  const videoRef = useInViewPreview(release.previewUrl);

  return (
    <Link
      href={reel.href}
      aria-label={`${reel.tag}: ${reel.title}. ${reel.cta}`}
      className="group relative block w-[68%] max-w-[300px] self-start md:w-[min(100%,calc((100svh-200px)*0.5625))] md:self-center"
    >
      <div className="device transition-transform duration-500 ease-out group-hover:-translate-y-2">
        <div className="device__screen">
          <Image src={release.poster} alt="" fill sizes="300px" className="object-cover" priority />
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-x-3 top-3 flex items-center gap-2 rounded-full bg-black/45 py-1.5 pe-3 ps-1.5 text-[12.5px] font-semibold text-white backdrop-blur-md">
            <span className="signal-pulse rounded-full bg-signal px-2 py-0.5 text-[11px] font-bold text-signal-foreground">
              {reel.tag}
            </span>
            <span className="truncate">{reel.title}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
