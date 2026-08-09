import type { Metadata } from "next";
import { MobileCta } from "@/components/chrome";
import {
  EnquiryButton,
  Eyebrow,
  ImageSlot,
  Ph,
  Quote,
  Section,
  Shell,
} from "@/components/ui";
import { REVIEWS } from "@/lib/content";
import {
  CAROUSELL,
  EMAIL,
  REVIEW_COUNT,
  REVIEW_SCORE,
  WHATSAPP_NUMBER,
  enquiry,
  isEnquiryLive,
  mailtoLink,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Studio",
  description:
    "One person at a table showing you where the layers go and why. 4.99 stars across 84 reviews.",
  alternates: { canonical: "/about" },
};

/**
 * Small page, and in an enquiry-led site trust IS the conversion. This page
 * removes the last hesitation for all three personas: a real person, the
 * review proof, and the reply-time promise.
 */
export default function AboutPage() {
  return (
    <>
      <Shell className="grid items-center gap-12 pt-16 lg:grid-cols-[1fr_1.2fr]">
        <ImageSlot
          wash="from-[#E2E9DB] to-[#FBFCF8]"
          family="process"
          label="the maker, at the table"
          className="aspect-[4/5]"
        />
        <div className="grid gap-4">
          <Eyebrow>About</Eyebrow>
          <h1 className="text-display-m">It started with one jar that refused to die.</h1>
          <p className="text-body text-moss">
            I sealed a jar in 2019, forgot about it for eight months, and found it thriving on a
            shelf. That was the whole idea: a small world that looks after itself, if you build it
            properly. Airpiphyte is four workshops now, but it is still one person at a table
            showing you where the layers go and why.
          </p>
          <p className="text-body text-moss">
            Bring a figurine. Everybody asks, and the answer is always yes.
          </p>
        </div>
      </Shell>

      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="grid content-start gap-2">
            <span className="font-mono text-[46px] font-bold tracking-[-0.03em] tabular">
              {REVIEW_SCORE} ★
            </span>
            <Eyebrow>
              Across {REVIEW_COUNT} reviews on{" "}
              <a href={CAROUSELL} target="_blank" rel="noopener noreferrer" className="text-frond hover:underline">
                Carousell
              </a>
            </Eyebrow>
          </div>
          {REVIEWS.slice(0, 2).map((r) => (
            <Quote key={r.text} text={r.text} who={r.who} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-md border border-line bg-card p-6">
          <div className="grid gap-1.5">
            <b className="text-heading">We usually reply within a few hours.</b>
            <span className="text-body-s text-moss">
              Message any time — evenings included.{" "}
              <span className="select-all font-mono tabular">
                {isEnquiryLive ? `+${WHATSAPP_NUMBER}` : <Ph>+65 XXXX XXXX</Ph>}
              </span>{" "}
              ·{" "}
              <a href={mailtoLink("Hello")} className="text-frond hover:underline">
                {EMAIL}
              </a>
            </span>
          </div>
          <EnquiryButton message={enquiry.general}>WhatsApp us</EnquiryButton>
        </div>
      </Section>

      <MobileCta message={enquiry.general} label="WhatsApp us" />
    </>
  );
}
