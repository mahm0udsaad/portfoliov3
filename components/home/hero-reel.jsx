"use client";

import Image from "next/image";
import Link from "next/link";
import { useInViewPreview } from "./use-inview-preview";

/* Desktop hero: the newest launch film loops silently inside a phone frame.
   On mobile the frame is display:none, so the preview never loads there —
   the compact chip below the CTAs points to the films section instead. */
export function HeroReel({ release, reel }) {
  const videoRef = useInViewPreview(release.previewUrl);

  return (
    <Link
      href={reel.href}
      aria-label={`${reel.label}: ${reel.title}. ${reel.cta}`}
      className="group relative mx-auto block w-[min(100%,calc((100svh-260px)*0.5625+20px))] max-w-[330px]"
    >
      <div className="device transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:rotate-[-1deg] rtl:group-hover:rotate-[1deg]">
        <div className="device__screen">
          <Image
            src={release.poster}
            alt=""
            fill
            sizes="330px"
            className="object-cover"
          />
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={release.poster}
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <span className="signal-pulse absolute -top-3 end-6 rounded-full bg-signal px-3 py-1 text-[12px] font-bold text-signal-foreground">
        {reel.tag}
      </span>
      <span className="mt-4 flex items-baseline justify-center gap-2 text-[13.5px]">
        <span className="text-muted-foreground">{reel.label}</span>
        <span className="font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors group-hover:decoration-primary">
          {reel.title}
        </span>
      </span>
    </Link>
  );
}

export function HeroReelChip({ release, reel }) {
  return (
    <Link
      href={reel.href}
      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-2 pe-4 text-start shadow-[0_10px_30px_oklch(var(--shadow)_/_0.08)] transition-colors active:bg-accent"
    >
      <span className="relative h-12 w-[27px] shrink-0 overflow-hidden rounded-md bg-ink">
        <Image src={release.poster} alt="" fill sizes="27px" className="object-cover" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] text-muted-foreground">{reel.label}</span>
        <span className="block truncate text-[14px] font-semibold">{reel.title}</span>
      </span>
      <span className="signal-pulse shrink-0 rounded-full bg-signal px-2.5 py-0.5 text-[11px] font-bold text-signal-foreground">
        {reel.tag}
      </span>
    </Link>
  );
}
