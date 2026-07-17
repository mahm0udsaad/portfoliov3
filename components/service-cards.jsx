"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Globe, Smartphone, MessageSquare, ShoppingCart } from "lucide-react";

const ICONS = {
  web: Globe,
  mobile: Smartphone,
  whatsapp: MessageSquare,
  ecommerce: ShoppingCart,
};

/* Scroll life: each card fades/rises in with a stagger the first time it is
   seen, and while it travels through the viewport the generated backdrop and
   the ghost number drift at different speeds (a light parallax). */
export default function ServiceCards({ services }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = [...root.querySelectorAll("[data-service-card]")];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    cards.forEach((card) => io.observe(card));

    if (reduced) return () => io.disconnect();

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const vh = window.innerHeight;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        // -0.5 at the bottom of the screen, +0.5 at the top
        const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
        const img = card.querySelector("[data-parallax]");
        if (img) img.style.transform = `translateY(${progress * 12}%) scale(1.14)`;
        const ghost = card.querySelector("[data-ghost]");
        if (ghost) ghost.style.transform = `translateY(${progress * -26}px)`;
      });
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((s, i) => {
        const Icon = ICONS[s.iconKey] ?? Globe;
        return (
          <div
            key={s.title}
            data-service-card
            style={{ transitionDelay: `${(i % 4) * 110}ms` }}
            className="group relative overflow-hidden rounded-[20px] border border-border bg-card p-6 pt-7 hover:border-primary/30 hover:shadow-[0_24px_60px_oklch(0.23_0.01_70_/_0.10)]"
          >
            {/* Generated backdrop — washed toward the card color so text stays readable */}
            <Image
              src={s.visual}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 280px"
              data-parallax
              className="pointer-events-none object-cover opacity-[0.32] will-change-transform transition-opacity duration-300 group-hover:opacity-50"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/75 to-card/20"
            />
            <span
              aria-hidden
              data-ghost
              className="pointer-events-none absolute -top-4 -right-3 select-none font-serif text-[76px] leading-none text-muted-foreground/[0.08] will-change-transform transition-colors duration-300 group-hover:text-primary/10 rtl:right-auto rtl:-left-3"
            >
              0{i + 1}
            </span>
            <div className="relative mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary ring-1 ring-primary/15 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="relative font-serif text-[20px] leading-tight mb-2.5">{s.title}</h3>
            <p className="relative text-muted-foreground text-sm leading-relaxed">{s.description}</p>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-primary to-primary/40 transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right"
            />
          </div>
        );
      })}
    </div>
  );
}
