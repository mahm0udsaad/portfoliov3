"use client";

import { useEffect, useRef } from "react";

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
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    let cleanup = () => {};

    async function createStory() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const media = gsap.matchMedia();
      cleanup = () => media.revert();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const context = gsap.context(() => {
          const viewport = root.querySelector(".scroll-story__viewport");
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
          const storyDuration = messageEnd + 1.05;
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top 69px",
              end: () =>
                `+=${Math.max(
                  window.innerHeight * 5,
                  messages.length * 720 + window.innerHeight * 1.2,
                )}`,
              pin: viewport,
              pinSpacing: true,
              scrub: 0.35,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: ({ progress }) => {
                root.classList.toggle(
                  "is-chat-active",
                  progress > 0.12 && progress < 0.97,
                );
              },
            },
          });

          timeline
            .to(
              heroLayer,
              { autoAlpha: 0, y: -84, scale: 0.94, duration: 0.82 },
              0,
            )
            .to(
              cue,
              { autoAlpha: 0, y: 8, duration: 0.35 },
              0,
            )
            .to(
              chatLayer,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.72,
                ease: "power2.out",
              },
              0.28,
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
              { borderTopColor: "oklch(0.89 0.008 85)" },
              {
                borderTopColor: "oklch(0.45 0.09 160 / 0.65)",
                duration: 0.45,
              },
              messageEnd - 0.05,
            );
          }

          timeline.to(
            chatLayer,
            {
              autoAlpha: 0,
              y: -72,
              scale: 0.98,
              duration: 0.5,
              ease: "power2.in",
            },
            messageEnd + 0.55,
          );

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
        const refresh = () => ScrollTrigger.refresh();
        const pendingImages = Array.from(root.querySelectorAll("img")).filter(
          (img) => !img.complete,
        );
        pendingImages.forEach((img) =>
          img.addEventListener("load", refresh, { once: true }),
        );

        window.requestAnimationFrame(refresh);
        return () => {
          pendingImages.forEach((img) =>
            img.removeEventListener("load", refresh),
          );
          context.revert();
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
      <div className="scroll-story__viewport">
        <div className="scroll-story__hero">{hero}</div>
        <div className="scroll-story__chat">{chat}</div>

        <div className="scroll-story__rail" aria-hidden>
          <span className="scroll-story__rail-fill" />
        </div>

        <div className="scroll-story__cue" aria-hidden>
          <span>{cueLabel}</span>
          <span className="scroll-story__cue-line" />
          <span>02</span>
        </div>
      </div>
    </div>
  );
}
