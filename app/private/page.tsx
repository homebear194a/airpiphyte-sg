import type { Metadata } from "next";
import { MobileCta } from "@/components/chrome";
import {
  EmailButton,
  EnquiryButton,
  Eyebrow,
  ImageSlot,
  Ph,
  Section,
  SectionHead,
  Shell,
  StatTile,
} from "@/components/ui";
import { GROUPS } from "@/lib/content";
import { enquiry } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corporate & Private Terrarium Workshops Singapore",
  description:
    "Team days, birthdays, hen parties and school groups from 8 to 40 people. We come to your office, or you take over the studio.",
  alternates: { canonical: "/private" },
};

/**
 * Must convert cold — Priya should be able to arrive here from a search and
 * enquire without visiting another page, so this page repeats what it needs
 * rather than linking away.
 *
 * The one deliberate inconsistency on the site: email sits level with WhatsApp
 * here and nowhere else. She is on a desktop during work hours and may need a
 * written trail; forcing her onto a phone-first channel is friction no other
 * persona experiences. Journey 2, step 7 — do not "fix" this in a consistency pass.
 */
export default function PrivatePage() {
  return (
    <>
      <Shell className="grid items-start gap-14 pt-16 lg:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-4">
          <Eyebrow>Private &amp; corporate</Eyebrow>
          <h1 className="text-display-l">Bring the whole team.</h1>
          <p className="max-w-[46ch] text-body-l text-moss">
            Team days, birthdays, hen parties and school groups, from{" "}
            <Ph>
              {GROUPS.studioMin} to {GROUPS.onsiteMax}
            </Ph>{" "}
            people. We come to your office, or you take over the studio. One message, a reply the
            same day.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <EnquiryButton message={enquiry.group} subject="Group workshop enquiry">
              WhatsApp us
            </EnquiryButton>
            <EmailButton subject="Group workshop enquiry" body={enquiry.group}>
              Email us
            </EmailButton>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <StatTile value={`${GROUPS.studioMin}–${GROUPS.studioMax}`} label="Studio, one table" placeholder />
          <StatTile value={`${GROUPS.onsiteMin}–${GROUPS.onsiteMax}`} label="We come to you" placeholder />
          <StatTile value="90 min" label="Typical session" placeholder />
          <StatTile value="All four" label="Techniques available" />
        </div>
      </Shell>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="How it works" title="What to expect." />
            <dl className="border-t border-line">
              {[
                ["Lead time", <><Ph key="lt">{GROUPS.leadTime}</Ph> is comfortable. We have turned things around in three days.</>],
                ["You provide", "Tables, chairs, and somewhere to rinse hands. That is genuinely all."],
                ["We bring", "Every plant, vessel, tool and covering. We clean up afterwards."],
                ["Everyone leaves with", "Their own finished piece, boxed, with a numbered care card."],
              ].map(([term, desc], i) => (
                <div key={i} className="grid gap-1 border-b border-line py-3.5 sm:grid-cols-[150px_1fr] sm:gap-4">
                  <dt>
                    <Eyebrow>{term as string}</Eyebrow>
                  </dt>
                  <dd className="text-body-s text-moss">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <SectionHead eyebrow="Cost" title="Roughly what it comes to." />
            <div className="grid gap-3.5 rounded-md border border-line bg-card p-6">
              <div className="flex items-baseline gap-2.5">
                <Eyebrow>From</Eyebrow>
                <span className="font-mono text-[38px] font-bold tracking-[-0.03em] tabular">
                  <Ph>{GROUPS.perHeadFrom}</Ph>
                </span>
                <Eyebrow>per person</Eyebrow>
              </div>
              <hr className="border-line" />
              <p className="text-body-s text-moss">
                What moves it: group size, which workshop, whether we travel, and how far. Send us
                the four facts below and you will get a real number, not a range.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <ImageSlot
            wash="from-[#E2E9DB] to-[#FBFCF8]"
            family="process"
            label="a real group session, headcount in the caption"
            className="aspect-[4/3]"
          />
          <div className="grid gap-3">
            <Eyebrow>Proof</Eyebrow>
            <h2 className="text-display-m">We have done this before.</h2>
            <blockquote className="text-body text-moss">
              &ldquo;Twenty-two of us, in our own meeting room, and they cleaned up so well you
              would not have known. Half the team still has theirs on their desk.&rdquo;
            </blockquote>
            <Eyebrow>Office manager · 22 people · on-site</Eyebrow>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Occasions" title="Not only offices." />
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <StatTile value="Team days" label="The most common" />
          <StatTile value="Birthdays" label="Adults and children" />
          <StatTile value="Hen parties" label="Calmer than the alternative" />
          <StatTile value="School groups" label="Curriculum-friendly" />
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 rounded-md border border-line bg-card p-6">
          <Eyebrow>Tell us four things</Eyebrow>
          <h2 className="text-display-m">So the first reply is a real quote.</h2>
          <ol className="grid gap-1.5">
            {[
              "How many people",
              "A rough date, even just a month",
              "Which workshop, if you have a preference",
              "Your office, or our studio",
            ].map((t, i) => (
              <li key={t} className="flex gap-2 text-body-s text-moss">
                <b className="text-ink">{i + 1}</b> {t}
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-2.5">
            <EnquiryButton message={enquiry.group} subject="Group workshop enquiry">
              WhatsApp us
            </EnquiryButton>
            <EmailButton subject="Group workshop enquiry" body={enquiry.group}>
              Email us
            </EmailButton>
          </div>
        </div>
      </Section>

      <MobileCta message={enquiry.group} label="Enquire for a group" />
    </>
  );
}
