"use client";

import { useRef } from "react";
import { timeline } from "@/content/timeline";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

const COLOURS = ["bg-accent", "bg-sun", "bg-teal", "bg-lilac", "bg-surface"];

export function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        // The ink line draws down the timeline as you scroll.
        gsap.fromTo(
          "[data-line-fill]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-timeline]", start: "top 65%", end: "bottom 65%", scrub: true } },
        );
        gsap.utils.toArray<HTMLElement>("[data-milestone]").forEach((row, i) => {
          gsap.from(row, {
            x: i % 2 ? 60 : -60,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: row, start: "top 85%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative z-10 px-5 py-24 md:px-8 md:py-32" aria-labelledby="journey">
      <h2 id="journey" className="display text-center text-[clamp(2.8rem,7vw,6rem)]">
        My journey &amp; <span className="text-accent">milestones</span>
      </h2>

      <div data-timeline className="relative mx-auto mt-20 max-w-5xl">
        <div className="absolute top-0 bottom-0 left-[22px] w-[5px] rounded-full bg-ink/10 md:left-1/2 md:-ml-[2.5px]" aria-hidden="true">
          <div data-line-fill className="h-full w-full origin-top rounded-full bg-ink" />
        </div>
        <ol className="space-y-10">
          {timeline.map((m, i) => {
            const right = i % 2 === 1;
            return (
              <li key={`${m.when}-${m.title}`} data-milestone className="relative pl-16 md:grid md:grid-cols-2 md:pl-0">
                <span
                  className={`absolute top-5 left-0 grid size-[50px] place-items-center rounded-full border-[3px] border-ink text-xs font-extrabold shadow-[3px_3px_0_var(--color-ink)] md:left-1/2 md:-translate-x-1/2 ${COLOURS[i % COLOURS.length]}`}
                  aria-hidden="true"
                >
                  {m.when === "Now" ? "now" : `'${m.when.slice(2)}`}
                </span>
                <div className={`chunk bg-surface p-6 md:p-7 ${right ? "md:col-start-2 md:ml-14" : "md:mr-14"}`}>
                  <p className="display text-5xl text-ink/20 tabular-nums">{m.when}</p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">{m.title}</h3>
                  <p className="mt-1 font-bold text-accent-soft">{m.org}</p>
                  <p className="mt-3 leading-relaxed font-medium text-ink/80">{m.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
