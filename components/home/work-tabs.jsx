"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import TechBadge from "@/components/ui/techBadge";
import { Lightbox } from "@/components/design-gallery";

/* Previous work, filtered by category. The tab bar sticks under the header
   so switching is always one tap away; a pill slides to the active tab and
   the new cards rise in with a short stagger. Mobile: one swipeable row of
   big cards. Desktop: a grid. */
export default function WorkTabs({ tabs, locale, labels }) {
  const [active, setActive] = useState(tabs[0]?.key);
  const [lightbox, setLightbox] = useState(null);
  const barRef = useRef(null);
  const pillRef = useRef(null);
  const sectionTopRef = useRef(null);
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  // Slide the pill under the active tab, and keep that tab in view when the
  // bar itself scrolls sideways on narrow screens.
  useLayoutEffect(() => {
    const bar = barRef.current;
    const pill = pillRef.current;
    const tab = bar?.querySelector(`[data-tab="${active}"]`);
    if (!bar || !pill || !tab) return;
    pill.style.width = `${tab.offsetWidth}px`;
    pill.style.transform = `translateX(${tab.offsetLeft}px)`;
    const left = tab.offsetLeft - (bar.clientWidth - tab.offsetWidth) / 2;
    bar.scrollTo({ left, behavior: "smooth" });
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
      <div className="sticky top-[calc(var(--header-h)+8px)] z-20 -mx-1 mb-7 md:mb-10">
        <div
          ref={barRef}
          role="tablist"
          aria-label={labels.tablist}
          onKeyDown={onKeyDown}
          className="hide-scrollbar relative flex w-full gap-1 overflow-x-auto rounded-full sm:w-max sm:max-w-full border border-border bg-card/85 p-1.5 shadow-[0_10px_30px_-12px_oklch(var(--shadow)_/_0.25)] backdrop-blur-md"
        >
          <span
            ref={pillRef}
            aria-hidden
            className="absolute bottom-1.5 left-0 top-1.5 rounded-full bg-ink transition-[transform,width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          />
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
                className={`relative z-10 flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 text-[14px] font-semibold transition-colors duration-300 sm:flex-none sm:gap-2 sm:px-5 sm:text-[14.5px] ${
                  selected ? "text-ink-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="sm:hidden">{tab.short}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 text-[11px] tabular-nums sm:text-[11.5px] transition-colors duration-300 ${
                    selected ? "bg-white/15" : "bg-muted"
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
        <ul
          key={current.key}
          className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3"
        >
          {current.items.map((item, i) => (
            <li
              key={item.id}
              className="work-card-in w-[84%] shrink-0 snap-center sm:w-[60%] md:w-auto"
              style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}
            >
              {item.kind === "design" ? (
                <DesignCard item={item} locale={locale} label={labels.viewDesign} onOpen={() => setLightbox(item)} />
              ) : (
                <ProjectCard project={item} visitLabel={labels.visit} />
              )}
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
