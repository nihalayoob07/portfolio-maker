"use client";

import { useRef } from "react";
import { pillars } from "@/content/pillars";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

// Each pillar gets a filament colour and a slight tilt, like cards pinned to a board.
const LOOK = [
  { bg: "bg-teal", tilt: "-1.2deg" },
  { bg: "bg-lilac", tilt: "0.8deg" },
  { bg: "bg-accent", tilt: "-0.6deg" },
];

export function WhatIDo() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from("[data-pillar]", {
          y: 80,
          opacity: 0,
          stagger: 0.14,
          duration: 0.9,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative z-10 px-5 py-24 md:px-8 md:py-32" aria-labelledby="what-i-do">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="what-i-do" className="display text-[clamp(3rem,8vw,7rem)]">
            What I <span className="text-accent">do</span>
          </h2>
          <p className="max-w-sm text-lg font-medium text-muted">Software that ships, and the parts I design and print for it.</p>
        </div>
        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <article key={p.title} data-pillar className={`chunk flex flex-col p-7 md:p-8 ${LOOK[i].bg}`} style={{ rotate: LOOK[i].tilt }}>
              <span className="grid size-12 place-items-center rounded-full border-[2.5px] border-ink bg-surface text-lg font-extrabold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-6 text-4xl">{p.title}</h3>
              <p className="mt-2 font-bold">{p.subtitle}</p>
              <p className="mt-4 leading-relaxed font-medium">{p.text}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-7">
                {p.tools.map((t) => (
                  <li key={t} className="rounded-full border-2 border-ink bg-surface px-3 py-1 text-sm font-bold">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
