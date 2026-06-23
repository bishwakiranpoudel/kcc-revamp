export const APP_URL = "https://kcc.opsaway.ai";

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export const INTEGRATIONS = ["Gingr", "When I Work", "QuickBooks"] as const;

export const INTEGRATION_LOGOS: Record<string, string> = {
  Gingr: "/gingr.jpeg",
  "When I Work": "/wheniwork.png",
  QuickBooks: "/quickbook.png",
};
