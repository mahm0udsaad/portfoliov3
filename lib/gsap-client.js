/* One lazy GSAP + ScrollTrigger instance shared by every scroll effect, so the
   library is downloaded once and registered once, after first paint. */
let loading;

let introDone;

/* Resolves once the hero's CSS entrance has finished, then switches those
   animations off (html.intro-done). Pinning moves the hero into a wrapper,
   and moving an element restarts its CSS animations — so scroll scenes must
   only be built after this, or the intro visibly replays. */
export function whenIntroDone() {
  if (!introDone) {
    introDone = (async () => {
      const targets = new Set(document.querySelectorAll(".hero-enter > *, .hero-device"));
      const running = document
        .getAnimations?.()
        .filter((a) => targets.has(a.effect?.target));
      await Promise.all((running ?? []).map((a) => a.finished.catch(() => {})));
      document.documentElement.classList.add("intro-done");
    })();
  }
  return introDone;
}

export function loadGsap() {
  if (!loading) {
    loading = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      whenIntroDone(),
    ]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        return { gsap, ScrollTrigger };
      },
    );
  }
  return loading;
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
