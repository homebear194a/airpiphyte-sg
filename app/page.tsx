import Link from "next/link";
import { ArrangingBlock } from "@/components/arranging";
import { MobileCta } from "@/components/chrome";
import { DepthField } from "@/components/motion/depth-field";
import { JarFill } from "@/components/motion/jar-fill";
import { Turntable } from "@/components/motion/turntable";
import { WorkshopWall } from "@/components/motion/workshop-wall";
import { Button, EnquiryButton, Eyebrow, Ph, Quote, Section, SectionHead, Shell, StatTile } from "@/components/ui";
import { GROUPS, REVIEWS, WORKSHOPS } from "@/lib/content";
import { REVIEW_COUNT, REVIEW_SCORE, enquiry } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* ---- hero -------------------------------------------------------
          Copy and CTA render on first paint, above the turntable, and never
          depend on it — Journey 1, step 2. A visitor who never triggers the
          motion still converts. */}
      <Turntable>
        <Shell className="relative grid gap-5">
          <Eyebrow>Terrarium &amp; plant workshops · Singapore</Eyebrow>
          <h1 className="max-w-[13ch] text-display-xl">
            Four ways to build a <em className="font-editorial font-normal not-italic italic text-frond">world.</em>
          </h1>
          <p className="max-w-[46ch] text-body-l text-moss">
            Two hours at a table. Every material and tool provided. You leave holding the thing
            you made.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-caption font-bold tabular">{REVIEW_SCORE} ★</span>
            <Eyebrow>across {REVIEW_COUNT} reviews</Eyebrow>
          </div>
          <div className="flex flex-wrap gap-2.5 pt-1.5">
            <EnquiryButton message={enquiry.general}>WhatsApp us</EnquiryButton>
            <Button href="#workshops" variant="ghost">
              See the four workshops
            </Button>
          </div>
        </Shell>
      </Turntable>

      {/* ---- the four · horizontal wall on vertical scroll ---------------
          The only journey-critical set-piece: this IS the page's navigation.
          Falls back to a 2×2 grid below lg and under reduced motion. */}
      <section id="workshops" className="border-t border-line pt-[clamp(56px,11vw,130px)]">
        <WorkshopWall workshops={WORKSHOPS} />
      </section>

      {/* ---- arranging (replaced the date list in v4.1) ------------------ */}
      <Section>
        <ArrangingBlock message={enquiry.general} />
      </Section>

      {/* ---- how it works · the jar fills -------------------------------- */}
      <section className="border-t border-line">
        <Shell className="pt-[clamp(56px,11vw,130px)]">
          <SectionHead
            eyebrow="The two hours"
            title="Nothing to bring but yourself."
            intro="Four layers, built from the bottom up. We explain why each one is there, which is the difference between a terrarium that lasts a year and one that lasts a week."
          />
        </Shell>
        <JarFill />
      </section>

      {/* ---- depth field · the one poetic line --------------------------
          Purely atmospheric. Nothing in any journey depends on it, which is
          why it is allowed to be the most decorative thing on the page — and
          why it is the first thing to cut under budget pressure. */}
      <section className="border-t border-line">
        <DepthField>
          <Eyebrow>Why a workshop, not a shop</Eyebrow>
          <h2 className="text-display-l">
            You make it.
            <br />
            <em className="font-editorial font-normal italic text-frond">You keep it.</em>
          </h2>
          <p className="max-w-[44ch] text-body text-moss">
            Everything is on the table when you sit down — glass, soil, moss, plants, tools. No
            experience needed, nothing to bring, nothing to clean up. Two hours later you are
            holding a small world that did not exist that morning.
          </p>
        </DepthField>
      </section>

      {/* ---- group teaser ------------------------------------------------ */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="grid gap-3">
            <Eyebrow>Private &amp; corporate</Eyebrow>
            <h2 className="text-display-l">Bring the whole team.</h2>
            <p className="max-w-[46ch] text-body text-moss">
              Team days, birthdays, hen parties and school groups, from{" "}
              <Ph>
                {GROUPS.studioMin} to {GROUPS.onsiteMax}
              </Ph>{" "}
              people. We come to your office, or you take over the studio.
            </p>
            <div className="pt-1.5">
              <Button href="/private" variant="ghost">
                Private &amp; corporate
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <StatTile value={`${GROUPS.studioMin}–${GROUPS.studioMax}`} label="Studio, one table" placeholder />
            <StatTile value={`${GROUPS.onsiteMin}–${GROUPS.onsiteMax}`} label="We come to you" placeholder />
            <StatTile value="90 min" label="Typical session" placeholder />
            <StatTile value="All four" label="Techniques available" />
          </div>
        </div>
      </Section>

      {/* ---- proof ------------------------------------------------------- */}
      <Section>
        <SectionHead eyebrow="Reviews" title="What people say after." />
        <div className="grid gap-5 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <Quote key={r.text} text={r.text} who={r.who} />
          ))}
        </div>
      </Section>

      {/* ---- closing ----------------------------------------------------- */}
      <Section>
        <div className="grid justify-items-center gap-5 text-center">
          <h2 className="text-[clamp(32px,6.4vw,80px)] leading-[0.96] font-bold tracking-[-0.035em]">
            Two hours.
            <br />
            <em className="font-editorial font-normal italic text-frond">You make it.</em>
            <br />
            You keep it.
          </h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            <EnquiryButton message={enquiry.general}>WhatsApp us</EnquiryButton>
            <Link
              href="/shop#gift"
              className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-line-control px-[18px] py-3 font-mono text-micro font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-frond/6"
            >
              Gift a workshop
            </Link>
          </div>
        </div>
      </Section>

      <MobileCta message={enquiry.general} label="WhatsApp us" />
    </>
  );
}
