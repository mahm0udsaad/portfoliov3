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

/* Scroll life — a "focus rail": as each card passes the vertical centre of the
   screen it scales up, straightens and its generated backdrop brightens; above
   and below centre it recedes and tilts slightly, giving a 3D carousel feel on
   a vertical list. Distinct from the sticky stack the projects section uses. */
export default function ServiceCards({ services }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll("[data-inner]").forEach((el) => {
        el.style.opacity = "1";
      });
      return;
    }
    const cards = [...root.querySelectorAll("[data-service-card]")].map((card) => ({
      card,
      inner: card.querySelector("[data-inner]"),
      img: card.querySelector("[data-parallax]"),
    }));

    // Work only happens on scroll/resize while the grid is on screen —
    // never as an idle per-frame loop.
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const mid = vh / 2;
      cards.forEach(({ card, inner, img }) => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const cardMid = rect.top + rect.height / 2;
        // -1 (well above centre) → 0 (centred) → 1 (well below centre)
        const d = Math.max(-1, Math.min(1, (cardMid - mid) / (vh * 0.6)));
        const focus = 1 - Math.abs(d); // 1 at centre, 0 at edges
        if (inner) {
          const scale = 0.93 + focus * 0.07; // 0.93 → 1.0
          const tilt = d * 5; // deg, opposite sign above/below centre
          inner.style.transform = `perspective(1000px) rotateX(${tilt}deg) scale(${scale})`;
          inner.style.opacity = String(0.62 + focus * 0.38);
        }
        if (img) {
          img.style.transform = `translateY(${d * -8}%) scale(1.16)`;
          img.style.opacity = String(0.24 + focus * 0.26);
        }
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    let listening = false;
    const listen = (on) => {
      if (on === listening) return;
      listening = on;
      const method = on ? "addEventListener" : "removeEventListener";
      window[method]("scroll", schedule, { passive: true });
      window[method]("resize", schedule);
      if (on) schedule();
    };

    let observer;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => listen(entry.isIntersecting), {
        rootMargin: "200px 0px",
      });
      observer.observe(root);
    } else {
      listen(true);
    }
    update();

    return () => {
      observer?.disconnect();
      listen(false);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => {
        const Icon = ICONS[s.iconKey] ?? Globe;
        return (
          <div
            key={s.title}
            data-service-card
            style={{ transitionDelay: `${(i % 4) * 90}ms` }}
            className="[perspective:1000px]"
          >
            <div
              data-inner
              className="group relative overflow-hidden rounded-[20px] border border-border bg-card p-6 pt-7 will-change-transform hover:border-primary/30 hover:shadow-[0_24px_60px_oklch(var(--shadow)_/_0.10)]"
            >
              {/* Generated backdrop — washed toward the card colour so text stays readable */}
              <Image
                src={s.visual}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 280px"
                data-parallax
                className="pointer-events-none object-cover opacity-[0.28] will-change-transform"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/75 to-card/20"
              />
              <div className="relative mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary ring-1 ring-primary/15 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="relative mb-2.5 font-serif text-[20px] font-semibold leading-tight">{s.title}</h3>
              <p className="relative text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-primary to-primary/40 transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
