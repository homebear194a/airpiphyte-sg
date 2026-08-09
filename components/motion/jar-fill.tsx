"use client";

import { useRef } from "react";
import { useScrollProgress } from "./use-scroll-driver";

/**
 * The jar fills.
 *
 * Four layers build bottom-up as the section scrolls, and each caption lights
 * as its layer arrives. The cheapest set-piece in the system and the only one
 * that teaches: a visitor who scrolls past it has learned why a closed
 * terrarium has four layers, which is exactly the question the take-home card
 * exists to answer.
 *
 * No animation library. One custom property driving one `clip-path`, which is
 * why it holds 60fps in Instagram's in-app browser where a JS-driven
 * equivalent would not. Zero React state, so zero re-renders.
 */

const LAYERS = [
  {
    at: 0.02,
    height: "22%",
    from: "#9AA6A0",
    to: "#7E8B85",
    n: "01",
    title: "Drainage",
    body: "Lava rock at the bottom. Water has to go somewhere, and roots must never sit in it.",
  },
  {
    at: 0.26,
    height: "12%",
    from: "#3A423D",
    to: "#2A302C",
    n: "02",
    title: "Charcoal",
    body: "A thin filter layer. This is what stops a sealed jar smelling like a pond by week three.",
  },
  {
    at: 0.42,
    height: "44%",
    from: "#6B4A2E",
    to: "#543A24",
    n: "03",
    title: "Soil",
    body: "The deepest layer, and the one people under-fill. Roots need more room than they look like they need.",
  },
  {
    at: 0.82,
    height: "22%",
    from: "#7FA85E",
    to: "#4E7B4A",
    n: "04",
    title: "Moss",
    body: "The lid on the soil. Holds humidity in, and it is the part you actually see.",
  },
];

export function JarFill() {
  const fillRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);

  const trackRef = useScrollProgress((p) => {
    fillRef.current?.style.setProperty("--r", p.toFixed(4));
    const steps = stepsRef.current?.querySelectorAll<HTMLElement>("[data-jar-step]");
    steps?.forEach((s) => {
      const at = Number(s.dataset.at);
      s.dataset.on = p >= at ? "true" : "false";
    });
  });

  return (
    <div ref={trackRef} data-pinned-track className="relative h-[320vh]">
      <div data-pinned className="sticky top-0 grid h-screen place-items-center">
        <div className="mx-auto grid w-full max-w-[1000px] items-center gap-14 px-[clamp(18px,4vw,44px)] lg:grid-cols-[300px_1fr]">
          {/* the jar */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px]">
            <div className="absolute -top-3.5 left-[26%] h-4 w-[48%] rounded-t-sm border border-b-0 border-line-2 bg-card" />
            <div className="absolute inset-0 overflow-hidden rounded-[6%_6%_44%_44%_/_3%_3%_22%_22%] border-[1.5px] border-line-2 bg-gradient-to-br from-white/90 to-[#F0F4EC]/60">
              <div
                ref={fillRef}
                data-jar-fill
                className="absolute inset-0 flex flex-col-reverse [clip-path:inset(calc((1_-_var(--r,0))_*_100%)_0_0_0)] will-change-[clip-path]"
              >
                {LAYERS.map((l) => (
                  <div
                    key={l.n}
                    style={{ height: l.height, background: `linear-gradient(180deg, ${l.from}, ${l.to})` }}
                  />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,transparent_34%,rgba(255,255,255,0.55)_45%,transparent_56%)]" />
            </div>
          </div>

          {/* the captions */}
          <div ref={stepsRef} className="grid gap-1">
            {LAYERS.map((l) => (
              <div
                key={l.n}
                data-jar-step
                data-at={l.at}
                data-on="false"
                className="grid grid-cols-[34px_1fr] items-start gap-4 border-b border-line py-3.5 opacity-[0.34] transition-[opacity,transform] duration-[220ms] ease-[var(--ease-out)] data-[on=true]:translate-x-1.5 data-[on=true]:opacity-100"
              >
                <span
                  className="h-[34px] w-[34px] rounded-sm border border-ink/15"
                  style={{ background: `linear-gradient(180deg, ${l.from}, ${l.to})` }}
                />
                <div>
                  <span className="font-mono text-micro tracking-[0.14em] text-bract">{l.n}</span>
                  <h3 className="text-heading">{l.title}</h3>
                  <p className="mt-0.5 text-body-s text-moss">{l.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
