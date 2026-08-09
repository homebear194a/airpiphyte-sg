import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components/chrome";
import { SITE } from "@/lib/site";

/**
 * Three roles, two families. The grotesk carries voice, the italic serif
 * carries botany, the mono carries fact — and Geist + Geist Mono share a
 * skeleton, so on a site whose whole strategy is "four things are one system",
 * the type makes the argument too.
 *
 * Self-hosted by next/font. No font CDN.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Terrarium Workshops Singapore — ${SITE.name}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `Terrarium Workshops Singapore — ${SITE.name}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_SG",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-SG">
      <head>
        {/* AUDIT B1 — without an explicit charset every em-dash, middot and
            star in the copy renders as mojibake. The mockup lost this because
            its host injected one; nothing injects one here. */}
        <meta charSet="utf-8" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-frond focus:px-4 focus:py-2 focus:font-mono focus:text-micro focus:uppercase focus:tracking-[0.1em] focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
