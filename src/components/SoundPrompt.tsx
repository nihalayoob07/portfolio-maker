"use client";

import { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/sfx";

// Asks on every page load whether to play sound. Either answer is a click, which is also what the
// browser needs before it lets the page make any sound at all.
export function SoundPrompt() {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialog.current!.showModal();
    // Hold the page still behind it (Lenis ignores wheel events inside [data-lenis-prevent]).
    document.documentElement.style.overflow = "hidden";
  }, []);

  const answer = (on: boolean) => {
    sound.set(on);
    document.documentElement.style.overflow = "";
    dialog.current!.close();
  };

  return (
    <dialog
      ref={dialog}
      data-lenis-prevent
      aria-labelledby="sound-title"
      onCancel={(e) => {
        e.preventDefault();
        answer(false);
      }}
      className="m-auto w-[min(40rem,calc(100%-2.5rem))] overflow-visible bg-transparent text-ink backdrop:bg-bg/70 backdrop:backdrop-blur-md open:animate-[sound-in_0.5s_cubic-bezier(0.2,1.4,0.4,1)]"
    >
      <div className="chunk relative overflow-hidden bg-sun px-7 py-10 text-center md:px-14 md:py-14">
        <div className="dots pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto flex h-14 items-end justify-center gap-1.5" aria-hidden="true">
          {[0.9, 0.5, 1, 0.65, 0.8, 0.45, 0.95].map((h, i) => (
            <span
              key={i}
              className="sound-bar w-3 rounded-full border-2 border-ink bg-accent"
              style={{ height: `${h * 100}%`, animationDelay: `${i * 0.11}s` }}
            />
          ))}
        </div>
        <h2 id="sound-title" className="display relative mt-8 text-[clamp(3rem,9vw,6rem)]">
          Sound on?
        </h2>
        <p className="relative mx-auto mt-5 max-w-md text-base leading-relaxed font-medium md:text-lg">
          A few light sound effects make the demos more fun. Nothing loud.
        </p>
        <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            autoFocus
            onClick={() => answer(true)}
            className="press flex items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 text-lg font-bold text-white"
          >
            <Volume2 className="size-5" aria-hidden="true" /> Turn sound on
          </button>
          <button
            type="button"
            onClick={() => answer(false)}
            className="press flex items-center justify-center gap-2.5 rounded-full bg-surface px-8 py-4 text-lg font-bold"
          >
            <VolumeX className="size-5" aria-hidden="true" /> Keep it quiet
          </button>
        </div>
        <p className="relative mt-6 text-sm font-medium">You can change this any time from Sound in the menu bar.</p>
      </div>
    </dialog>
  );
}
