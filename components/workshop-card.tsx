import Link from "next/link";
import type { Workshop } from "@/lib/content";
import { VesselIcon } from "./icons";
import { ImageSlot, Ph } from "./ui";

/**
 * The workshop card.
 *
 * Price and duration sit on the card face — a binding rule from Journey 1.
 * Wei Ling is comparing this against a film and a brunch, both of which publish
 * a price; if the site makes her tap to find out, she does not tap.
 *
 * The whole card is the link. The mockup used a separate CTA button labelled
 * "See dates", which broke when the schedule was removed; a card that is itself
 * the target cannot promise something it does not have.
 */
export function WorkshopCard({ workshop, compact = false }: { workshop: Workshop; compact?: boolean }) {
  return (
    <Link
      href={`/workshops/${workshop.slug}`}
      className="group grid content-start overflow-hidden rounded-md border border-line bg-card transition-colors duration-[220ms] ease-[var(--ease-out)] hover:border-line-control"
    >
      <ImageSlot
        wash={workshop.wash}
        className="aspect-[4/3] border-0 border-b border-line rounded-none"
        label="reshoot on white"
      >
        <VesselIcon technique={workshop.technique} size={compact ? 34 : 46} className="text-ink" />
      </ImageSlot>

      <div className="grid gap-1.5 p-3.5">
        <span className="font-mono text-micro tracking-[0.14em] text-bract">
          {workshop.number} — {workshop.techniqueLabel.toUpperCase()}
        </span>
        <b className={compact ? "text-[16px] tracking-[-0.02em]" : "text-heading"}>{workshop.name}</b>
        <span className="text-caption leading-[1.45] text-moss">{workshop.plain}</span>
        <span className="pt-0.5 font-mono text-caption tabular">
          <Ph>{workshop.price}</Ph> · <Ph>{workshop.duration}</Ph>
        </span>
      </div>

      <div className="border-t border-line px-3.5 py-3">
        <span className="font-mono text-micro uppercase tracking-[0.1em] text-frond">
          What you&rsquo;ll make
          <span className="ml-1.5 inline-block transition-transform duration-[220ms] ease-[var(--ease-out)] group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
