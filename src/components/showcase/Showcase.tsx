"use client";

import { createContext, use, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type Ref, type RefObject } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

type Link = { label: string; href: string };

const ShowcaseContext = createContext({ onScreen: false });
// Whether this panel is in the viewport (so 3D scenes can stop rendering when it isn't).
export const useShowcase = () => use(ShowcaseContext);

// A full-screen panel, as on preymaker.com: the stage is fixed and clipped to the panel, so the
// next panel wipes over this one as you scroll. Its height sets how much scrolling its reel gets.
export function Showcase({
  id,
  index,
  total,
  title,
  category,
  status,
  summary,
  links = [],
  screens,
  eager = false,
  tone = "bg-surface",
  still,
  children,
}: {
  id: string;
  index: number;
  total: number;
  title: string;
  category: string;
  status?: string;
  summary: string;
  links?: Link[];
  screens: number;
  // Mount the reel with the page instead of a screen ahead (it must be cheap until it's needed).
  eager?: boolean;
  // The stage's filament colour (a bg-* class).
  tone?: string;
  // Shown from the start, under the reel (e.g. a poster frame), even before the reel mounts.
  still?: ReactNode;
  children: ReactNode;
}) {
  const article = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = article.current!;
    // Mount the reel a screen ahead and drop it once well past, so only nearby panels hold images.
    const nearObs = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "100% 0px" });
    const seenObs = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    nearObs.observe(el);
    seenObs.observe(el);
    return () => {
      nearObs.disconnect();
      seenObs.disconnect();
    };
  }, []);

  const num = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <article
      ref={article}
      id={id}
      data-showcase
      aria-labelledby={`${id}-title`}
      className="relative [clip-path:inset(0)]"
      style={{ height: `${screens * 100}vh` }}
    >
      <div className={`fixed inset-0 overflow-hidden ${tone}`} inert={!onScreen}>
        <div className="dots absolute inset-0 opacity-60" aria-hidden="true" />
        {still}
        <ShowcaseContext value={{ onScreen }}>{(eager || near) && children}</ShowcaseContext>

        <div data-dim className="pointer-events-none absolute inset-0 bg-bg/35 backdrop-blur-md" aria-hidden="true" />

        {/* The panel's title card: a big sticker in the middle of the stage until the reel starts. */}
        <div data-intro className="pointer-events-none absolute inset-0 grid place-items-center px-5">
          <div className="chunk w-full max-w-4xl bg-surface px-6 py-9 text-center md:px-12 md:py-12">
            <p className="eyebrow">
              {num} · {category}
            </p>
            <h3 id={`${id}-title`} className="display mt-5 text-[clamp(2.6rem,8.5vw,7.5rem)] break-words">
              {title}
            </h3>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed font-medium md:text-lg">{summary}</p>
            {links.length > 0 && (
              <div className="pointer-events-auto mt-7 flex flex-wrap justify-center gap-3">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="press inline-flex items-center gap-1.5 rounded-full bg-sun px-5 py-2.5 font-bold"
                  >
                    {l.label} <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          data-label
          className="invisible absolute bottom-5 left-5 flex flex-wrap items-center gap-x-4 gap-y-2 md:bottom-8 md:left-8 lg:left-24"
        >
          <span className="chunk-sm rounded-full bg-surface px-4 py-2 text-sm font-bold">
            <span className="text-accent-soft">{String(index + 1).padStart(2, "0")}</span>
            <span className="ml-2.5">{title}</span>
            {status && <span className="ml-2.5 text-muted">{status}</span>}
          </span>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="press inline-flex items-center gap-1 rounded-full bg-sun px-3.5 py-2 text-sm font-bold"
            >
              {l.label} <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

// A fixed-size logical screen (the recording's own pixels), scaled to fit the stage below the
// site header. Everything inside is positioned in those pixels, so recorded coordinates work as-is.
// On portrait phones a landscape screen would be tiny, so it's shown at twice the size and pans
// sideways to keep `follow` (the demo cursor) in view. `full` uses the whole stage on desktop
// instead of leaving the right-hand column to the captions.
export function Screen({
  width,
  height,
  fill = 1,
  follow,
  full = false,
  className = "",
  children,
}: {
  width: number;
  height: number;
  fill?: number;
  follow?: RefObject<HTMLElement | null>;
  full?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    let fit = { w: 0, h: 0, s: 1, zoomed: false };
    let pan = 0;
    const place = () => {
      const { w, h, s, zoomed } = fit;
      const spare = width * s - w;
      if (zoomed && follow?.current) {
        const x = Number(gsap.getProperty(follow.current, "x")) * s;
        pan += (Math.min(Math.max(x - w / 2, 0), spare) - pan) * 0.12;
      } else pan = spare / 2;
      inner.current!.style.transform = `translate(${-pan}px, ${(h - height * s) / 2}px) scale(${s})`;
    };
    const ro = new ResizeObserver(([e]) => {
      const { width: w, height: h } = e.contentRect;
      const s = Math.min(w / width, h / height) * fill;
      const zoomed = !!follow && w / h < 0.8;
      fit = { w, h, s: zoomed ? Math.min(s * 2, (h * 0.7) / height) : s, zoomed };
      place();
    });
    ro.observe(box.current!);
    if (follow) gsap.ticker.add(place);
    return () => {
      ro.disconnect();
      gsap.ticker.remove(place);
    };
  }, [width, height, fill, follow]);
  return (
    // On desktop the right 38% is left free for the captions, unless the screen is `full`.
    <div ref={box} className={`absolute inset-x-0 top-16 bottom-2 overflow-hidden ${full ? "" : "lg:right-[38%] lg:left-20"}`}>
      <div ref={inner} className={`absolute top-0 left-0 origin-top-left ${className}`} style={{ width, height }}>
        {children}
      </div>
    </div>
  );
}

// The demo's mouse pointer; the reel moves it with GSAP (x/y in screen pixels).
export function Cursor({ ref }: { ref: Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className="pointer-events-none invisible absolute top-0 left-0 z-20" aria-hidden="true">
      <span data-ring className="absolute -top-6 -left-6 size-12 rounded-full border-2 border-white/80 opacity-0" />
      <svg data-arrow width="26" height="30" viewBox="0 0 26 30" className="origin-top-left drop-shadow-[0_2px_6px_rgb(0_0_0/0.5)]">
        <path
          d="M2 2 L2 24 L8 18.5 L12.5 28 L16.5 26.2 L12.2 17 L20 17 Z"
          fill="#fff"
          stroke="#111"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// A step caption: a punchy headline and an optional line of detail.
export type Caption = readonly [title: string, detail?: string];

// Where captions sit on desktop: the right-hand column the screen leaves free ("side"), a narrower
// strip beside a centred print ("edge"), or the bottom-right corner of a full-size demo ("corner").
// On phones they always sit at the bottom.
const PLACES = {
  side: "lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[38%] lg:content-center lg:pr-16 lg:pl-10",
  edge: "lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[30%] lg:content-center lg:pr-14 lg:pl-2",
  corner: "lg:top-auto lg:right-10 lg:bottom-10 lg:left-auto lg:w-[min(30rem,34%)] lg:p-0",
};
export type CaptionPlace = keyof typeof PLACES;

// They share one grid cell; the reel fades each one in and out. Each is a sticker card.
export function Captions({ items, place = "side" }: { items: readonly Caption[]; place?: CaptionPlace }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 grid px-5 pt-28 pb-28 ${PLACES[place]}`}>
      {items.map(([title, detail], i) => (
        <div
          key={title}
          data-caption
          className="chunk invisible col-start-1 row-start-1 bg-surface p-6 md:p-8"
          style={{ rotate: `${[-1.5, 1.2, -0.8, 1.6, -1.2, 0.9, -1.4, 1.1][i % 8]}deg` }}
        >
          <p className="display text-[clamp(2rem,3.6vw,3.8rem)] text-balance">{title}</p>
          {detail && <p className="mt-3 max-w-sm text-base leading-relaxed font-medium lg:text-lg">{detail}</p>}
        </div>
      ))}
    </div>
  );
}
