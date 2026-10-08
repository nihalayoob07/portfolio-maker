"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

const ABOUT =
  "I'm a first-year Computer Science student at SJEC, Mangalore, and I like shipping things people actually use. I've built an online store and the home server it runs on, a notch app for Windows, an Android alarm you have to walk to switch off, and a Chrome extension that does a company's invoicing for it. Away from the keyboard I design parts in CAD and 3D-print them.";

// Words in the paragraph that get a highlighter swipe.
const MARKED = new Set(["store", "server", "notch", "alarm", "extension", "3D-print"]);

const FACTS = [
  { n: "01", text: "B.E. Computer Science, SJEC", bg: "bg-accent" },
  { n: "02", text: "I run my own production server", bg: "bg-sun" },
  { n: "03", text: "National Spell Bee winner, 2020", bg: "bg-lilac" },
];

export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        // Words light up one by one as the paragraph scrolls through the viewport.
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: "[data-about-text]", start: "top 78%", end: "bottom 50%", scrub: true },
          },
        );
        gsap.from("[data-fact]", {
          y: 40,
          rotate: (i: number) => [-4, 3, -2][i],
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: "[data-facts]", start: "top 88%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="relative z-10 px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">
          <span className="size-2.5 rounded-full bg-accent" aria-hidden="true" /> About me
        </p>
        <p data-about-text className="mt-8 text-[clamp(1.7rem,3.6vw,3.4rem)] leading-[1.14] font-bold tracking-tight">
          {ABOUT.split(" ").map((word, i) => (
            <span key={i} data-word>
              {MARKED.has(word.replace(/[,.]/g, "")) ? (
                <span className="rounded-md bg-sun/70 box-decoration-clone px-1">{word}</span>
              ) : (
                word
              )}{" "}
            </span>
          ))}
        </p>
        <ul data-facts className="mt-16 grid gap-5 sm:grid-cols-3">
          {FACTS.map((f) => (
            <li key={f.n} data-fact className={`chunk flex items-center gap-4 px-6 py-5 ${f.bg}`}>
              <span className="grid size-10 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface text-sm font-extrabold">
                {f.n}
              </span>
              <span className="text-lg leading-tight font-bold">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
