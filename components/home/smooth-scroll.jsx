"use client";

import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap-client";

/* Page-level scroll layer:
   - Lenis eases mouse-wheel scrolling on desktop; touch keeps the phone's own
     native momentum (syncTouch off), which already feels right.
   - Lenis is driven by GSAP's ticker so pinned ScrollTrigger scenes update in
     the same frame as the scroll — no jitter on the pinned sections.
   - In-page links glide to their section, offset by the sticky header.
   - Section titles marked [data-reveal] rise into place once.
   - The header's progress line tracks how far down the page you are. */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = prefersReducedMotion();
    let lenis;
    let tick;
    let gsapRef;
    let cancelled = false;
    let ctx;

    const headerOffset = () => -((document.querySelector("header")?.offsetHeight ?? 70) + 4);

    function scrollToHash(hash) {
      const target = hash === "#top" ? 0 : document.querySelector(hash);
      if (target === null) return false;
      requestAnimationFrame(() => {
        if (lenis) {
          // Lenis already subtracts html's scroll-padding-top (= header).
          lenis.scrollTo(target, { offset: -4, duration: 1.3 });
        } else {
          const y =
            target === 0
              ? 0
              : target.getBoundingClientRect().top + window.scrollY + headerOffset();
          window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
        }
      });
      return true;
    }

    // Capture phase: runs before Next's <Link> handler. preventDefault makes
    // Link skip its own jump, while other onClick handlers (closing the
    // mobile menu) still run.
    function onClick(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = event.target.closest?.("a[href]");
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      if (scrollToHash(decodeURIComponent(url.hash))) {
        event.preventDefault();
        history.pushState(null, "", url.hash);
      }
    }
    document.addEventListener("click", onClick, true);

    // Progress line.
    const bar = document.querySelector("[data-scroll-progress]");
    let progressFrame = 0;
    const paintProgress = () => {
      progressFrame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar) bar.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!progressFrame) progressFrame = requestAnimationFrame(paintProgress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    paintProgress();

    async function init() {
      if (reduce) return;
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import("lenis"),
        loadGsap(),
      ]);
      if (cancelled) return;
      gsapRef = gsap;

      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      ctx = gsap.context(() => {
        gsap.utils.toArray("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 48,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      });

      // Arriving with a #hash (e.g. from /book) — glide there once ready.
      if (window.location.hash) scrollToHash(window.location.hash);
    }
    init();

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll);
      if (progressFrame) cancelAnimationFrame(progressFrame);
      if (tick) gsapRef?.ticker.remove(tick);
      ctx?.revert();
      lenis?.destroy();
    };
  }, []);

  return null;
}
