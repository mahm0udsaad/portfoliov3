"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TechBadge from "@/components/ui/techBadge";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap-client";

/* Featured projects as a deck: every card is sticky under the header, the
   next one slides up over it, and the covered card sinks back (scales down
   and dims) in step with the scroll. Sticky does the layout work natively;
   GSAP only scrubs transform + opacity, so it stays smooth on phones. */
export default function ProjectDeck({ projects, visitLabel }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    let ctx;
    let cancelled = false;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const cards = gsap.utils.toArray("[data-deck-card]", root);
      ctx = gsap.context(() => {
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: () => `top ${parseFloat(getComputedStyle(next).top) || 80}px`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
          tl.to(card.querySelector("[data-deck-inner]"), { scale: 0.9, y: -18, ease: "none" }, 0).to(
            card.querySelector("[data-deck-shade]"),
            { opacity: 0.55, ease: "none" },
            0,
          );
        });
      }, root);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      {projects.map((project, i) => (
        <div
          key={project.id}
          data-deck-card
          className="sticky mb-6 md:mb-10"
          style={{ top: `calc(var(--header-h) + ${12 + i * 8}px)` }}
        >
          <article
            data-deck-inner
            className="relative origin-top overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_-20px_60px_-20px_oklch(var(--shadow)_/_0.25)] will-change-transform md:grid md:min-h-[min(560px,calc(100svh-var(--header-h)-80px))] md:grid-cols-12"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted md:col-span-7 md:aspect-auto">
              <Image
                src={project.image}
                alt={project.alt ?? `${project.title} — ${project.tech.slice(0, 3).join(", ")}`}
                fill
                sizes="(max-width: 768px) 94vw, 680px"
                className="object-cover object-top"
              />
              <span dir="ltr" className="absolute start-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[12px] font-semibold tabular-nums text-white backdrop-blur-sm">
                {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-col p-5 sm:p-6 md:col-span-5 md:p-10">
              <h3 className="font-display-tight font-serif text-[24px] font-semibold leading-tight md:text-[34px]">
                {project.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground line-clamp-3 md:mt-4 md:text-[16px] md:line-clamp-none">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 md:mt-6">
                {project.tech.slice(0, 4).map((tech) => (
                  <TechBadge key={tech} tech={tech} className="py-0.5 text-xs" />
                ))}
              </div>
              <Link
                href={project.deploy}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-ink px-6 text-[15px] font-semibold text-ink-foreground transition-colors hover:bg-primary md:mt-auto"
              >
                {visitLabel}
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
            </div>

            <span data-deck-shade aria-hidden className="pointer-events-none absolute inset-0 bg-[oklch(0.15_0.05_268)] opacity-0" />
          </article>
        </div>
      ))}
    </div>
  );
}

export function MoreWork({ projects, visitLabel }) {
  return (
    <ul className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
      {projects.map((project) => (
        <li key={project.id} className="w-[72%] shrink-0 snap-start sm:w-[46%] md:w-auto">
          <Link
            href={project.deploy}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${visitLabel} — ${project.title}`}
            className="group block overflow-hidden rounded-[22px] border border-border bg-card transition-shadow hover:shadow-[0_20px_44px_-16px_oklch(var(--shadow)_/_0.25)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={project.alt ?? project.title}
                fill
                sizes="(max-width: 768px) 72vw, 360px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex items-start justify-between gap-3 p-4">
              <div className="min-w-0">
                <h4 className="truncate font-serif text-[17px] font-semibold">{project.title}</h4>
                <p className="mt-1 text-[13.5px] leading-snug text-muted-foreground line-clamp-2">{project.description}</p>
              </div>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary rtl:-scale-x-100" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
