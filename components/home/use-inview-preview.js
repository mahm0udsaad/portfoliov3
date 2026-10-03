"use client";

import { useEffect, useRef } from "react";

/* Plays a short, silent preview loop only while the <video> is on screen.
   The src is attached on first sight, so off-screen or hidden (display:none)
   players never download a byte. Visitors with reduced motion or Data Saver
   keep the static poster. */
export function useInViewPreview(src, { enabled = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !enabled || !src) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData === true;
    if (reduceMotion || saveData || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute("src")) video.setAttribute("src", src);
          video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src, enabled]);

  return ref;
}
