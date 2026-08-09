import Link from "next/link";
import type { ReactNode } from "react";
import { WhatsAppIcon, MailIcon } from "./icons";
import { EMAIL, isEnquiryLive, mailtoLink, whatsappLink } from "@/lib/site";

/* -------------------------------------------------------------------------
   Layout primitives
   ---------------------------------------------------------------------- */

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-[clamp(18px,4vw,44px)] ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`border-t border-line py-[clamp(56px,11vw,130px)] ${className}`}>
      <Shell>{children}</Shell>
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-micro tracking-[0.16em] uppercase text-moss ${className}`}>
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <div className="grid gap-3 mb-10">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-display-l">{title}</h2>
      {intro ? <p className="max-w-[56ch] text-body text-moss">{intro}</p> : null}
    </div>
  );
}

/**
 * Marks an invented figure. Prices, durations, capacities and lead times are
 * all placeholders until the client supplies real numbers — making that
 * visible is the point, so nobody mistakes one for confirmed.
 */
export function Ph({ children }: { children: ReactNode }) {
  return (
    <span
      className="border-b border-dotted border-bract"
      title="Placeholder — awaiting real figure from the client"
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------
   Buttons

   Note the class naming: the mockup used `.sec` for the secondary modifier and
   `.sec` for page sections, which collided at equal specificity and silently
   applied 96px of section padding to every secondary button. Utilities make
   that class of bug structurally impossible.
   ---------------------------------------------------------------------- */

const BTN_BASE =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm px-[18px] py-3 " +
  "font-mono text-micro font-bold uppercase tracking-[0.1em] whitespace-nowrap " +
  "transition-[transform,background-color] duration-[140ms] ease-[var(--ease-out)] " +
  "active:scale-[0.97]";

const BTN_PRIMARY = "bg-frond text-white hover:bg-frond-hover";
const BTN_GHOST = "border border-line-control text-ink hover:bg-frond/6";

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  external,
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
}) {
  const cls = `${BTN_BASE} ${variant === "primary" ? BTN_PRIMARY : BTN_GHOST} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/**
 * The site's primary conversion.
 *
 * Falls back to email while `WHATSAPP_NUMBER` is still a placeholder, so the
 * build never ships a dead `wa.me` link. Swap the constant in `lib/site.ts` and
 * every one of these becomes live at once.
 */
export function EnquiryButton({
  message,
  children,
  variant = "primary",
  className = "",
  subject = "Workshop enquiry",
}: {
  message: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  subject?: string;
}) {
  const href = isEnquiryLive ? whatsappLink(message) : mailtoLink(subject, message);
  return (
    <a
      href={href}
      className={`${BTN_BASE} ${variant === "primary" ? BTN_PRIMARY : BTN_GHOST} ${className}`}
      {...(isEnquiryLive ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <WhatsAppIcon />
      {children}
    </a>
  );
}

export function EmailButton({
  subject,
  body,
  children,
  variant = "ghost",
}: {
  subject: string;
  body?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <a
      href={mailtoLink(subject, body)}
      className={`${BTN_BASE} ${variant === "primary" ? BTN_PRIMARY : BTN_GHOST}`}
    >
      <MailIcon />
      {children}
    </a>
  );
}

/* -------------------------------------------------------------------------
   Content primitives
   ---------------------------------------------------------------------- */

export function StatTile({
  value,
  label,
  placeholder,
}: {
  value: ReactNode;
  label: string;
  placeholder?: boolean;
}) {
  return (
    <div className="grid gap-1 rounded-md border border-line bg-card p-4">
      <b className="text-[22px] tracking-[-0.03em] tabular">
        {placeholder ? <Ph>{value}</Ph> : value}
      </b>
      <Eyebrow>{label}</Eyebrow>
    </div>
  );
}

export function Quote({ text, who }: { text: string; who: string }) {
  return (
    <figure className="grid content-start gap-3 rounded-md border border-line bg-card p-5">
      <blockquote className="text-body leading-[1.5]">&ldquo;{text}&rdquo;</blockquote>
      <figcaption>
        <Eyebrow>{who}</Eyebrow>
      </figcaption>
    </figure>
  );
}

/**
 * Placeholder for the reshoot. Two families held apart: `process` is warm and
 * in-room with hands in frame, `product` is the finished piece on plain white.
 * Labelled so a reviewer can see which family each slot expects.
 */
export function ImageSlot({
  wash,
  label,
  family = "product",
  className = "",
  children,
}: {
  wash: string;
  label?: string;
  family?: "process" | "product";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded-md border border-line bg-gradient-to-br ${wash} ${className}`}
    >
      {children}
      {label ? (
        <span className="absolute bottom-2 left-2 rounded-sm bg-white/80 px-1.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-moss">
          {family} · {label}
        </span>
      ) : null}
    </div>
  );
}

export function ContactNote() {
  return (
    <Eyebrow>
      Or email{" "}
      <a href={mailtoLink("Workshop enquiry")} className="text-frond underline-offset-2 hover:underline">
        {EMAIL}
      </a>
    </Eyebrow>
  );
}
