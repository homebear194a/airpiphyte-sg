"use client";

import { useMemo, useRef } from "react";
import { useScrollProgress } from "./use-scroll-driver";

/**
 * The depth field.
 *
 * Glass vessels at simulated depths drifting at different rates behind the one
 * poetic line on the page. Purely atmospheric — nothing in any journey depends
 * on it, which is exactly why it is allowed to be the most decorative thing
 * here, and why it is the first thing to cut if the performance budget tightens.
 *
 * Renders nothing at all under reduced motion: a static field of pale circles
 * adds no information, so hiding it is better than freezing it.
 */

const COUNT = 8;

export function DepthField({ children }: { children: React.ReactNode }) {
  const fieldRef = useRef<HTMLDivElement | null>(null);

  const trackRef = useScrollProgress((p) => {
    const nodes = fieldRef.current?.querySelectorAll<HTMLElement>("[data-depth-float]");
    nodes?.forEach((el) => {
      const z = Number(el.dataset.z);
      el.style.transform = `translate3d(0, ${((0.5 - p) * 480 * z).toFixed(1)}px, 0)`;
    });
  });

  // Deterministic placement — server and client must agree.
  const floats = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        key: i,
        size: 46 + (i % 4) * 38,
        left: `${5 + ((i * 137) % 86)}%`,
        top: `${8 + ((i * 71) % 76)}%`,
        z: 0.25 + (i % 4) * 0.4,
      })),
    []
  );

  return (
    <div ref={trackRef} data-pinned-track className="relative h-auto lg:h-[220vh]">
      <div
        data-pinned
        ref={fieldRef}
        className="static grid place-items-center overflow-hidden py-16 lg:sticky lg:top-0 lg:h-screen lg:py-0"
      >
        {floats.map((f) => (
          <i
            key={f.key}
            data-depth-float
            data-z={f.z}
            aria-hidden="true"
            style={{ width: f.size, height: f.size, left: f.left, top: f.top }}
            className="pointer-events-none absolute rounded-full border border-ink/7 bg-[radial-gradient(38%_32%_at_32%_26%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0)_62%),radial-gradient(70%_70%_at_50%_60%,rgba(169,187,162,0.28)_0%,rgba(169,187,162,0.05)_72%)] will-change-transform"
          />
        ))}
        <div className="relative z-10 grid justify-items-center gap-3.5 px-6 text-center">
          {children}
        </div>
      </div>
    </div>
  );
}
