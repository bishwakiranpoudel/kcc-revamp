import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Fraunces,
  DM_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/revamp/scroll-progress";
import { SiteHeader } from "@/components/revamp/site-header";
import { SiteFooter } from "@/components/revamp/site-footer";

// Display — expressive grotesque for headlines.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Editorial accent — soft serif italic for emphasis phrases.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://kenneleyes.com",
  ),
  title: "KennelEyes — Every location on one screen",
  description:
    "Revenue, labor, and profit for every kennel location — live. Connects Gingr, When I Work, and QuickBooks into one Mission Control dashboard.",
  openGraph: {
    title: "KennelEyes — Every location on one screen",
    description:
      "Revenue, labor, and profit for every kennel location — live. Connects Gingr, When I Work, and QuickBooks into one Mission Control dashboard.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "KennelEyes" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${fraunces.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-trail-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <div aria-hidden className="demo-nav-scrim pointer-events-none fixed inset-x-0 top-0 z-40 h-24" />
        <SiteHeader />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
