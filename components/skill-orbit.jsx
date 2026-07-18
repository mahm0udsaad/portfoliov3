"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ORBIT_SKILLS = [
  { name: "Next.js", icon: "/icons/next-js-svgrepo-com.svg" },
  { name: "React", icon: "/icons/react-svgrepo-com.svg" },
  { name: "Expo", icon: "/icons/expo-svgrepo-com.svg" },
  { name: "Tailwind CSS", icon: "/icons/tailwind-css-svgrepo-com.svg" },
  { name: "Supabase", icon: "/icons/supabase.svg" },
  { name: "Node.js", icon: "/icons/nodejs-icon-svgrepo-com.svg" },
  { name: "Figma", icon: "/icons/figma-svgrepo-com.svg" },
  { name: "Prisma", icon: "/icons/prisma-svgrepo-com.svg" },
  { name: "Express.js", icon: "/icons/express-svgrepo-com.svg" },
  { name: "Nginx", icon: "/icons/nginx-svgrepo-com.svg" },
  { name: "AI", icon: "/icons/bot-svgrepo-com.svg" },
];

const INNER = ORBIT_SKILLS.slice(0, 5);
const OUTER = ORBIT_SKILLS.slice(5);

function Ring({ ringRef, skills, startIndex, radius, active }) {
  return (
    <div
      ref={ringRef}
      aria-hidden
      className="absolute inset-0 will-change-transform"
      style={{ transform: "rotate(var(--angle, 0deg))" }}
    >
      {skills.map((skill, i) => {
        const globalIndex = startIndex + i;
        const isActive = active === globalIndex;
        const theta = (2 * Math.PI * i) / skills.length;
        // Round to a fixed precision so the server- and client-rendered strings
        // are byte-identical — full float precision differs across engines and
        // triggers a React hydration mismatch warning.
        const x = (50 + radius * Math.cos(theta)).toFixed(3);
        const y = (50 + radius * Math.sin(theta)).toFixed(3);
        return (
          <div
            key={skill.name}
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${isActive ? "z-20" : "z-10"}`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {/* counter-rotation keeps the logo (and its label) upright */}
            <div style={{ transform: "rotate(var(--counter, 0deg))" }}>
              <div
                className={`flex h-11 items-center gap-2 rounded-full border px-[10px] transition-[max-width,background-color,color,border-color,box-shadow] duration-500 ${
                  isActive
                    ? "border-ink bg-ink text-ink-foreground shadow-[0_12px_32px_oklch(0.23_0.01_70_/_0.3)]"
                    : "border-border bg-card shadow-[0_8px_24px_oklch(0.23_0.01_70_/_0.12)]"
                }`}
              >
                <Image
                  src={skill.icon}
                  alt=""
                  width={22}
                  height={22}
                  className={`h-[22px] w-[22px] shrink-0 object-contain ${
                    isActive ? "brightness-0 invert" : ""
                  }`}
                />
                <span
                  className="overflow-hidden whitespace-nowrap text-[13px] font-semibold"
                  style={{
                    maxWidth: isActive ? 120 : 0,
                    opacity: isActive ? 1 : 0,
                    transition: "max-width 0.5s ease, opacity 0.4s ease",
                  }}
                >
                  {skill.name}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* The "solar system": both rings orbit continuously (rAF, always running so it
   reads as motion the moment it's on screen). Scrolling adds a temporary spin
   boost that decays with friction. Every ~1.8s a random skill expands into a
   pill that names it, one at a time. */
export default function SkillOrbit({ label }) {
  const rootRef = useRef(null);
  const innerRef = useRef(null);
  const outerRef = useRef(null);
  const visibleRef = useRef(false);
  const [active, setActive] = useState(-1);

  // Visibility is computed straight from the bounding rect each frame — no
  // IntersectionObserver (it proved unreliable in some webviews).
  const isVisible = () => {
    const root = rootRef.current;
    if (!root) return false;
    const r = root.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  };

  useEffect(() => {
    let angle = 0;
    let boost = 0;
    let lastY = window.scrollY;
    let raf;

    const onScroll = () => {
      const y = window.scrollY;
      boost += (y - lastY) * 0.06;
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const BASE = 0.28; // deg/frame ≈ full turn every ~21s at 60fps
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const visible = isVisible();
      visibleRef.current = visible;
      if (!visible) return;
      boost *= 0.92; // friction
      boost = Math.max(-8, Math.min(8, boost));
      angle += BASE + boost;

      if (innerRef.current) {
        innerRef.current.style.setProperty("--angle", `${angle}deg`);
        innerRef.current.style.setProperty("--counter", `${-angle}deg`);
      }
      if (outerRef.current) {
        const outerAngle = -angle * 0.62; // slower, opposite direction
        outerRef.current.style.setProperty("--angle", `${outerAngle}deg`);
        outerRef.current.style.setProperty("--counter", `${-outerAngle}deg`);
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Name reveal: shuffled queue so every skill gets a turn before repeats. */
  useEffect(() => {
    let queue = [];
    const next = () => {
      if (!visibleRef.current) return; // paused off-screen
      if (queue.length === 0) {
        queue = ORBIT_SKILLS.map((_, i) => i).sort(() => Math.random() - 0.5);
      }
      setActive(queue.shift());
    };
    const id = setInterval(next, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={rootRef} className="relative mx-auto aspect-square w-full max-w-md select-none">
      {/* orbit guide lines */}
      <div aria-hidden className="absolute inset-[8%] rounded-full border border-dashed border-border" />
      <div aria-hidden className="absolute inset-[26%] rounded-full border border-dashed border-border/70" />

      {/* centerpiece */}
      <div className="absolute inset-[34%] overflow-hidden rounded-full shadow-[0_24px_70px_oklch(0.23_0.01_70_/_0.22)]">
        <Image
          src="/visuals/skills-core.jpg"
          alt={label ?? "Technical stack"}
          fill
          sizes="(max-width: 768px) 40vw, 180px"
          className="object-cover"
        />
      </div>

      <Ring ringRef={innerRef} skills={INNER} startIndex={0} radius={24} active={active} />
      <Ring ringRef={outerRef} skills={OUTER} startIndex={5} radius={42} active={active} />

      {/* screen-reader fallback for the orbiting icon list */}
      <p className="sr-only">{ORBIT_SKILLS.map((skill) => skill.name).join(", ")}</p>
    </div>
  );
}
