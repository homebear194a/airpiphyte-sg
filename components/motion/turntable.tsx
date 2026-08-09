"use client";

import { useMemo, useRef } from "react";
import { useScrollProgress } from "./use-scroll-driver";

/**
 * The hero turntable.
 *
 * A rosette rotates ~400° across a pinned hero as you scroll.
 *
 * INTERIM IMPLEMENTATION. The brief specifies this ships as a scroll-scrubbed
 * image sequence of a *real* finished piece — 36–48 WebP frames under 500KB
 * total, not WebGL — because that survives the Instagram in-app browser where
 * a WebGL context would not. That needs photography which does not exist yet.
 *
 * Until the reshoot, this is a CSS 3D rosette: same timing, same scroll
 * contract, same reduced-motion behaviour, no photography required. Swapping
 * it later means replacing the inner render only — the track, the driver
 * subscription and the fallback all stay.
 *
 * The hero copy and CTA are NOT inside this component. They render above it on
 * first paint and never depend on it, so a visitor who never triggers the
 * motion still converts.
 */

const LEAF_COUNT = 10;

export function Turntable({ children }: { children: React.ReactNode }) {
  const rosetteRef = useRef<HTMLDivElement | null>(null);

  const trackRef = useScrollProgress((p) => {
    rosetteRef.current?.style.setProperty("--p", p.toFixed(4));
  });

  // Deterministic so server and client markup match — no Math.random().
  const leaves = useMemo(
    () =>
      Array.from({ length: LEAF_COUNT }, (_, i) => {
        const spin = (360 / LEAF_COUNT) * i;
        const tilt = 30 + (i % 3) * 8;
        const scale = 0.7 + ((i * 37) % 100) / 340;
        const brightness = 0.86 + (i % 4) * 0.07;
        return {
          key: i,
          transform: `rotateY(${spin}deg) rotateX(${-tilt}deg) translateZ(22px) scale(${scale.toFixed(2)})`,
          filter: `brightness(${brightness.toFixed(2)})`,
        };
      }),
    []
  );

  /**
   * Owns a real pinned track, the way DepthField does.
   *
   * An earlier version was `absolute inset-0` inside a one-viewport hero, so
   * `rect.height - innerHeight` came out at zero and progress was pinned at 0
   * forever — the rosette rendered but never turned. A scrubbed set-piece needs
   * scroll distance of its own, so the hero is 250vh at xl with its contents
   * stuck to the top, giving 150vh of travel.
   *
   * Below xl there is no track and no pin: the hero is an ordinary block and
   * this renders nothing but the static copy.
   */
  return (
    <div ref={trackRef} data-pinned-track className="relative h-auto xl:h-[250vh]">
      <div
        data-pinned
        className="static overflow-hidden py-[clamp(46px,8vw,86px)] xl:sticky xl:top-0 xl:flex xl:h-screen xl:items-center xl:py-0"
      >
        {/* the rosette sits behind the copy and never gates it */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[5%] top-1/2 hidden -translate-y-1/2 xl:block"
        >
          <div className="relative grid aspect-square w-[min(430px,30vw)] place-items-center [perspective:950px]">
          {/* the glass */}
          <div className="absolute aspect-square w-[62%] rounded-full border border-ink/8 bg-[radial-gradient(38%_32%_at_32%_26%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0)_60%),radial-gradient(70%_70%_at_50%_60%,rgba(169,187,162,0.26)_0%,rgba(169,187,162,0.05)_72%)] shadow-[inset_-14px_-18px_34px_rgba(22,36,26,0.05),0_24px_44px_rgba(22,36,26,0.06)]" />

          {/* the rosette — rotateY is driven by --p, set once per frame */}
          <div
            ref={rosetteRef}
            data-turntable
            className="h-full w-full [transform-style:preserve-3d] [transform:rotateX(calc(12deg+var(--p,0)*22deg))_rotateY(calc(var(--p,0)*400deg))]"
          >
            {leaves.map((l) => (
              <i
                key={l.key}
                style={{ transform: l.transform, filter: l.filter }}
                className="absolute inset-0 bottom-[44%] m-auto h-[52%] w-[13%] origin-[50%_100%] rounded-[50%_50%_8%_8%_/_62%_62%_4%_4%] bg-[linear-gradient(178deg,#DCE7D4_0%,#A9BBA2_42%,#4E7B4A_80%,#2C4A2E_100%)] shadow-[inset_0_0_12px_rgba(22,36,26,0.16)]"
              />
            ))}
            </div>
          </div>
        </div>

        {/* hero copy — rendered on first paint, above the rosette */}
        <div className="relative w-full">{children}</div>
      </div>
    </div>
  );
}
