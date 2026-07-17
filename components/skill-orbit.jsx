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
        const x = 50 + radius * Math.cos(theta);
        const y = 50 + radius * Math.sin(theta);
        return (
          <div
            key={skill.name}
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${isActive ? "z-20" : "z-10"}`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {/* counter-rotation keeps the logo (and its label) upright */}
            <div style={{ transform: "rotate(calc(var(--angle, 0deg) * -1))" }}>
              <div
                className={`flex h-11 items-center gap-2 rounded-full border px-[10px] transition-colors duration-300 ${
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
                  className="overflow-hidden whitespace-nowrap text-[13px] font-semibold transition-all duration-300"
                  style={{
                    maxWidth: isActive ? 120 : 0,
                    opacity: isActive ? 1 : 0,
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

/* The "solar system": scroll makes the rings spin, and every couple of
   seconds a random skill expands into a pill that names it. */
export default function SkillOrbit({ label }) {
  const rootRef = useRef(null);
  const innerRef = useRef(null);
  const outerRef = useRef(null);
  const visibleRef = useRef(false);
  const [active, setActive] = useState(-1);

  /* Rotation: constant slow drift + a boost proportional to scroll speed,
     decaying with friction so the rings glide to a rest. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(root);

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return () => io.disconnect();

    let angle = 0;
    let velocity = 0;
    let lastY = window.scrollY;
    let raf;

    const onScroll = () => {
      const y = window.scrollY;
      velocity += (y - lastY) * 0.045;
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visibleRef.current) return;
      velocity *= 0.9; // friction
      velocity = Math.max(-6, Math.min(6, velocity));
      angle += 0.04 + velocity;
      innerRef.current?.style.setProperty("--angle", `${angle}deg`);
      outerRef.current?.style.setProperty("--angle", `${-angle * 0.65}deg`);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
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
    next();
    const id = setInterval(next, 2400);
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
