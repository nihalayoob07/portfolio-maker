import type { ComponentType } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects, type ReelId } from "@/content/projects";
import { Showcase } from "./showcase/Showcase";
import { DeckReel } from "./showcase/DeckReel";
import { DrillReel } from "./showcase/DrillReel";
import { PrintLedgerReel } from "./showcase/PrintLedgerReel";
import { PrintVaultReel } from "./showcase/PrintVaultReel";

// Each reel, how many screens of scrolling it plays over, and its stage colour.
const REELS: Record<ReelId, { Reel: ComponentType; screens: number; tone: string }> = {
  printvault: { Reel: PrintVaultReel, screens: 5, tone: "bg-accent" },
  drill: { Reel: DrillReel, screens: 5, tone: "bg-sun" },
  deck: { Reel: DeckReel, screens: 6, tone: "bg-lilac" },
  printledger: { Reel: PrintLedgerReel, screens: 5, tone: "bg-teal" },
};

const CARD_TONES = ["bg-sun", "bg-lilac", "bg-teal", "bg-accent"];

const featured = projects.filter((p) => p.reel);
const more = projects.filter((p) => !p.reel);

export function Work() {
  return (
    <section id="work" className="relative z-10" aria-labelledby="work-title">
      <div className="px-5 pt-24 pb-16 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6">
          <h2 id="work-title" className="display text-[clamp(3rem,8vw,7rem)]">
            My <span className="text-accent">work</span>
          </h2>
          <p className="max-w-sm text-lg font-medium text-muted">Four things I built, each playing as you scroll. Then a few more.</p>
        </div>
      </div>

      {featured.map((p, i) => {
        const { Reel, screens, tone } = REELS[p.reel!];
        return (
          <Showcase
            key={p.slug}
            id={`work-${p.slug}`}
            index={i}
            total={featured.length}
            title={p.title}
            category={p.category}
            status={p.status}
            summary={p.summary}
            links={p.links}
            screens={screens}
            tone={tone}
          >
            <Reel />
          </Showcase>
        );
      })}

      <div className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h3 className="display text-[clamp(2.4rem,5vw,4rem)]">More projects</h3>
          <ul className="mt-10 grid gap-7 md:grid-cols-2">
            {more.map((p, i) => (
              <li key={p.slug} className={`chunk flex flex-col p-7 ${CARD_TONES[i % CARD_TONES.length]}`}>
                <p className="text-sm font-bold">
                  {p.category}
                  {p.status && <span> · {p.status}</span>}
                </p>
                <p className="display mt-3 text-4xl">{p.title}</p>
                <p className="mt-4 leading-relaxed font-medium">{p.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-full border-2 border-ink bg-surface px-3 py-1 text-xs font-bold">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-6 text-sm">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="press inline-flex items-center gap-1 rounded-full bg-surface px-4 py-2 font-bold"
                    >
                      {l.label} <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  ))}
                  {p.privateRepo && (
                    <span className="inline-flex items-center gap-1.5 font-bold">
                      <Lock className="size-4" aria-hidden="true" /> Private repo
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <a
            href="https://github.com/nihalayoob07"
            target="_blank"
            rel="noreferrer"
            className="press mt-12 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white"
          >
            More on github.com/nihalayoob07 <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
