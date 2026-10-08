import { skills } from "@/content/skills";
import { BrandIcon } from "./icons";

// On hover a tile fills with the brand's own colour; dark brands keep a light tile so the icon reads.
function hoverLook(hex: string) {
  const n = parseInt(hex, 16);
  const lum = 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  return { "--brand": `#${hex}`, "--on-brand": lum > 150 ? "#141414" : "#ffffff" } as React.CSSProperties;
}

export function TechStack() {
  return (
    <section className="relative z-10 px-5 py-24 md:px-8 md:py-32" aria-labelledby="stack-title">
      <h2 id="stack-title" className="display text-center text-[clamp(3rem,7vw,6rem)]">
        Tech <span className="text-accent">stack</span>
      </h2>
      <p className="mx-auto mt-4 max-w-md text-center text-lg font-medium text-muted">What I reach for, from the database to the slicer.</p>
      <ul className="mx-auto mt-14 grid max-w-6xl grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
        {skills.map((s) => (
          <li
            key={s.label}
            className="group press flex aspect-square flex-col items-center justify-center gap-2.5 rounded-2xl bg-surface p-3 text-center hover:bg-(--brand)"
            style={hoverLook(s.icon.hex)}
          >
            <BrandIcon icon={s.icon} className="size-8 text-ink transition-colors group-hover:text-(--on-brand)" />
            <span className="text-xs leading-tight font-bold group-hover:text-(--on-brand)">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
