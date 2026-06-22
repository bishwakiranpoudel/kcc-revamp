export const APP_URL = "https://app.kenneleyes.com";

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Demo", href: "#demo" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

export const INTEGRATIONS = ["Gingr", "When I Work", "QuickBooks"] as const;

export const INTEGRATION_LOGOS: Record<string, string> = {
  Gingr: "/gingr.jpeg",
  "When I Work": "/wheniwork.png",
  QuickBooks: "/quickbook.png",
};
