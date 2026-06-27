export const APP_URL = "https://kcc.opsaway.ai";

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Features", href: "/#features" },
  { label: "How it Works", href: "/#how" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

/** Software-agnostic stack shown across marketing (no vendor lock-in in copy). */
export const SOFTWARE_STACK = [
  {
    id: "kennel",
    label: "Kennel Software",
    role: "Bookings & revenue",
    abbr: "K",
    accent: "orange" as const,
    dock: { x: -150, y: -118 },
    line: "M 0,0 C -70,-45 -120,-95 -150,-118",
  },
  {
    id: "scheduling",
    label: "Scheduling Software",
    role: "Labor & shifts",
    abbr: "S",
    accent: "cyan" as const,
    dock: { x: 150, y: -118 },
    line: "M 0,0 C 70,-45 120,-95 150,-118",
  },
  {
    id: "financial",
    label: "Financial Software",
    role: "Profit & loss",
    note: "QuickBooks & more",
    abbr: "F",
    accent: "green" as const,
    dock: { x: 0, y: 120 },
    line: "M 0,0 C 10,60 5,95 0,120",
  },
] as const;

export type SoftwareItem = (typeof SOFTWARE_STACK)[number];

/** @deprecated Use SOFTWARE_STACK labels — kept for any legacy imports. */
export const INTEGRATIONS = SOFTWARE_STACK.map((s) => s.label);

export const INTEGRATION_LOGOS: Record<string, string> = {
  QuickBooks: "/quickbook.png",
};

export const SOFTWARE_COPY = {
  stackEyebrow: "Your Existing Software",
  stackHeadline: "Plugs into what you already run — no software change needed",
  stackLead:
    "KennelEyes integrates your kennel, scheduling, and financial software into one dashboard, updated daily with the most current numbers.",
  stackSub:
    "KennelEyes reads your kennel software, scheduling and time clock software, and financial software, with read-only access. Watch your tools connect to one live dashboard.",
  heroAudience: "For individual kennels and multi-location groups",
  heroLead:
    "You're running separate kennel, scheduling, and financial software — then piecing the numbers together in spreadsheets. KennelEyes brings revenue, payroll, and financial data into one place so you can make better decisions.",
} as const;
