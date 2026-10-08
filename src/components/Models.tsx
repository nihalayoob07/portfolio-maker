import { models } from "@/content/models";
import { Showcase } from "./showcase/Showcase";
import { PrintPreload } from "./prints/PrintPreload";
import { PrintStage } from "./prints/PrintStage";

// Order, scroll length (in screens) and filament colour of each print's panel. The hex is what the
// 3D studio set is painted with, so it must match the class.
const PANELS: { slug: string; screens: number; tone: string; hex: string }[] = [
  { slug: "medbox", screens: 4, tone: "bg-lilac", hex: "#b7a6ff" },
  { slug: "cat-clicker", screens: 3, tone: "bg-sun", hex: "#ffc93c" },
  { slug: "tissue-box", screens: 3, tone: "bg-accent", hex: "#ff6b35" },
  { slug: "z-ring", screens: 4, tone: "bg-teal", hex: "#00a6a6" },
];

// A still of the print's opening frame, captured from the live renderer (npm run capture:reels
// posters). It's on the page from the start, so a panel never shows anything loading; the live 3D
// fades in over it once it has drawn.
function Poster({ slug }: { slug: string }) {
  return (
    <picture data-poster>
      <source media="(orientation: portrait)" srcSet={`/models/posters/${slug}-tall.webp`} />
      <img
        src={`/models/posters/${slug}-wide.webp`}
        alt=""
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  );
}

export function Models() {
  const list = PANELS.map((p) => ({ ...p, model: models.find((m) => m.slug === p.slug)! }));
  return (
    <section id="models" className="relative z-10" aria-labelledby="models-title">
      <PrintPreload />
      <div className="px-5 pt-24 pb-16 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6">
          <h2 id="models-title" className="display text-[clamp(3rem,8vw,7rem)]">
            3D <span className="text-accent">models</span>
          </h2>
          <p className="max-w-sm text-lg font-medium text-muted">
            Designed in CAD, sliced in Bambu Studio, then printed and tested by me. Rendered here from the actual print files.
          </p>
        </div>
      </div>
      {list.map(({ model: m, screens, tone, hex }, i) => (
        <Showcase
          key={m.slug}
          id={`model-${m.slug}`}
          index={i}
          total={list.length}
          title={m.title}
          category={`3D print · ${m.parts} parts · ${m.size.map(Math.round).join(" × ")} mm`}
          summary={m.blurb}
          screens={screens}
          tone={tone}
          eager
          still={<Poster slug={m.slug} />}
        >
          <PrintStage model={m} order={i} tone={hex} />
        </Showcase>
      ))}
    </section>
  );
}
