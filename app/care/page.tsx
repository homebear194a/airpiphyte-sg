import type { Metadata } from "next";
import { MobileCta } from "@/components/chrome";
import { VesselIcon } from "@/components/icons";
import { EnquiryButton, Eyebrow, Section, Shell } from "@/components/ui";
import { CARE, type TechniqueSlug } from "@/lib/content";
import { enquiry } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Care for a Terrarium or Kokedama in Singapore",
  description:
    "Watering, light and the two most common ways each build dies — one section per technique: closed terrarium, air plant globe, succulents and kokedama.",
  alternates: { canonical: "/care" },
};

/**
 * One page, four anchored sections — not four thin pages, which would compete
 * with each other. The workshop pages deep-link into these anchors.
 *
 * The best CTA on the site lives at the bottom: "send us a photo" converts an
 * existing owner into a returning student, and photo-sending is native to
 * WhatsApp.
 */
export default function CarePage() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CARE.map((c) => ({
      "@type": "Question",
      name: `${c.trouble.q} (${c.name})`,
      acceptedAnswer: { "@type": "Answer", text: c.trouble.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      <Shell className="grid gap-4 pt-16">
        <Eyebrow>Care</Eyebrow>
        <h1 className="text-display-l">How to keep it alive.</h1>
        <p className="max-w-[56ch] text-body-l text-moss">
          One section per technique. If you are not sure what you have, send us a photo — that is
          genuinely the fastest way.
        </p>
      </Shell>

      <Section>
        <div className="border-t border-line-2">
          {CARE.map((c) => (
            <article
              key={c.id}
              id={c.id}
              className="grid gap-4 border-b border-line py-6 lg:grid-cols-[230px_1fr] lg:gap-6"
            >
              <div className="grid content-start gap-1.5">
                <span className="font-mono text-micro tracking-[0.14em] text-bract">
                  {c.number} — {c.label.toUpperCase()}
                </span>
                <b className="text-heading">{c.name}</b>
                <VesselIcon technique={c.id as TechniqueSlug} size={26} className="text-ink" />
              </div>
              <div className="grid gap-2.5">
                <div className="font-mono text-caption uppercase leading-[1.9] tracking-[0.06em] text-moss">
                  {c.lines.join(" · ")}
                </div>
                <p className="text-body-s text-moss">{c.body}</p>
                <p className="text-body-s text-moss">
                  <b className="text-ink">{c.trouble.q}</b> {c.trouble.a}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6 rounded-md border border-line bg-card p-6">
          <div className="grid gap-1.5">
            <b className="text-heading">Not sure what you have?</b>
            <span className="text-body-s text-moss">
              Send us a photo. We will tell you what it is and what it wants.
            </span>
          </div>
          <EnquiryButton message={enquiry.carePhoto} subject="Care question">
            WhatsApp us a photo
          </EnquiryButton>
        </div>
      </Section>

      <MobileCta message={enquiry.carePhoto} label="WhatsApp us a photo" />
    </>
  );
}
