/**
 * Typed local content. No CMS — six page types and four workshops do not
 * justify one, and v4.1 removed the only file the client would have edited
 * routinely (the schedule).
 *
 * PLACEHOLDER WARNING: every price, duration and capacity below is invented.
 * They are marked `placeholder: true` so the UI can flag them visually and so
 * a grep finds them all before launch. See 01-discovery/brief.md, open Q2.
 */

export type TechniqueSlug = "sealed" | "open" | "potted" | "bound";

export interface Plant {
  binomial: string;
  common: string;
  note: string;
}

export interface Workshop {
  slug: string;
  technique: TechniqueSlug;
  number: string;
  techniqueLabel: string;
  name: string;
  /** One plain sentence. Never assumes the reader knows the technique name. */
  plain: string;
  lede: string;
  price: string;
  duration: string;
  capacity: string;
  makes: string;
  included: string[];
  plants: Plant[];
  care: string[];
  faq: { q: string; a: string }[];
  /** Tailwind classes for the placeholder image field until the reshoot. */
  wash: string;
}

/** Studio capacity is 12. Every other figure derives from it. */
export const STUDIO_CAPACITY = 12;

export const WORKSHOPS: Workshop[] = [
  {
    slug: "closed-terrarium",
    technique: "sealed",
    number: "01",
    techniqueLabel: "Sealed",
    name: "Closed Terrarium",
    plain: "A corked jar that makes its own weather.",
    lede: "Layered substrate, soiled plants, and a cork. Once it is sealed it recycles its own water, and a good one runs for years without you.",
    price: "S$68",
    duration: "2 hr",
    capacity: `max ${STUDIO_CAPACITY} people`,
    makes: "A sealed glass jar roughly 20cm tall, planted and scaped, corked before you leave.",
    included: [
      "The jar, cork and every layer — lava rock, charcoal, substrate, sheet moss",
      "Your choice of plants from the table",
      "Tools, trays, gloves and an apron",
      "A numbered take-home card with your name on it",
      "Tea, and somewhere to wash your hands",
    ],
    plants: [
      { binomial: "Fittonia albivenis", common: "Nerve plant", note: "Wilts dramatically when thirsty, recovers within the hour. Theatrical, not fragile." },
      { binomial: "Pilea glauca", common: "Silver sparkle", note: "Trails over the substrate and softens every hard edge in the jar." },
      { binomial: "Peperomia prostrata", common: "String of turtles", note: "Slow, patterned, and happiest in exactly this much humidity." },
    ],
    care: ["Water almost never", "Bright indirect light", "Keep it corked"],
    faq: [
      { q: "Do I need any experience?", a: "None. Most people at the table have never built one. We explain each layer as you go and why it is there." },
      { q: "Can children join?", a: "Yes, from about eight upward, and an adult should be at the table with them. The glass is real glass." },
      { q: "Can I bring a figurine to put in it?", a: "Please do — it is genuinely the best part. Anything non-porous that fits through the opening will survive in there indefinitely." },
      { q: "What if I'm running late?", a: "Message us. We can usually hold the start for fifteen minutes without it affecting anyone else." },
      { q: "How long will it last?", a: "Years, if it stays sealed and out of direct sun. The oldest sealed terrariums on record are older than most houseplants." },
      { q: "I have a plant allergy — is that a problem?", a: "Tell us what it is when you message and we will plan around it. There is no soil dust in a closed build, which helps." },
    ],
    wash: "from-[#CFE0BC] via-[#F2F5EC] to-[#FBFCF8]",
  },
  {
    slug: "open-terrarium",
    technique: "open",
    number: "02",
    techniqueLabel: "Open",
    name: "Open Terrarium",
    plain: "Air plants in a hanging glass globe. No soil at all.",
    lede: "Tillandsia take water through their leaves rather than roots, so the globe is a display case rather than a pot. The lightest of the four, and the easiest to hang anywhere.",
    price: "S$58",
    duration: "90 min",
    capacity: `max ${STUDIO_CAPACITY} people`,
    makes: "A hanging glass globe with air plants, sand and stone, ready to hook up when you get home.",
    included: [
      "The glass globe and its cord",
      "Air plants, coloured sand, stones and preserved moss",
      "Tools, trays and an apron",
      "A numbered take-home card with your name on it",
      "Tea, and somewhere to wash your hands",
    ],
    plants: [
      { binomial: "Tillandsia ionantha", common: "Blushing bride", note: "Flushes deep pink at the centre days before it flowers." },
      { binomial: "Tillandsia caput-medusae", common: "Medusa's head", note: "Curling, silver, and structural — it holds a shape on its own." },
      { binomial: "Tillandsia xerographica", common: "King air plant", note: "The showpiece. Slow, sculptural, and forgiving of neglect." },
    ],
    care: ["Soak 20 min fortnightly", "Bright indirect light", "Never sit it in soil"],
    faq: [
      { q: "Do I need any experience?", a: "None at all. This is the quickest of the four and the hardest to get wrong." },
      { q: "Can children join?", a: "Yes, and this is the one we would pick for a younger child — no soil, no mess, and it is finished inside ninety minutes." },
      { q: "Can I bring a figurine to put in it?", a: "Yes. The globe opening is wide, so almost anything fits." },
      { q: "What if I'm running late?", a: "Message us. Fifteen minutes is usually absorbable." },
      { q: "How long will it last?", a: "Years, with a fortnightly soak. Air plants flower once and then produce offsets you can separate." },
      { q: "I have a plant allergy — is that a problem?", a: "This is the lowest-allergen build of the four — no soil, no soil dust. Tell us anyway and we will plan around it." },
    ],
    wash: "from-[#BFD6DA] via-[#F0F4F1] to-[#FBFCF8]",
  },
  {
    slug: "succulents",
    technique: "potted",
    number: "03",
    techniqueLabel: "Potted",
    name: "Succulents Potting",
    plain: "Arrange, plant, top-dress. The hardest to kill.",
    lede: "An arrangement in a shallow pot, top-dressed with grit so it looks finished rather than planted. The most forgiving of the four and the best one to start on.",
    price: "S$48",
    duration: "90 min",
    capacity: `max ${STUDIO_CAPACITY} people`,
    makes: "A shallow pot of arranged succulents, top-dressed, roughly 15cm across.",
    included: [
      "The pot, gritty mix and top-dressing",
      "Your choice of succulents from the table",
      "Tools, trays, gloves and an apron",
      "A numbered take-home card with your name on it",
      "Tea, and somewhere to wash your hands",
    ],
    plants: [
      { binomial: "Echeveria elegans", common: "Mexican snowball", note: "The classic rosette. Tight and pale when it is getting enough light." },
      { binomial: "Haworthia fasciata", common: "Zebra plant", note: "Vertical, striped, and tolerant of a darker corner than the others." },
      { binomial: "Sedum morganianum", common: "Burro's tail", note: "Spills over the rim. Handle it gently — the beads detach if you look at them wrong." },
    ],
    care: ["Water only when bone dry", "Direct sun", "Drainage hole is essential"],
    faq: [
      { q: "Do I need any experience?", a: "None. This is the one we recommend if you have killed plants before and want to stop." },
      { q: "Can children join?", a: "Yes, from about six with an adult. Some succulents have spines and we will steer them away from those." },
      { q: "Can I bring a figurine to put in it?", a: "Yes, and it suits this build particularly well — an open arrangement gives it somewhere to sit." },
      { q: "What if I'm running late?", a: "Message us. Fifteen minutes is usually fine." },
      { q: "How long will it last?", a: "Indefinitely. Succulents outgrow their pot rather than dying in it, and you can split them every couple of years." },
      { q: "I have a plant allergy — is that a problem?", a: "Tell us when you message. There is soil dust in this one, so it is worth mentioning." },
    ],
    wash: "from-[#D9DE9C] via-[#F4F4E6] to-[#FBFCF8]",
  },
  {
    slug: "kokedama",
    technique: "bound",
    number: "04",
    techniqueLabel: "Bound",
    name: "Art of Kokedama",
    plain: "A moss ball bound with twine. No pot at all.",
    lede: "The root ball is wrapped in soil and moss, then bound with twine until it holds itself. The oldest of the four, and the one people photograph most.",
    price: "S$62",
    duration: "2 hr",
    capacity: `max ${STUDIO_CAPACITY} people`,
    makes: "A bound moss ball roughly 14cm across, ready to sit on a dish or hang.",
    included: [
      "The plant, akadama and peat, sheet moss and jute twine",
      "Scissors, trays, gloves and an apron",
      "A numbered take-home card with your name on it",
      "Tea, and somewhere to wash your hands",
    ],
    plants: [
      { binomial: "Chamaedorea elegans", common: "Parlour palm", note: "Slow, forgiving, and happy in a dim corner." },
      { binomial: "Asplenium nidus", common: "Bird's nest fern", note: "Wants humidity more than it wants light." },
      { binomial: "Fittonia albivenis", common: "Nerve plant", note: "Wilts dramatically, recovers in an hour. A useful thirst gauge." },
    ],
    care: ["Soak 10 min weekly", "Bright indirect light", "Do not repot"],
    faq: [
      { q: "Do I need any experience?", a: "None, though this is the most hands-on of the four. Expect to have soil past your wrists." },
      { q: "Can children join?", a: "Yes, from about eight. The binding takes patience more than strength." },
      { q: "Can I bring a figurine to put in it?", a: "You can, though kokedama gives it less to sit in than the others. A closed terrarium suits a figurine better." },
      { q: "What if I'm running late?", a: "Message us — but this is the longest build, so a late start does eat into it." },
      { q: "How long will it last?", a: "Two to three years before the ball breaks down, and then you re-wrap it. We show you how." },
      { q: "I have a plant allergy — is that a problem?", a: "Worth telling us. This build has the most direct soil contact of the four." },
    ],
    wash: "from-[#B6C7A4] via-[#F0F3EA] to-[#FBFCF8]",
  },
];

export function getWorkshop(slug: string): Workshop | undefined {
  return WORKSHOPS.find((w) => w.slug === slug);
}

/**
 * How sessions are arranged. There is no schedule — v4.1.
 * These four facts do the job a date list used to.
 */
export const ARRANGING = {
  days: "Weekends and weekday evenings",
  notice: "About a week",
  people: `2–${STUDIO_CAPACITY}`,
  placeholder: true,
} as const;

export const GROUPS = {
  studioMin: 8,
  studioMax: STUDIO_CAPACITY,
  onsiteMin: 12,
  onsiteMax: 40,
  perHeadFrom: "S$55",
  leadTime: "Two weeks",
  placeholder: true,
} as const;

export const REVIEWS = [
  { text: "Replied to every question within minutes and customised the whole thing for my partner's birthday.", who: "Carousell review" },
  { text: "We came as four and stayed an extra half hour. Nobody wanted to stop building.", who: "Carousell review" },
  { text: "Six months on and the closed one is still going. They told me exactly how not to kill it.", who: "Carousell review" },
];

export const SHOP_PIECES = [
  { name: "Spirited Away jar", kind: "Closed · themed", price: "S$50", wash: "from-[#CFE0BC] via-[#F2F5EC] to-[#FBFCF8]" },
  { name: "Charmander build", kind: "Closed · themed", price: "S$45", wash: "from-[#D9DE9C] via-[#F4F4E6] to-[#FBFCF8]" },
  { name: "Hex frame airplant", kind: "Open", price: "S$40", wash: "from-[#BFD6DA] via-[#F0F4F1] to-[#FBFCF8]" },
  { name: "Custom closed terrarium", kind: "Closed · to order", price: "S$40", wash: "from-[#B6C7A4] via-[#F0F3EA] to-[#FBFCF8]" },
];

/** Care guide. Four anchored sections — workshop pages deep-link into these. */
export const CARE = [
  {
    id: "sealed",
    number: "01",
    label: "Sealed",
    name: "Closed Terrarium",
    lines: ["Water almost never", "Bright indirect", "Keep it corked"],
    body: "A sealed jar recycles its own water. If the glass mists every morning and clears by afternoon, it is working. The two ways people kill one: opening it to let it breathe, and putting it on a windowsill in direct sun, which cooks it in a single afternoon.",
    trouble: { q: "Mould?", a: "Normal in the first fortnight. Remove the affected leaf, leave the lid off for a day, then re-seal." },
  },
  {
    id: "open",
    number: "02",
    label: "Open",
    name: "Open Terrarium",
    lines: ["Soak 20 min fortnightly", "Bright indirect", "Never in soil"],
    body: "Air plants take water through their leaves, not roots, so the globe is a display case rather than a pot. Turn it upside down on a towel after soaking — water trapped in the crown is what rots them, and it is the single most common way one dies.",
    trouble: { q: "Curling leaves?", a: "Thirst. A well-watered Tillandsia is flat and open; a dry one curls inward." },
  },
  {
    id: "potted",
    number: "03",
    label: "Potted",
    name: "Succulents",
    lines: ["Water only when bone dry", "Direct sun", "Drainage hole essential"],
    body: "The hardest to kill and the most commonly killed, because kindness is the danger. Push a finger in to the second knuckle; if there is any moisture at all, wait. In Singapore's humidity that can mean a fortnight between waterings.",
    trouble: { q: "Stretching and pale?", a: "Not enough light — it is reaching. Move it somewhere brighter and the new growth will come back tight." },
  },
  {
    id: "bound",
    number: "04",
    label: "Bound",
    name: "Kokedama",
    lines: ["Soak 10 min weekly", "Bright indirect", "Do not repot"],
    body: "Lift it. A dry ball feels surprisingly light — that is the signal, not the calendar. Submerge until it stops bubbling, then let it drain fully before it goes back on its dish.",
    trouble: { q: "Going away?", a: "Soak it, put it in a sealed clear bag out of direct sun, and it will hold for about two weeks." },
  },
];
