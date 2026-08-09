import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrangingBlock } from "@/components/arranging";
import { MobileCta } from "@/components/chrome";
import { VesselIcon } from "@/components/icons";
import { PlantIndex } from "@/components/motion/plant-index";
import {
  ContactNote,
  EnquiryButton,
  Eyebrow,
  ImageSlot,
  Ph,
  Section,
  SectionHead,
  Shell,
} from "@/components/ui";
import { WorkshopCard } from "@/components/workshop-card";
import { WORKSHOPS, getWorkshop } from "@/lib/content";
import { SITE, enquiry } from "@/lib/site";

export function generateStaticParams() {
  return WORKSHOPS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWorkshop(slug);
  if (!w) return {};
  // Search terms lead, brand trails.
  return {
    title: `${w.name} Workshop Singapore`,
    description: `${w.plain} ${w.lede}`,
    alternates: { canonical: `/workshops/${w.slug}` },
  };
}

export default async function WorkshopPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workshop = getWorkshop(slug);
  if (!workshop) notFound();

  const others = WORKSHOPS.filter((w) => w.slug !== workshop.slug);
  const message = enquiry.workshop(workshop.name);

  /* Service, not Event. v4.1 removed the schedule and Event requires a
     startDate — inventing one to win a rich result would be lying to a search
     engine about a session that does not exist. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${workshop.name} Workshop`,
    provider: { "@type": "LocalBusiness", name: SITE.name, areaServed: "Singapore" },
    description: workshop.lede,
    serviceType: "Terrarium workshop",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---- header block: everything Wei Ling needs to qualify, no scroll -- */}
      <Shell className="grid items-start gap-14 pt-14 lg:grid-cols-2">
        <div className="grid gap-4">
          <span className="font-mono text-micro tracking-[0.14em] text-bract">
            {workshop.number} — {workshop.techniqueLabel.toUpperCase()}
          </span>
          <h1 className="text-display-l">{workshop.name}</h1>
          <p className="max-w-[44ch] text-body-l text-moss">{workshop.lede}</p>
          <div className="pt-1 font-mono text-body-s tabular">
            <Ph>{workshop.price}</Ph> · <Ph>{workshop.duration}</Ph> · <Ph>{workshop.capacity}</Ph>
          </div>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <EnquiryButton message={message}>WhatsApp about this workshop</EnquiryButton>
          </div>
          <Eyebrow>Opens WhatsApp with your message already written</Eyebrow>
        </div>

        <ImageSlot wash={workshop.wash} className="aspect-[4/3]" label="reshoot on white">
          <VesselIcon technique={workshop.technique} size={90} className="text-ink" />
        </ImageSlot>
      </Shell>

      <Section>
        <ArrangingBlock
          workshopName={workshop.name}
          message={message}
          duration={workshop.duration}
        />
      </Section>

      {/* ---- what you'll make -------------------------------------------- */}
      <Section>
        <SectionHead eyebrow="What you'll make" title={workshop.makes} />
        <div className="grid gap-5 sm:grid-cols-3">
          {["hands mid-build", "the detail", "the table, overhead"].map((l) => (
            <ImageSlot
              key={l}
              wash="from-[#E2E9DB] to-[#FBFCF8]"
              family="process"
              label={l}
              className="aspect-[4/3]"
            />
          ))}
        </div>
      </Section>

      {/* ---- included + plants -------------------------------------------- */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="What's included" title="Nothing to bring." />
            <ul className="grid gap-2">
              {workshop.included.map((i) => (
                <li key={i} className="border-b border-line pb-2 text-body-s text-moss">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow="What you'll be planting" title="Know what you're keeping." />
            <PlantIndex
              plants={workshop.plants}
              washes={[workshop.wash, "from-[#E2E9DB] to-[#FBFCF8]", "from-[#EDEFCB] to-[#FBFCF8]"]}
            />
          </div>
        </div>
      </Section>

      {/* ---- take-home card + FAQ ----------------------------------------- */}
      <Section>
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="What you take home" title="The card in the box." />
            <p className="mb-4 max-w-[46ch] text-body-s text-moss">
              Numbered, with a blank you fill in with your own name, the plant&rsquo;s binomial,
              and the three lines of care that answer the only question that matters afterwards.
            </p>
            <div className="grid justify-items-center rounded-sm bg-gradient-to-br from-[#EAEEE4] to-paper p-6">
              <div className="grid w-[212px] gap-2 border border-line-2 bg-[#FCFCF8] p-4 shadow-[0_14px_26px_rgba(22,36,26,0.10)]">
                <span className="font-mono text-[8px] tracking-[0.14em] text-bract">
                  No. 0142 · {workshop.number} {workshop.techniqueLabel.toUpperCase()}
                </span>
                <span className="text-[15px] font-bold tracking-[-0.02em]">Made by ______</span>
                <span className="font-editorial text-caption italic text-moss">
                  {workshop.plants[0].binomial}
                </span>
                <hr className="border-line" />
                <div className="font-mono text-[8.5px] uppercase leading-[1.9] tracking-[0.06em] text-moss">
                  {workshop.care.map((c) => (
                    <div key={c}>{c}</div>
                  ))}
                </div>
                <div className="border-t border-dashed border-line-2 pt-1.5">
                  <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-moss">
                    airpiphyte.sg · @airpiphyte
                  </span>
                </div>
              </div>
            </div>
            {/* QA: standalone block links need a 44px target — the inline-link
                exception in WCAG 2.5.8 does not cover a link on its own line. */}
            <Link
              href={`/care#${workshop.technique}`}
              className="mt-2 inline-flex min-h-[44px] items-center text-caption text-frond hover:underline"
            >
              Full {workshop.name.toLowerCase()} care guide &rarr;
            </Link>
          </div>

          <div>
            <SectionHead eyebrow="Questions" title="Before you ask." />
            <div className="border-t border-line">
              {workshop.faq.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-body marker:hidden">
                    {f.q}
                    <span className="text-trichome transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-4 text-body-s text-moss">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ---- the other three ---------------------------------------------- */}
      <Section>
        <SectionHead eyebrow="The other three" title="Or start somewhere else." />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5">
          {others.map((w) => (
            <WorkshopCard key={w.slug} workshop={w} compact />
          ))}
        </div>
      </Section>

      {/* ---- closing ------------------------------------------------------- */}
      <Section>
        <div className="grid justify-items-center gap-5 text-center">
          <h2 className="text-display-l">
            Two hours. <em className="font-editorial font-normal italic text-frond">You make it.</em>{" "}
            You keep it.
          </h2>
          <EnquiryButton message={message}>WhatsApp about {workshop.name}</EnquiryButton>
          <ContactNote />
        </div>
      </Section>

      <MobileCta message={message} label={`WhatsApp about ${workshop.name}`} />
    </>
  );
}
