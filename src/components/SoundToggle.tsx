"use client";

import { useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/sfx";

const LABEL = { locked: "Tap for sound", on: "Sound on", muted: "Sound off" };

// Turns the page's sound effects on and off (the first tap also unlocks audio in the browser).
// "pill" sits in a panel; "nav" matches the header links.
export function SoundToggle({ variant = "pill", className = "" }: { variant?: "pill" | "nav"; className?: string }) {
  const state = useSyncExternalStore(sound.subscribe, sound.state, () => "locked" as const);
  const Icon = state === "on" ? Volume2 : VolumeX;
  if (variant === "nav")
    return (
      <button
        type="button"
        onClick={sound.toggle}
        aria-pressed={state === "on"}
        aria-label={LABEL[state]}
        className={`press flex items-center gap-1.5 rounded-full px-3.5 py-2 font-bold ${state === "on" ? "bg-teal" : "bg-surface"} ${className}`}
      >
        <Icon className="size-4" aria-hidden="true" />
        <span className="hidden md:inline">Sound</span>
      </button>
    );
  return (
    <button
      type="button"
      onClick={sound.toggle}
      aria-pressed={state === "on"}
      className={`press flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold ${state === "on" ? "bg-teal" : state === "locked" ? "bg-sun" : "bg-surface"} ${className}`}
    >
      <Icon className="size-4" aria-hidden="true" />
      {LABEL[state]}
    </button>
  );
}
