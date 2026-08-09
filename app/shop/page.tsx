import type { Metadata } from "next";
import { MobileCta } from "@/components/chrome";
import {
  Button,
  EnquiryButton,
  Eyebrow,
  ImageSlot,
  Ph,
  Section,
  Shell,
} from "@/components/ui";
import { SHOP_PIECES } from "@/lib/content";
import { CAROUSELL, REVIEW_COUNT, REVIEW_SCORE, enquiry } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terrarium Gifts & Gift Vouchers Singapore",
  description:
    "Finished and custom terrariums, themed builds, and an undated gift voucher good for any of the four workshops. Arranged by message.",
  alternates: { canonical: "/shop" },
};

/**
 * A showcase, not a shop. There is no cart and the page says so in its first
 * sentence — implying a checkout that does not exist would be a promise the
 * studio pays for.
 *
 * The gift voucher lives here rather than on its own route: with no checkout it
 * carried one paragraph, and folding it in keeps the SEO surface and the gift
 * buyer's landing point without a seventh page.
 */
export default function ShopPage() {
  return (
    <>
      <Shell className="grid gap-4 pt-16">
        <Eyebrow>Shop · showcase</Eyebrow>
        <h1 className="text-display-l">Pieces we&rsquo;ve made.</h1>
        <p className="max-w-[56ch] text-body-l text-moss">
          A showcase, not a shop. Every piece here was made to order — message us and we will
          arrange one. The finished pieces we sell regularly live on Carousell.
        </p>
      </Shell>

      <Section>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {SHOP_PIECES.map((p) => (
            <article
              key={p.name}
              className="grid content-start overflow-hidden rounded-md border border-line bg-card"
            >
              <ImageSlot
                wash={p.wash}
                className="aspect-square rounded-none border-0 border-b border-line"
                label="reshoot on white"
              />
              <div className="grid gap-1 p-3.5">
                <b className="text-body">{p.name}</b>
                <Eyebrow>{p.kind}</Eyebrow>
                <span className="font-mono text-caption tabular">
                  <Ph>{p.price}</Ph>
                </span>
                <div className="pt-2">
                  <EnquiryButton
                    message={enquiry.piece(p.name)}
                    variant="ghost"
                    subject={`Enquiry — ${p.name}`}
                    className="w-full !px-2.5 !text-[9.5px]"
                  >
                    Ask about this
                  </EnquiryButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ---- gift voucher ------------------------------------------------
          Marcus's whole journey. With no checkout, nothing arrives
          automatically — so the page states plainly that a person arranges it.
          Disclosure, not concealment: a page that implies instant delivery and
          then takes two days produces a worse outcome than one that says so. */}
      <Section id="gift">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="grid gap-3">
            <Eyebrow>Gift voucher</Eyebrow>
            <h2 className="text-display-m">
              Undated. Any of the four.{" "}
              <em className="font-editorial font-normal italic text-frond">They pick the day.</em>
            </h2>
            <p className="max-w-[46ch] text-body text-moss">
              A person arranges this, not a checkout — message us and we will send you a card to
              print, or post one to you. Usually <Ph>within two days</Ph>.
            </p>
            <div className="pt-1.5">
              <EnquiryButton message={enquiry.voucher} subject="Gift voucher">
                WhatsApp about a voucher
              </EnquiryButton>
            </div>
          </div>

          <div className="grid justify-items-center rounded-sm bg-gradient-to-br from-[#EAEEE4] to-paper p-8">
            <div className="grid w-[210px] gap-2.5 border border-line-2 bg-[#FCFCF8] p-4 shadow-[0_14px_26px_rgba(22,36,26,0.10)]">
              <span className="font-mono text-[8px] tracking-[0.14em] text-bract">
                GIFT · ANY WORKSHOP
              </span>
              <span className="text-[15px] font-bold tracking-[-0.02em]">For ______</span>
              <span className="font-editorial text-caption italic text-moss">
                One seat, one afternoon
              </span>
              <hr className="border-line" />
              <div className="font-mono text-[8px] uppercase leading-[1.9] tracking-[0.1em] text-moss">
                No expiry date
                <br />
                Sealed · Open · Potted · Bound
                <br />
                airpiphyte.sg
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <span className="text-body text-moss">
            Our sales history, and every review, lives on Carousell.
          </span>
          <Button href={CAROUSELL} variant="ghost" external>
            Carousell · {REVIEW_SCORE} ★ · {REVIEW_COUNT} reviews
          </Button>
        </div>
      </Section>

      <MobileCta message={enquiry.voucher} label="WhatsApp us" />
    </>
  );
}
