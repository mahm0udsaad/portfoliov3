"use client";

import { useEffect, useState } from "react";

/* Cycles through words in one slot: the current word slides up and out while
   the next rises in. All words share a single grid cell, so the line never
   reflows. Pauses in background tabs; reduced motion gets a plain crossfade. */
export default function WordRotator({ words, interval = 2200, className = "" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let id;
    const start = () => {
      clearInterval(id);
      id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    };
    const onVisibility = () => (document.hidden ? clearInterval(id) : start());
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [words.length, interval]);

  return (
    <span className={`word-rotator ${className}`} aria-hidden>
      {words.map((word, i) => {
        const state = i === index ? "is-active" : i === (index - 1 + words.length) % words.length ? "is-leaving" : "";
        return (
          <span key={word} className={`word-rotator__word ${state}`}>
            {word}
          </span>
        );
      })}
    </span>
  );
}
