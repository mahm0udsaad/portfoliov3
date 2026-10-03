"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/gsap-client";

/**
 * GSAP owns the pinned opening sequence while React continues to own the UI.
 * The page scrollbar becomes the timeline: hero out, chat in, alternating
 * messages arrive, chat out, then ScrollTrigger releases the document.
 */
export default function ScrollIntro({
  active = false,
  hero,
  chat,
  cueLabel = "Scroll to explore",
  chrome = true,
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    let cleanup = () => {};

    async function createStory() {
      const { gsap, ScrollTrigger } = await loadGsap();

      if (cancelled) return;

      const media = gsap.matchMedia();
      cleanup = () => media.revert();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const viewport = root.querySelector(".scroll-story__viewport");
        if (!viewport) return;

        // Safari's expanding toolbar changes innerHeight during a swipe.
        // Keep the opening scene (and its spacer) the same size until the
        // device width changes, e.g. on rotation or split-screen resizing.
        const touchViewport = window.matchMedia("(pointer: coarse)").matches;
        let viewportWidth = document.documentElement.clientWidth;
        const sizeViewport = () => {
          root.style.removeProperty("--scroll-story-height");
          root.style.setProperty(
            "--scroll-story-height",
            // The root isn't pinned, so its computed min-height is not
            // overridden by ScrollTrigger's inline pin dimensions.
            window.getComputedStyle(root).minHeight,
          );
        };
        if (touchViewport) sizeViewport();

        const onResize = () => {
          const width = document.documentElement.clientWidth;
          if (!touchViewport || width === viewportWidth) return;
          viewportWidth = width;
          sizeViewport();
          ScrollTrigger.refresh(true);
        };
        window.addEventListener("resize", onResize);

        const headerHeight = () =>
          document.querySelector("header")?.offsetHeight ?? 69;

        const context = gsap.context(() => {
          const heroLayer = root.querySelector(".scroll-story__hero");
          const chatLayer = root.querySelector(".scroll-story__chat");
          const thread = root.querySelector("[data-chat-thread]");
          const messages = gsap.utils.toArray(
            "[data-chat-message]",
            root,
          );
          const composer = root.querySelector("[data-chat-composer]");
          const rail = root.querySelector(".scroll-story__rail-fill");
          const cue = root.querySelector(".scroll-story__cue");

          if (
            !viewport ||
            !heroLayer ||
            !chatLayer ||
            !thread ||
            !messages.length
          )
            return;

          // In RTL the "right" bubbles sit on the physical left, so the
          // horizontal entrance has to flip with the document direction.
          const isRTL =
            (root.closest("[dir]")?.getAttribute("dir") ||
              document.documentElement.dir) === "rtl";
          const drift = isRTL ? -42 : 42;

          thread.scrollTop = 0;
          messages.forEach((message) => {
            const fromRight = message.dataset.side === "right";
            gsap.set(message, {
              autoAlpha: 0,
              x: fromRight ? drift : -drift,
              y: 34,
              scale: 0.94,
            });
          });

          const messageStart = 1.1;
          const messageGap = 0.68;
          const messageDuration = 0.5;
          const messageEnd = messageStart + messages.length * messageGap;
          const storyDuration = messageEnd + 0.35;
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: () => `top ${headerHeight()}px`,
              end: () =>
                `+=${Math.max(
                  (viewport.clientHeight + headerHeight()) * 4,
                  messages.length * 720 + (viewport.clientHeight + headerHeight()) * 0.6,
                )}`,
              pin: viewport,
              // Our own wrapper as the spacer: ScrollTrigger then never
              // re-parents the hero (which would restart its video and CSS
              // animations and register a new LCP paint).
              pinSpacer: root.querySelector(".scroll-story__spacer"),
              pinSpacing: true,
              scrub: 0.35,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: ({ progress }) => {
                root.classList.toggle(
                  "is-chat-active",
                  progress > 0.12,
                );
              },
            },
          });

          // Hand-off: the hero stage sinks back and dims while the client
          // thread rises over it like a sheet.
          gsap.set(chatLayer, { yPercent: 55, y: 0, scale: 0.94 });
          timeline
            .to(
              heroLayer,
              { scale: 0.86, y: -30, autoAlpha: 0.25, duration: 0.9, ease: "power1.in" },
              0,
            )
            .to(heroLayer, { autoAlpha: 0, duration: 0.25 }, 0.85)
            .to(
              chatLayer,
              {
                autoAlpha: 1,
                yPercent: 0,
                scale: 1,
                duration: 0.95,
                ease: "power3.out",
              },
              0.15,
            );

          messages.forEach((message, index) => {
            const at = messageStart + index * messageGap;
            timeline
              .to(
                message,
                {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: messageDuration,
                  ease: "power2.out",
                },
                at,
              )
              .to(
                thread,
                {
                  scrollTop: () =>
                    Math.min(
                      thread.scrollHeight - thread.clientHeight,
                      Math.max(
                        0,
                        message.offsetTop +
                          message.offsetHeight -
                          thread.clientHeight +
                          28,
                      ),
                    ),
                  duration: messageDuration,
                  ease: "power2.inOut",
                },
                at,
              );
          });

          if (composer) {
            timeline.fromTo(
              composer,
              { borderTopColor: "oklch(0.875 0.028 80)" },
              {
                borderTopColor: "oklch(0.43 0.06 161 / 0.65)",
                duration: 0.45,
              },
              messageEnd - 0.05,
            );
          }

          // Brief hold on the last message, then the pin releases and the
          // thread scrolls away with the page straight into the next section.
          timeline.to({}, { duration: 0.35 }, messageEnd);

          if (cue) {
            timeline.to(cue, { autoAlpha: 0, y: 8, duration: 0.35 }, 0);
          }

          if (rail) {
            timeline.fromTo(
              rail,
              { scaleY: 0 },
              { scaleY: 1, duration: storyDuration },
              0,
            );
          }
        }, root);

        // The screenshot bubbles change the thread's scrollHeight as they
        // decode, so the pin distance and scrollTop targets need a refresh
        // once real image dimensions are in.
        // A late image load must not interrupt Safari's momentum scrolling.
        // Coalesce: several images finishing together cause one refresh.
        let refreshTimer = 0;
        const refresh = () => {
          clearTimeout(refreshTimer);
          refreshTimer = setTimeout(() => ScrollTrigger.refresh(true), 200);
        };
        const pendingImages = Array.from(root.querySelectorAll("img")).filter(
          (img) => !img.complete,
        );
        pendingImages.forEach((img) =>
          img.addEventListener("load", refresh, { once: true }),
        );

        return () => {
          clearTimeout(refreshTimer);
          window.removeEventListener("resize", onResize);
          pendingImages.forEach((img) =>
            img.removeEventListener("load", refresh),
          );
          context.revert();
          root.style.removeProperty("--scroll-story-height");
        };
      });
    }

    createStory();

    return () => {
      cancelled = true;
      root.classList.remove("is-chat-active");
      cleanup();
    };
  }, [active]);

  if (!active) return hero;

  return (
    <div ref={rootRef} className="scroll-story">
      <div className="scroll-story__spacer">
      <div className="scroll-story__viewport">
        <div className="scroll-story__hero">{hero}</div>
        <div className="scroll-story__chat">{chat}</div>

        {chrome ? (
          <>
            <div className="scroll-story__rail" aria-hidden>
              <span className="scroll-story__rail-fill" />
            </div>

            <div className="scroll-story__cue" aria-hidden>
              <span>{cueLabel}</span>
              <span className="scroll-story__cue-line" />
              <span>02</span>
            </div>
          </>
        ) : null}
      </div>
      </div>
    </div>
  );
}
