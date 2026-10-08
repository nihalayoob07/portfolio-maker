"use client";

import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

// What I work in, each with its filament colour.
const TAGS = [
  { label: "Full-stack", color: "var(--color-accent)" },
  { label: "Android", color: "var(--color-teal)" },
  { label: "3D printing", color: "var(--color-sun)" },
  { label: "CAD", color: "var(--color-lilac)" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        // The photo card turns a touch toward the pointer.
        if (window.matchMedia("(pointer: fine)").matches && photo.current) {
          const rotY = gsap.quickTo(photo.current, "rotationY", { duration: 0.8, ease: "power3" });
          const rotX = gsap.quickTo(photo.current, "rotationX", { duration: 0.8, ease: "power3" });
          const onMove = (e: PointerEvent) => {
            rotY(((e.clientX / window.innerWidth) * 2 - 1) * 6);
            rotX(-((e.clientY / window.innerHeight) * 2 - 1) * 4);
          };
          window.addEventListener("pointermove", onMove);
          return () => window.removeEventListener("pointermove", onMove);
        }
      });
      mm.add(MOTION, () => {
        // Scrolling away: the cards drift apart a little.
        gsap.to("[data-hero-left]", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-right]", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="relative px-5 pt-24 pb-10 md:px-8 md:pt-26 lg:min-h-[100svh]">
      <div className="mx-auto grid max-w-[88rem] gap-6 lg:h-[calc(100svh-8.5rem)] lg:min-h-[38rem] lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div data-hero-left className="chunk intro-fade relative flex flex-col justify-between bg-surface p-7 md:p-11">
          <div>
            <p className="text-xl font-bold md:text-2xl">Hey, I&apos;m</p>
            <h1 className="display mt-2 text-[clamp(4.2rem,11.5vw,11rem)]">
              <span className="intro-line">
                <span style={{ animationDelay: "0.1s" }}>Nihal</span>
              </span>
              <span className="intro-line">
                <span style={{ animationDelay: "0.2s" }}>
                  Ayoob<span className="text-accent">.</span>
                </span>
              </span>
            </h1>
          </div>
          <div className="mt-8">
            <ul className="flex flex-wrap gap-2.5">
              {TAGS.map((t, i) => (
                <li
                  key={t.label}
                  className="intro-fade flex items-center gap-2 rounded-full border-[2.5px] border-ink px-4 py-1.5 font-bold"
                  style={{ animationDelay: `${0.35 + i * 0.07}s` }}
                >
                  <span className="size-3.5 rounded-full border-2 border-ink" style={{ background: t.color }} aria-hidden="true" />
                  {t.label}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-xl text-lg leading-snug font-medium md:text-xl">
              First-year CSE at SJEC, Mangalore. I build things people actually use, then 3D-print the parts for them.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#work" className="press inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white">
                See my work <ArrowDown className="size-4" aria-hidden="true" />
              </a>
              <a
                href="https://github.com/nihalayoob07"
                target="_blank"
                rel="noreferrer"
                className="press inline-flex items-center gap-2 rounded-full bg-surface px-6 py-3 font-bold"
              >
                GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div data-hero-right className="intro-fade [perspective:1400px]" style={{ animationDelay: "0.15s" }}>
          <div ref={photo} className="chunk relative h-[min(78vw,34rem)] bg-teal lg:h-full">
            <div className="dots absolute inset-0 rounded-[25px] opacity-60" aria-hidden="true" />
            <div className="absolute inset-0 overflow-hidden rounded-[25px]">
              {/* Pre-sized files from the CDN (scripts/prepare-hero.mjs); page.tsx preloads them. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.heroImage.src}
                srcSet={site.heroImage.srcSet}
                sizes={site.heroSizes}
                width={site.heroImage.width}
                height={site.heroImage.height}
                alt={`Portrait of ${site.name}`}
                fetchPriority="high"
                className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
              />
            </div>
            <span
              className="sticker chunk-sm absolute top-6 right-5 rounded-full bg-sun px-5 py-3 text-lg font-extrabold"
              style={{ "--tilt": "-7deg", animationDelay: "0.6s" } as React.CSSProperties}
            >
              {site.studying} ✦
            </span>
            <span
              className="sticker chunk-sm absolute bottom-16 -left-4 rounded-full bg-surface px-5 py-3 text-lg font-extrabold"
              style={{ "--tilt": "6deg", animationDelay: "0.75s" } as React.CSSProperties}
            >
              made in Mangalore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
