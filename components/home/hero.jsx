import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@/components/ui/whatsapp-icon";
import WordRotator from "./word-rotator";
import { HeroPhone } from "./hero-reel";

/* Opening scene: one dark, rounded stage inset from the screen edges. Copy
   sits in the thumb-friendly upper half; the newest film rises in a phone
   from the bottom edge (cropped on mobile, whole on desktop). */
export default function Hero({ t, newest }) {
  const h = t.hero;

  return (
    <section className="h-full p-2 sm:p-3 md:p-4">
      <div className="theme-ink hero-stage relative isolate flex h-full flex-col overflow-hidden rounded-[30px] md:grid md:grid-cols-12 md:items-center md:rounded-[36px]">
        <span aria-hidden className="hero-glow hero-glow--a" />
        <span aria-hidden className="hero-glow hero-glow--b" />

        <div className="hero-enter relative z-10 px-5 pt-6 sm:px-8 sm:pt-8 md:col-span-7 md:px-12 md:py-12 lg:px-16">
          <div className="flex items-center gap-3">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white/15">
              <Image src="/me.jpg" alt="" fill sizes="44px" className="object-cover" priority />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-[15px] font-semibold">{h.person}</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[13px] text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {h.available}
              </span>
            </span>
          </div>

          <h1 className="mt-7 md:mt-10">
            <span className="sr-only">{h.seoTitle}</span>
            <span
              aria-hidden
              className={`font-display-tight block font-serif font-semibold ${
                h.dir === "rtl"
                  ? "text-[clamp(38px,10.5vw,52px)] !leading-[1.25] md:text-[64px]"
                  : "text-[clamp(42px,11.2vw,56px)] leading-[1.02] md:text-[76px] lg:text-[86px]"
              }`}
            >
              <span className="block">{h.before}</span>
              <WordRotator words={h.words} className="text-signal" />
              <span className="block">{h.after}</span>
            </span>
          </h1>

          <p className="mt-5 max-w-[46ch] text-[15.5px] leading-relaxed text-muted-foreground md:mt-7 md:text-[17.5px]">
            {h.lead}
          </p>

          <div className="mt-6 flex items-center gap-2.5 md:mt-9">
            <Link
              href="#contact"
              className="inline-flex h-14 flex-1 items-center justify-center rounded-full bg-signal px-7 text-[16px] font-semibold text-signal-foreground shadow-[0_12px_30px_-10px_oklch(var(--signal)_/_0.6)] transition-transform duration-200 active:scale-[0.97] md:flex-none"
            >
              {h.primary}
            </Link>
            <Link
              href={h.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={h.whatsapp}
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-inset ring-white/15 backdrop-blur transition-colors hover:bg-[#25D366] active:scale-[0.97]"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </Link>
            <Link
              href="#work"
              className="hidden h-14 items-center rounded-full px-6 text-[15.5px] font-semibold ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/10 md:inline-flex"
            >
              {h.secondary}
            </Link>
          </div>
        </div>

        <div className="hero-device relative z-0 mt-8 flex flex-1 justify-center md:col-span-5 md:mt-0 md:h-full md:items-center md:py-10 [@media(max-height:640px)]:hidden md:[@media(max-height:640px)]:flex">
          <HeroPhone release={newest} reel={h.reel} />
        </div>
      </div>
    </section>
  );
}
