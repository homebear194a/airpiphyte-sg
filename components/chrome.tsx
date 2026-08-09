import Link from "next/link";
import { WORKSHOPS } from "@/lib/content";
import {
  CAROUSELL,
  EMAIL,
  INSTAGRAM,
  REVIEW_COUNT,
  REVIEW_SCORE,
  WHATSAPP_NUMBER,
  enquiry,
  isEnquiryLive,
  mailtoLink,
} from "@/lib/site";
import { Logo, VesselIcon } from "./icons";
import { EnquiryButton, Eyebrow, Ph, Shell } from "./ui";

/**
 * Header — four nav items and a CTA. Deliberately not eight.
 *
 * "Private & corporate" is top-level rather than a footer link: Priya assumes
 * consumer-only otherwise, and that is the single most expensive assumption on
 * the site. Shop and Care are footer-and-inline only — putting Shop in the nav
 * would restate the shop-not-class confusion the hero just resolved.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-[14px]">
      <Shell>
        <nav className="flex h-[58px] items-center gap-5" aria-label="Main">
          <Link href="/" className="flex items-center gap-2.5 text-ink">
            <Logo />
            <b className="text-[15px] tracking-[-0.045em]">
              airpiphyte<span className="font-normal text-trichome">.sg</span>
            </b>
          </Link>

          <div className="ml-auto hidden items-center gap-5 md:flex">
            <Link href="/#workshops" className="text-caption text-moss hover:text-ink">
              Workshops
            </Link>
            <Link href="/private" className="text-caption text-moss hover:text-ink">
              Private &amp; corporate
            </Link>
            <Link href="/about" className="text-caption text-moss hover:text-ink">
              About
            </Link>
          </div>

          <div className="ml-auto md:ml-0">
            <EnquiryButton message={enquiry.general} className="!px-3.5">
              WhatsApp us
            </EnquiryButton>
          </div>
        </nav>
      </Shell>
    </header>
  );
}

/**
 * Mobile CTA bar. Wei Ling must be able to convert from any scroll position
 * without hunting for a button — Journey 1, step 7.
 */
export function MobileCta({ message, label }: { message: string; label: string }) {
  return (
    <div className="sticky bottom-0 z-30 border-t border-line-2 bg-card px-[18px] py-3 md:hidden">
      <EnquiryButton message={message} className="w-full">
        {label}
      </EnquiryButton>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line-2 py-11">
      <Shell>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="grid content-start gap-2">
            <div className="flex items-center gap-2.5 text-ink">
              <Logo size={20} />
              <b className="text-[15px] tracking-[-0.045em]">
                airpiphyte<span className="font-normal text-trichome">.sg</span>
              </b>
            </div>
            <span className="text-caption text-moss">
              Terrarium and plant workshops in Singapore.
            </span>
            {/* Selectable text, not only a tel: link — a wa.me link is useless
                to a desktop visitor without WhatsApp Web. */}
            <span className="select-all font-mono text-caption text-ink">
              {isEnquiryLive ? `+${WHATSAPP_NUMBER}` : <Ph>+65 XXXX XXXX</Ph>}
            </span>
            <a href={mailtoLink("Hello")} className="text-caption text-moss hover:text-ink">
              {EMAIL}
            </a>
          </div>

          <div className="grid content-start gap-2">
            <Eyebrow>Workshops</Eyebrow>
            {WORKSHOPS.map((w) => (
              <Link
                key={w.slug}
                href={`/workshops/${w.slug}`}
                className="flex items-center gap-2 text-caption text-moss hover:text-ink"
              >
                <VesselIcon technique={w.technique} size={15} />
                {w.name}
              </Link>
            ))}
          </div>

          <div className="grid content-start gap-2">
            <Eyebrow>More</Eyebrow>
            <Link href="/private" className="text-caption text-moss hover:text-ink">
              Private &amp; corporate
            </Link>
            <Link href="/shop" className="text-caption text-moss hover:text-ink">
              Shop &amp; gift vouchers
            </Link>
            <Link href="/care" className="text-caption text-moss hover:text-ink">
              Care guides
            </Link>
            <Link href="/about" className="text-caption text-moss hover:text-ink">
              About
            </Link>
          </div>

          <div className="grid content-start gap-2">
            <Eyebrow>Elsewhere</Eyebrow>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption text-moss hover:text-ink"
            >
              Instagram · @airpiphyte
            </a>
            <a
              href={CAROUSELL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption text-moss hover:text-ink"
            >
              Carousell · {REVIEW_SCORE} ★ · {REVIEW_COUNT} reviews
            </a>
          </div>
        </div>
      </Shell>
    </footer>
  );
}
