"use client";

import { useState } from "react";
import type { Plant } from "@/lib/content";
import { ImageSlot } from "@/components/ui";

/**
 * The plant index.
 *
 * Hovering or focusing a binomial crossfades the plate through a blur, so the
 * eye reads one transformation rather than two photographs swapping.
 *
 * Rows are buttons driven by mouseenter, focus AND click — hover alone would
 * make this unusable on touch and unreachable by keyboard. The only set-piece
 * on the site that holds React state, and it is a single index.
 */
export function PlantIndex({ plants, washes }: { plants: Plant[]; washes: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid items-center gap-[clamp(24px,5vw,60px)] lg:grid-cols-[1.1fr_1fr]">
      <div>
        {plants.map((p, i) => (
          <button
            key={p.binomial}
            type="button"
            aria-current={i === active}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className="group grid w-full grid-cols-[auto_1fr] items-baseline gap-4 border-b border-line py-4 text-left transition-[padding-left] duration-[240ms] ease-[var(--ease-out)] hover:pl-3.5 aria-[current=true]:pl-3.5 sm:grid-cols-[auto_1fr_auto]"
          >
            <span className="font-mono text-micro text-bract">
              {String(i + 1).padStart(3, "0")}
            </span>
            <span className="font-editorial text-[clamp(18px,2.4vw,26px)] italic text-trichome transition-colors duration-[240ms] ease-[var(--ease-out)] group-aria-[current=true]:text-ink">
              {p.binomial}
            </span>
            <span className="text-caption text-moss">{p.common}</span>
          </button>
        ))}
        <p className="mt-4 text-body-s text-moss">{plants[active].note}</p>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-card">
        {plants.map((p, i) => (
          <div
            key={p.binomial}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-[opacity,filter,transform] duration-[320ms] ease-[var(--ease-out)] ${
              i === active ? "scale-100 opacity-100 blur-0" : "scale-[1.04] opacity-0 blur-[9px]"
            }`}
          >
            <ImageSlot wash={washes[i % washes.length]} className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
