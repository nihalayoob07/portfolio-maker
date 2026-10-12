"use client";

// Warms the 3D prints up one at a time, in panel order, long before anyone scrolls to them:
// PrintPreload starts the queue once the 3D code has loaded, and each print lets the next one
// start as soon as it has drawn its first frame. `allowed` is how many may have a live canvas.
// Mounting a print blocks the page for a moment, so the queue only moves once scrolling has
// stopped for a beat and the browser is idle, never in the middle of a scroll-driven reel.
let allowed = 0;
const live = new Set<number>();
const listeners = new Set<() => void>();
let lastScroll = 0;
let timer = 0;
if (typeof window !== "undefined") addEventListener("scroll", () => (lastScroll = performance.now()), { passive: true });

// The next print in the queue, skipping any that went live out of turn (someone landed on them first).
function next() {
  let n = Math.max(allowed, 1);
  while (live.has(n - 1)) n++;
  return n;
}

function advance() {
  window.clearTimeout(timer);
  const wait = 400 - (performance.now() - lastScroll);
  if (wait > 0) {
    timer = window.setTimeout(advance, wait);
    return;
  }
  const go = () => {
    if (performance.now() - lastScroll < 400) return advance();
    const n = next();
    if (n === allowed) return;
    allowed = n;
    listeners.forEach((f) => f());
  };
  if (window.requestIdleCallback) window.requestIdleCallback(go, { timeout: 1000 });
  else go();
}

export const warm = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  allowed: () => allowed,
  start() {
    if (allowed === 0) advance();
  },
  // Print `index` is live: let the next one start.
  done(index: number) {
    live.add(index);
    if (allowed > 0) advance();
  },
};
