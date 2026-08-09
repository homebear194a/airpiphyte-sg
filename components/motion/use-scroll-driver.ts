"use client";

import { useEffect, useRef } from "react";

/**
 * One shared scroll driver for the whole page.
 *
 * Five independent scroll listeners would each fire on every scroll event and
 * each force its own layout read. This reads geometry once per frame behind a
 * single passive listener and writes only transforms and custom properties.
 *
 * React state is never touched, so no set-piece re-renders while scrolling.
 */

type Subscriber = (progress: number) => void;

interface Entry {
  el: HTMLElement;
  fn: Subscriber;
}

const subscribers = new Set<Entry>();
let ticking = false;
let started = false;

function progressOf(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const total = rect.height - window.innerHeight;
  if (total <= 0) return 0;
  const p = -rect.top / total;
  return p < 0 ? 0 : p > 1 ? 1 : p;
}

function frame() {
  ticking = false;
  for (const { el, fn } of subscribers) fn(progressOf(el));
}

function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(frame);
  }
}

function start() {
  if (started) return;
  started = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}

function stop() {
  if (!started || subscribers.size > 0) return;
  started = false;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Subscribe an element's scroll progress (0→1 across its own height) to a
 * per-frame callback. The callback should only write `transform`, `opacity` or
 * custom properties that resolve to those.
 *
 * Does nothing when the visitor prefers reduced motion — every set-piece has a
 * CSS fallback, so nothing depends on this having run.
 */
export function useScrollProgress(fn: Subscriber) {
  const ref = useRef<HTMLDivElement | null>(null);
  const fnRef = useRef(fn);

  // Kept current in an effect rather than during render — mutating a ref while
  // rendering breaks under concurrent rendering, and ESLint is right to reject
  // it. The subscription below reads through fnRef, so it always sees the
  // latest callback without needing to resubscribe.
  useEffect(() => {
    fnRef.current = fn;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const entry: Entry = { el, fn: (p) => fnRef.current(p) };
    subscribers.add(entry);
    start();
    onScroll();

    return () => {
      subscribers.delete(entry);
      stop();
    };
  }, []);

  return ref;
}
