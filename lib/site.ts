/**
 * Site-wide constants and the enquiry helpers.
 *
 * The whole site converts into WhatsApp, so every `wa.me` link is composed
 * here rather than hardcoded in a component. That gives one place to drop the
 * real number in, and guarantees no CTA ever opens an empty text box.
 */

/**
 * PLACEHOLDER — the hardest blocker in the project.
 *
 * Every primary CTA on every page resolves through this. Until it holds a real
 * number in international format with no punctuation (e.g. "6591234567"), the
 * links go nowhere. `isEnquiryLive` below is what the UI checks so the site
 * degrades to email rather than shipping dead links.
 */
export const WHATSAPP_NUMBER = "65XXXXXXXX";

export const EMAIL = "airpiphytesg@gmail.com";
export const INSTAGRAM = "https://instagram.com/airpiphyte";
export const CAROUSELL = "https://www.carousell.sg/";

export const REVIEW_SCORE = "4.99";
export const REVIEW_COUNT = 84;

/** False while the number is still a placeholder — see `EnquiryButton`. */
export const isEnquiryLive = !WHATSAPP_NUMBER.includes("X");

/**
 * Build a wa.me deep link with the message already written.
 *
 * An enquiry's enemy is awkwardness, not friction: the visitor is convinced but
 * does not know what to say. Prefilling costs nothing and it also means the
 * client's first reply can be an answer rather than an interrogation.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Fallback for desktop visitors and for while the number is a placeholder. */
export function mailtoLink(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${EMAIL}?${params.toString()}`;
}

/** Prefilled messages. Each names a workshop and invites a day. */
export const enquiry = {
  general: "Hi! I'd like to know more about your terrarium workshops.",
  workshop: (name: string) =>
    `Hi! I'd like to do the ${name} workshop — when could you fit us in?`,
  group:
    "Hi! I'd like to arrange a group session.\n\n" +
    "How many people:\nRough date:\nWhich workshop:\nYour office or your studio:",
  voucher: "Hi! I'd like to arrange a gift voucher — for one person, any workshop.",
  piece: (name: string) => `Hi! I'm interested in the ${name} — is something like it possible?`,
  carePhoto: "Hi! Here's a photo of mine — could you tell me what it needs?",
} as const;

export const SITE = {
  name: "Airpiphyte SG",
  domain: "airpiphyte.sg",
  url: "https://airpiphyte.sg",
  tagline: "Four ways to build a world.",
  description:
    "Hands-on terrarium and plant workshops in Singapore. Two hours at a table, every material provided, and you leave holding the thing you made.",
} as const;
