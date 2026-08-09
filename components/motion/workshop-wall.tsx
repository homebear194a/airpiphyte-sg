"use client";

import { useRef } from "react";
import type { Workshop } from "@/lib/content";
import { WorkshopCard } from "@/components/workshop-card";
import { Eyebrow } from "@/components/ui";
import { useScrollProgress } from "./use-scroll-driver";

/**
 * The four wall.
 *
 * Vertical scroll drives horizontal translation across the four workshop cards.
 *
 * This is the ONLY journey-critical set-piece — it is the page's navigation,
 * not decoration — so its fallbacks matter more than the others:
 *
 *   • below lg   → a plain 2×2 grid, no pinning, no transform
 *   • touch      → the same grid; nothing depends on hover or scrub
 *   • reduced motion → globals.css releases the pin and clears the transform,
 *                      and the row becomes a native overflow scroller
 *
 * Price and duration sit on every card face at every state, so a visitor who
 * never triggers the horizontal motion can still qualify all four.
 *
 * The transform is written as a string rather than framer-motion's `x`
 * shorthand: the shorthand runs on the main thread and drops frames during
 * page load.
 */
export function WorkshopWall({ workshops }: { workshops: Workshop[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const pinRef = useScrollProgress((p) => {
    const el = trackRef.current;
    if (!el) return;
    // Only scrub once the wall is actually laid out as a row (lg and up).
    if (window.innerWidth < 1024) {
      el.style.removeProperty("--x");
      return;
    }
    const overflow = Math.max(0, el.scrollWidth - window.innerWidth + 80);
    el.style.setProperty("--x", `${(p * overflow).toFixed(1)}px`);
  });

  return (
    <div
      ref={pinRef}
      data-pinned-track
      className="relative h-auto lg:h-[300vh]"
    >
      <div
        data-pinned
        className="static grid content-center gap-6 overflow-hidden lg:sticky lg:top-0 lg:h-screen"
      >
        <div className="mx-auto grid w-full max-w-[1180px] gap-2 px-[clamp(18px,4vw,44px)]">
          <Eyebrow>The four techniques</Eyebrow>
          <h2 className="text-display-m">Sealed. Open. Potted. Bound.</h2>
        </div>

        <div data-wall-scroller className="lg:overflow-visible">
          <div
            ref={trackRef}
            data-wall-track
            className="grid grid-cols-2 gap-3 px-[clamp(18px,4vw,44px)] will-change-transform lg:flex lg:gap-5 lg:[transform:translate3d(calc(var(--x,0px)*-1),0,0)]"
          >
            {workshops.map((w) => (
              /* Wide enough that roughly two and a half cards fit the viewport.
                 At clamp(250px,30vw,340px) the four cards barely exceeded 1440
                 and the wall exhausted its travel at 30% of the track — the
                 motion was technically working and visually invisible. */
              <div key={w.slug} className="lg:w-[clamp(300px,32vw,460px)] lg:shrink-0">
                <WorkshopCard workshop={w} compact />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto hidden w-full max-w-[1180px] px-[clamp(18px,4vw,44px)] lg:block">
          <Eyebrow>Horizontal on vertical scroll</Eyebrow>
        </div>
      </div>
    </div>
  );
}
