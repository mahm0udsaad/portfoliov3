import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import TechBadge from "@/components/ui/techBadge";

/* Mobile-only "deck" presentation: every card is sticky under the header, so
   scrolling slides the next project up and over the previous one. Pure CSS —
   no scroll listeners — which keeps it smooth on low-end phones. */
export default function ProjectStack({ projects, visitLabel, counterLabel }) {
  return (
    <div className="md:hidden">
      {projects.map((project, i) => (
        <div
          key={project.title}
          className="sticky mb-7"
          /* Stagger the resting offset a little so the pile reads as a deck.
             Cycles 0-2 so a long list never pushes cards off screen. */
          style={{ top: `${96 + (i % 3) * 12}px` }}
        >
          <article className="overflow-hidden rounded-[22px] border border-border bg-card shadow-[0_-18px_50px_oklch(0.23_0.01_70_/_0.16)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={`${project.title} — ${project.tech.slice(0, 3).join(", ")}`}
                fill
                sizes="(max-width: 768px) 92vw, 380px"
                className="object-cover object-top"
              />
              <span dir="ltr" className="absolute start-4 top-4 rounded-full bg-ink/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-foreground backdrop-blur-sm">
                {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                {counterLabel ? ` · ${counterLabel}` : ""}
              </span>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-[22px] leading-tight">
                  {project.title}
                </h3>
                <Link
                  href={project.deploy}
                  target="_blank"
                  aria-label={`${visitLabel} — ${project.title}`}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-ink-foreground transition-colors hover:bg-primary"
                >
                  <ExternalLink className="h-[18px] w-[18px]" />
                </Link>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((tech) => (
                  <TechBadge key={tech} tech={tech} className="text-xs py-0.5" />
                ))}
                {project.tech.length > 3 && (
                  <span className="self-center px-1 text-xs text-muted-foreground">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
