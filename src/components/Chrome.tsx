"use client";

import { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { site } from "@/content/site";
import { SocialIcon } from "./icons";
import { SoundToggle } from "./SoundToggle";

// Which menu item the current scroll position belongs to (the hero and about text count as About).
function useCurrentSection() {
  const [current, setCurrent] = useState("#top");
  useEffect(() => {
    const ids = ["work", "models", "contact"];
    const pick = () => {
      const line = window.innerHeight * 0.4;
      let found = "#top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) found = `#${id}`;
      }
      setCurrent(found);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    return () => window.removeEventListener("scroll", pick);
  }, []);
  return current;
}

// The logo: an orange tile with its own shadow, like a filament swatch.
function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight" aria-label={`${site.name}, back to top`}>
      <span className="size-8 rounded-[10px] border-[2.5px] border-ink bg-accent shadow-[3px_3px_0_var(--color-ink)]" aria-hidden="true" />
      nihal.
    </a>
  );
}

// Fixed header, side socials and resume link that sit over every section.
export function Chrome() {
  const [open, setOpen] = useState(false);
  const current = useCurrentSection();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="flex h-18 items-center justify-between px-5 md:px-8">
          <Logo />
          <nav aria-label="Sections" className="hidden items-center gap-2.5 text-[15px] font-bold md:flex">
            {site.nav.map((item) => {
              const here = current === item.href;
              const last = item.href === "#contact";
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={here ? "location" : undefined}
                  className={`press rounded-full px-4.5 py-2 ${last ? "bg-sun" : here ? "bg-ink text-white" : "bg-surface"}`}
                >
                  <RollText>{last ? "Say hi →" : item.label}</RollText>
                </a>
              );
            })}
            <SoundToggle variant="nav" />
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <SoundToggle variant="nav" />
            <button
              type="button"
              className="press grid size-11 place-items-center rounded-full bg-surface"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-40 flex flex-col justify-center gap-4 bg-bg px-5 md:hidden">
          <nav aria-label="Sections" className="flex flex-col gap-3">
            {site.nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`chunk display px-6 py-4 text-5xl ${["bg-surface", "bg-accent", "bg-teal", "bg-sun"][i % 4]}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex gap-3">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="press grid size-12 place-items-center rounded-full bg-surface">
                <SocialIcon name={s.icon} className="size-5" />
              </a>
            ))}
          </div>
        </div>
      )}

      <ul className="fixed bottom-6 left-6 z-30 hidden flex-col gap-3 lg:flex">
        {site.socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              aria-label={s.label}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="press grid size-11 place-items-center rounded-full bg-surface"
            >
              <SocialIcon name={s.icon} className="size-[18px]" />
            </a>
          </li>
        ))}
      </ul>

      {site.resumeUrl && (
        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="press fixed right-6 bottom-6 z-30 hidden items-center gap-2 rounded-full bg-sun px-5 py-2.5 text-sm font-bold lg:flex"
        >
          Resume <FileText className="size-4" aria-hidden="true" />
        </a>
      )}
    </>
  );
}

function RollText({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
