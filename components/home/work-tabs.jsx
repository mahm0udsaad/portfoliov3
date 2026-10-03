"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import TechBadge from "@/components/ui/techBadge";
import { Lightbox } from "@/components/design-gallery";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap-client";

/* Previous work, filtered by category. The chip bar sticks under the header
   so switching is always one tap away. Inactive chips are compact (label
   only); the active one fills and reveals its count. Mobile shows the cards
   as a stacked deck — each card slides over the previous one, which sinks
   back. Desktop shows a grid. */
export default function WorkTabs({ tabs, locale, labels }) {
  const [active, setActive] = useState(tabs[0]?.key);
  const [lightbox, setLightbox] = useState(null);
  const barRef = useRef(null);
  const listRef = useRef(null);
  const switched = useRef(false);
  const sectionTopRef = useRef(null);
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  // Keep the active chip in view if the bar ever has to scroll sideways.
  useEffect(() => {
    const bar = barRef.current;
    const tab = bar?.querySelector(`[data-tab="${active}"]`);
    if (!bar || !tab || bar.scrollWidth <= bar.clientWidth) return;
    bar.scrollTo({ left: tab.offsetLeft - (bar.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  // Mobile deck: as the next card slides up, the covered one scales down and
  // dims. Rebuilt for each category; transform + opacity only.
  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    let mm;
    let cancelled = false;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray("[data-deck-card]", list);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: () => `top ${parseFloat(getComputedStyle(next).top) || 140}px`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .to(card.querySelector("[data-deck-inner]"), { scale: 0.92, ease: "none" }, 0)
            .to(card.querySelector("[data-deck-shade]"), { opacity: 0.5, ease: "none" }, 0);
        });
      });
      // A new category changes the section's height, so triggers further
      // down the page need new positions. Skipped on first load, where
      // ScrollTrigger measures everything once by itself.
      if (switched.current) ScrollTrigger.refresh();
      switched.current = true;
    });
    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, [active]);

  function select(key) {
    if (key === active) return;
    setActive(key);
    // If the visitor has scrolled into the cards, bring the start of the
    // list back so the new category is seen from its first card.
    const top = sectionTopRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) sectionTopRef.current.scrollIntoView({ block: "start" });
  }

  function onKeyDown(event) {
    const i = tabs.findIndex((t) => t.key === active);
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = tabs[(i + step + tabs.length) % tabs.length];
    select(next.key);
    barRef.current?.querySelector(`[data-tab="${next.key}"]`)?.focus();
  }

  return (
    <div>
      <div ref={sectionTopRef} className="scroll-mt-[calc(var(--header-h)+8px)]" />
      <div className="sticky top-[var(--header-h)] z-20 -mx-4 mb-6 bg-background/85 px-4 py-2.5 backdrop-blur-md sm:-mx-6 sm:px-6 md:static md:mx-0 md:mb-10 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
        <div
          ref={barRef}
          role="tablist"
          aria-label={labels.tablist}
          onKeyDown={onKeyDown}
          className="hide-scrollbar flex gap-1 overflow-x-auto sm:gap-2"
        >
          {tabs.map((tab) => {
            const selected = tab.key === active;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                data-tab={tab.key}
                id={`tab-${tab.key}`}
                aria-selected={selected}
                aria-controls="work-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(tab.key)}
                className={`flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-[9px] text-[13px] font-semibold min-[380px]:px-3 min-[380px]:text-[13.5px] sm:px-4 sm:text-[14.5px] transition-[background-color,border-color,color,padding] duration-300 ease-out md:h-12 md:px-5 md:text-[15px] ${
                  selected
                    ? "border-ink bg-ink pe-1 text-ink-foreground min-[380px]:pe-1.5 sm:pe-2 md:pe-2.5"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                <span className="sm:hidden">{tab.short}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span
                  aria-hidden={!selected}
                  className={`grid place-items-center overflow-hidden rounded-full bg-signal text-[12px] font-bold tabular-nums text-signal-foreground transition-[max-width,opacity,margin] duration-300 ease-out ${
                    selected ? "ms-1.5 h-6 min-w-6 max-w-12 px-1 text-[11.5px] opacity-100 md:h-7 md:min-w-7 md:px-1.5" : "ms-0 h-6 max-w-0 px-0 opacity-0"
                  }`}
                >
                  {tab.items.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="work-panel" role="tabpanel" aria-labelledby={`tab-${current.key}`}>
        <ul ref={listRef} key={current.key} className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {current.items.map((item, i) => (
            <li
              key={item.id}
              data-deck-card
              className="work-card-in max-md:sticky"
              style={{ top: `calc(var(--header-h) + 76px + ${Math.min(i, 6) * 8}px)`, animationDelay: `${Math.min(i, 6) * 60}ms` }}
            >
              <div data-deck-inner className="relative h-full origin-top overflow-hidden rounded-[24px] will-change-transform max-md:shadow-[0_-16px_40px_-18px_oklch(var(--shadow)_/_0.35)]">
                {item.kind === "design" ? (
                  <DesignCard item={item} locale={locale} label={labels.viewDesign} onOpen={() => setLightbox(item)} />
                ) : (
                  <ProjectCard project={item} visitLabel={labels.visit} />
                )}
                <span data-deck-shade aria-hidden className="pointer-events-none absolute inset-0 rounded-[24px] bg-[oklch(0.15_0.05_268)] opacity-0" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {lightbox ? (
        <Lightbox item={lightbox} locale={locale} closeLabel={labels.close} onClose={() => setLightbox(null)} />
      ) : null}
    </div>
  );
}

function ProjectCard({ project, visitLabel }) {
  return (
    <Link
      href={project.deploy}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${visitLabel} — ${project.title}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-16px_oklch(var(--shadow)_/_0.25)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.alt ?? `${project.title} — ${project.tech.slice(0, 3).join(", ")}`}
          fill
          sizes="(max-width: 768px) 84vw, (max-width: 1024px) 45vw, 380px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[20px] font-semibold leading-tight md:text-[21px]">{project.title}</h3>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-ink-foreground">
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </span>
        </div>
        <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground line-clamp-3">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {project.tech.slice(0, 3).map((tech) => (
            <TechBadge key={tech} tech={tech} className="py-0.5 text-xs" />
          ))}
        </div>
      </div>
    </Link>
  );
}

function DesignCard({ item, locale, label, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${label} — ${item.title[locale]}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-border bg-card text-start transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-16px_oklch(var(--shadow)_/_0.25)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={item.src}
          alt={item.title[locale]}
          fill
          sizes="(max-width: 768px) 84vw, (max-width: 1024px) 45vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm">
          <Maximize2 className="h-4 w-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <span className="text-[12.5px] font-semibold text-primary">{item.tag[locale]}</span>
        <h3 className="mt-1 font-serif text-[20px] font-semibold leading-tight md:text-[21px]">{item.title[locale]}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground line-clamp-3">{item.caption[locale]}</p>
      </div>
    </button>
  );
}
