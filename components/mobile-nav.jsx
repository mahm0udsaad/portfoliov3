"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

/* Mobile-only navigation: a single 44px menu button in the header, opening a
   full-screen sheet with big serif section links, the language switch and the
   main CTA. The sheet sits under the sticky header (z-40 < header z-50) so
   the toggle stays reachable while it is open. */
export default function MobileNav({ links, cta, lang, menuLabel = "Menu", closeLabel = "Close menu" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? closeLabel : menuLabel}
        className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors active:bg-accent"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Portal to <body>: the header's backdrop-filter would otherwise trap
          this fixed overlay inside the header box. */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-40 flex flex-col bg-background pt-[92px] md:hidden">
          <nav className="flex-1 overflow-y-auto px-7">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-border py-5"
                style={{ animation: `pop 0.35s ${i * 0.05}s cubic-bezier(0.22,1,0.36,1) backwards` }}
              >
                <span className="font-serif text-[30px] leading-none tracking-tight">
                  {link.label}
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    0{i + 1}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary rtl:-scale-x-100" />
                </span>
              </Link>
            ))}

            <Link
              href={lang.href}
              hrefLang={lang.hrefLang}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-[15px] font-semibold"
              style={{ animation: `pop 0.35s ${links.length * 0.05}s cubic-bezier(0.22,1,0.36,1) backwards` }}
            >
              {lang.label}
            </Link>
          </nav>

          <div className="border-t border-border px-7 py-5 pb-[max(20px,env(safe-area-inset-bottom))]">
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              className="flex h-14 items-center justify-center gap-2 rounded-full bg-ink text-base font-semibold text-ink-foreground transition-colors active:bg-primary"
            >
              {cta.label}
              <span className="text-lg rtl:hidden">→</span>
              <span className="hidden text-lg rtl:inline">←</span>
            </Link>
          </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
