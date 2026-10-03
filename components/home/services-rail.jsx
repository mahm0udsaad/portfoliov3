"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Globe, MessageSquare, ShoppingCart, Smartphone } from "lucide-react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap-client";

const ICONS = { web: Globe, mobile: Smartphone, whatsapp: MessageSquare, ecommerce: ShoppingCart };

/* "What I can build": the section pins and vertical scrolling drives the
   cards sideways, with a progress line and live counter. Without JS or with
   reduced motion it is a plain swipeable row with scroll-snap. */
export default function ServicesRail({ title, lead, items, end, isAr }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    let ctx;
    let cancelled = false;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const track = root.querySelector("[data-rail-track]");
      const fill = root.querySelector("[data-rail-fill]");
      const counter = root.querySelector("[data-rail-count]");
      const cards = gsap.utils.toArray("[data-rail-card]", root);
      const rtl = getComputedStyle(root).direction === "rtl";
      const dir = rtl ? 1 : -1;
      root.classList.add("is-pinned");

      ctx = gsap.context(() => {
        const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
        const tween = gsap.to(track, {
          x: () => dir * distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: () => `top ${document.querySelector("header")?.offsetHeight ?? 69}px`,
            end: () => `+=${distance()}`,
            pin: true,
            pinSpacer: root.parentElement, // stable wrapper, no re-parenting
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: ({ progress }) => {
              fill.style.transform = `scaleX(${progress})`;
              const n = Math.min(cards.length, Math.floor(progress * (cards.length - 0.001)) + 1);
              if (counter.textContent !== String(n).padStart(2, "0")) {
                counter.textContent = String(n).padStart(2, "0");
              }
            },
          },
        });

        // Each card's artwork drifts against the travel, and cards lift to
        // full size as they reach the middle of the screen.
        cards.forEach((card) => {
          const art = card.querySelector("[data-rail-art]");
          if (art) {
            gsap.fromTo(
              art,
              { xPercent: dir * -12 },
              {
                xPercent: dir * 12,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tween,
                  start: rtl ? "right left" : "left right",
                  end: rtl ? "left right" : "right left",
                  scrub: true,
                },
              },
            );
          }
          gsap.fromTo(
            card,
            { scale: 0.92, autoAlpha: 0.55 },
            {
              scale: 1,
              autoAlpha: 1,
              ease: "power1.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: rtl ? "right 10%" : "left 90%",
                end: "center center",
                scrub: true,
              },
            },
          );
        });
      }, root);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      root.classList.remove("is-pinned");
    };
  }, []);

  const total = items.length + 1;

  return (
    <div>
    <section ref={rootRef} id="services" className="services-rail relative flex flex-col overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1180px] items-end justify-between gap-6 px-4 sm:px-6 md:px-10 xl:px-0">
        <div className="max-w-[620px]">
          <h2 className={`font-display-tight font-serif font-semibold tracking-tight ${isAr ? "text-[30px] md:text-[42px]" : "text-[34px] leading-[1.05] md:text-[52px]"}`}>
            {title}
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground md:mt-4 md:text-[17px]">{lead}</p>
        </div>
        <div className="hidden shrink-0 items-baseline gap-1 font-serif font-semibold tabular-nums sm:flex" dir="ltr">
          <span data-rail-count className="text-[34px] leading-none">01</span>
          <span className="text-[16px] text-muted-foreground">/ {String(total).padStart(2, "0")}</span>
        </div>
      </div>

      <div
        data-rail-track
        className="services-rail__track hide-scrollbar mt-7 flex gap-4 overflow-x-auto px-4 pb-2 sm:px-6 md:mt-10 md:gap-6 md:px-10 xl:px-[max(2.5rem,calc((100vw-1180px)/2))]"
      >
        {items.map((s) => {
          const Icon = ICONS[s.iconKey] ?? Globe;
          return (
            <article
              key={s.title}
              data-rail-card
              className="services-rail__card relative flex shrink-0 snap-center flex-col overflow-hidden rounded-[28px] border border-border bg-card"
            >
              <div className="relative h-[42%] min-h-[150px] overflow-hidden bg-muted">
                <div data-rail-art className="absolute inset-[-12%]">
                  <Image src={s.visual} alt="" fill sizes="(max-width: 768px) 84vw, 420px" className="object-cover" />
                </div>
                <span className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                <span className="absolute start-5 top-5 grid h-11 w-11 place-items-center rounded-2xl bg-card/90 text-primary shadow-sm backdrop-blur">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 pt-3 md:p-7 md:pt-4">
                <h3 className="font-serif text-[24px] font-semibold leading-tight md:text-[26px]">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{s.description}</p>
                <ul className="mt-auto space-y-2 pt-5 text-[14.5px]">
                  {s.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}

        <article
          data-rail-card
          className="services-rail__card theme-ink relative flex shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[28px] p-7 md:p-9"
        >
          <span aria-hidden className="hero-glow hero-glow--a" />
          <p className="font-display-tight relative font-serif text-[30px] font-semibold leading-[1.1] md:text-[36px]">{end.title}</p>
          <div className="relative">
            <p className="mb-6 text-[15.5px] leading-relaxed text-muted-foreground">{end.body}</p>
            <Link
              href="#contact"
              className="inline-flex h-14 w-full items-center justify-center rounded-full bg-signal px-7 text-[16px] font-semibold text-signal-foreground transition-transform active:scale-[0.97]"
            >
              {end.cta}
            </Link>
          </div>
        </article>
      </div>

      <div className="mx-auto mt-6 w-full max-w-[1180px] px-4 sm:px-6 md:mt-8 md:px-10 xl:px-0">
        <div className="h-[3px] overflow-hidden rounded-full bg-border">
          <span data-rail-fill className="block h-full origin-left scale-x-0 rounded-full bg-primary rtl:origin-right" />
        </div>
      </div>
    </section>
    </div>
  );
}
