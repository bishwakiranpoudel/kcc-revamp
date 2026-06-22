/**
 * Deterministic synthetic operating data for the marketing mock dashboards.
 * No product code or live API is touched — these are illustrative numbers that
 * mirror the *shape* of KennelEyes Mission Control output.
 */

export type RangeKey = "day" | "week" | "month";
export type LocationKey = "all" | "north" | "harbor" | "ridge";

export const LOCATIONS: { key: LocationKey; name: string; city: string }[] = [
  { key: "all", name: "All locations", city: "4 sites" },
  { key: "north", name: "Northgate", city: "Austin, TX" },
  { key: "harbor", name: "Harbor Run", city: "Seattle, WA" },
  { key: "ridge", name: "Cedar Ridge", city: "Denver, CO" },
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Tiny seeded pseudo-random so charts are stable between renders/SSR. */
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const LOCATION_FACTOR: Record<LocationKey, number> = {
  all: 1,
  north: 0.42,
  harbor: 0.31,
  ridge: 0.27,
};

const LOCATION_SEED: Record<LocationKey, number> = {
  all: 7,
  north: 23,
  harbor: 41,
  ridge: 67,
};

export type RevenueRow = {
  day: string;
  date: string;
  boarding: number;
  daycare: number;
  grooming: number;
  total: number;
};

function pointCount(range: RangeKey): number {
  if (range === "day") return 8; // hours of a day
  if (range === "week") return 7;
  return 30;
}

function labelFor(range: RangeKey, i: number, total: number): { day: string; date: string } {
  if (range === "day") {
    const hour = 7 + i * 2;
    return { day: `${hour}:00`, date: `Today ${hour}:00` };
  }
  if (range === "week") {
    return { day: WEEKDAYS[i % 7], date: `Day ${i + 1}` };
  }
  const d = i + 1;
  return { day: `${d}`, date: `Apr ${d}` };
}

export function revenueSeries(range: RangeKey, loc: LocationKey): RevenueRow[] {
  const rand = seeded(LOCATION_SEED[loc] + range.length * 13);
  const factor = LOCATION_FACTOR[loc];
  const n = pointCount(range);
  const scale = range === "day" ? 0.26 : range === "week" ? 1 : 1.05;

  return Array.from({ length: n }, (_, i) => {
    const wave = 0.7 + 0.45 * Math.sin((i / n) * Math.PI * 1.6 + 0.6);
    const boarding = Math.round((1400 + rand() * 900) * wave * factor * scale);
    const daycare = Math.round((900 + rand() * 600) * wave * factor * scale);
    const grooming = Math.round((420 + rand() * 380) * wave * factor * scale);
    const { day, date } = labelFor(range, i, n);
    return {
      day,
      date,
      boarding,
      daycare,
      grooming,
      total: boarding + daycare + grooming,
    };
  });
}

export type PayrollPctRow = {
  day: string;
  pct: number;
  goal: number;
};

export function payrollPctSeries(range: RangeKey, loc: LocationKey): PayrollPctRow[] {
  const rand = seeded(LOCATION_SEED[loc] + 99 + range.length);
  const n = pointCount(range);
  const goal = 32;
  return Array.from({ length: n }, (_, i) => {
    const drift = Math.sin((i / n) * Math.PI * 2) * 4;
    const pct = Math.round((33 + drift + (rand() - 0.5) * 5) * 10) / 10;
    const { day } = labelFor(range, i, n);
    return { day, pct, goal };
  });
}

export type ForecastRow = {
  day: string;
  reservations: number;
  scheduledHours: number;
  projected?: boolean;
};

export function forecastSeries(loc: LocationKey): ForecastRow[] {
  const rand = seeded(LOCATION_SEED[loc] + 311);
  const factor = LOCATION_FACTOR[loc];
  return Array.from({ length: 10 }, (_, i) => {
    const wave = 0.75 + 0.4 * Math.sin((i / 10) * Math.PI * 1.4);
    const reservations = Math.round((56 + rand() * 30) * wave * factor + 8);
    const scheduledHours = Math.round((reservations / 4.2) * 10) / 10;
    return {
      day: WEEKDAYS[i % 7],
      reservations,
      scheduledHours,
      projected: i >= 5,
    };
  });
}

export type OccupancyRow = { day: string; used: number; capacity: number };

export function occupancySeries(loc: LocationKey): OccupancyRow[] {
  const rand = seeded(LOCATION_SEED[loc] + 555);
  const cap = loc === "all" ? 320 : 96;
  return WEEKDAYS.map((day) => {
    const used = Math.round(cap * (0.62 + rand() * 0.33));
    return { day, used, capacity: cap };
  });
}

export type Kpi = {
  label: string;
  value: string;
  delta: number;
  sub: string;
};

export function kpis(range: RangeKey, loc: LocationKey): Kpi[] {
  const rev = revenueSeries(range, loc);
  const totalRev = rev.reduce((s, r) => s + r.total, 0);
  const occ = occupancySeries(loc);
  const util = Math.round(
    (occ.reduce((s, r) => s + r.used / r.capacity, 0) / occ.length) * 100,
  );
  const pct = payrollPctSeries(range, loc);
  const avgPct = Math.round(
    (pct.reduce((s, r) => s + r.pct, 0) / pct.length) * 10,
  ) / 10;
  const dogsPerHr = Math.round((4.1 - (avgPct - 32) * 0.04) * 100) / 100;

  return [
    {
      label: "Revenue",
      value: formatUsdCompact(totalRev),
      delta: 8.4,
      sub: rangeLabel(range),
    },
    {
      label: "Capacity utilization",
      value: `${util}%`,
      delta: 3.1,
      sub: "Avg dogs in-house",
    },
    {
      label: "Payroll % of revenue",
      value: `${avgPct}%`,
      delta: avgPct <= 32 ? -1.6 : 1.9,
      sub: "Goal 32%",
    },
    {
      label: "Dogs / labor hour",
      value: `${dogsPerHr}`,
      delta: 2.2,
      sub: "Worked efficiency",
    },
  ];
}

export function rangeLabel(range: RangeKey): string {
  if (range === "day") return "Today, by hour";
  if (range === "week") return "Last 7 days";
  return "Last 30 days";
}

export function formatUsd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

export function formatUsdCompact(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return `$${Math.round(n)}`;
}

/* ---- Labor: scheduled / actual / variance (dual-axis composed) ---- */

export type LaborDay = {
  day: string;
  dogs: number;
  staffHours: number;
};

export type LaborVarianceDay = {
  day: string;
  dogs: number;
  varianceHours: number;
};

export function laborScheduled(range: RangeKey, loc: LocationKey): LaborDay[] {
  const rand = seeded(LOCATION_SEED[loc] + 700 + range.length);
  const factor = LOCATION_FACTOR[loc];
  const n = pointCount(range);
  return Array.from({ length: n }, (_, i) => {
    const wave = 0.7 + 0.4 * Math.sin((i / n) * Math.PI * 1.5 + 0.4);
    const dogs = Math.round((58 + rand() * 34) * wave * factor + 6);
    const staffHours = Math.round((dogs / 4.0 + rand() * 4) * 10) / 10;
    return { day: labelFor(range, i, n).day, dogs, staffHours };
  });
}

export function laborActual(range: RangeKey, loc: LocationKey): LaborDay[] {
  const sched = laborScheduled(range, loc);
  const rand = seeded(LOCATION_SEED[loc] + 900 + range.length);
  return sched.map((d) => ({
    day: d.day,
    dogs: d.dogs,
    staffHours: Math.round((d.staffHours + (rand() - 0.45) * 6) * 10) / 10,
  }));
}

export function laborVariance(
  range: RangeKey,
  loc: LocationKey,
): LaborVarianceDay[] {
  const sched = laborScheduled(range, loc);
  const actual = laborActual(range, loc);
  return sched.map((d, i) => ({
    day: d.day,
    dogs: d.dogs,
    varianceHours: Math.round((actual[i]!.staffHours - d.staffHours) * 10) / 10,
  }));
}

/* ---- Position hours (donut + horizontal bars) ---- */

export type PositionSlice = {
  label: string;
  hours: number;
  color: string;
};

export function positionHours(loc: LocationKey): PositionSlice[] {
  const f = LOCATION_FACTOR[loc];
  const r = (n: number) => Math.round(n * f);
  return [
    { label: "Kennel techs", hours: r(412), color: "var(--data-daycare)" },
    { label: "Groomers", hours: r(186), color: "var(--data-grooming)" },
    { label: "Front desk", hours: r(148), color: "var(--data-boarding)" },
    { label: "Trainers", hours: r(96), color: "var(--data-revenue)" },
    { label: "Managers", hours: r(72), color: "var(--data-scheduled)" },
  ];
}

/* ---- Occupancy utilization trend (sparkline) ---- */

export type TrendPoint = { label: string; pct: number };

export function utilizationTrend(range: RangeKey, loc: LocationKey): TrendPoint[] {
  const rand = seeded(LOCATION_SEED[loc] + 1300 + range.length);
  const n = range === "day" ? 8 : range === "week" ? 7 : 30;
  return Array.from({ length: n }, (_, i) => {
    const wave = 0.72 + 0.2 * Math.sin((i / n) * Math.PI * 2 + 1);
    const pct = Math.round(Math.min(99, Math.max(40, wave * 100 + (rand() - 0.5) * 14)));
    return { label: labelFor(range, i, n).day, pct };
  });
}

/* ---- QuickBooks P&L mock ---- */

export type PnlLine = {
  label: string;
  current: number;
  prior: number;
  indent?: boolean;
  kind?: "header" | "total" | "line" | "grand";
};

export function pnlStatement(loc: LocationKey): PnlLine[] {
  const f = LOCATION_FACTOR[loc];
  const r = (n: number) => Math.round(n * f);
  const boarding = r(184200);
  const daycare = r(96400);
  const grooming = r(38600);
  const retail = r(14250);
  const income = boarding + daycare + grooming + retail;

  const wages = r(101300);
  const supplies = r(18600);
  const rent = r(31000);
  const software = r(4200);
  const marketing = r(7600);
  const cogs = wages + supplies;
  const opex = rent + software + marketing;
  const net = income - cogs - opex;

  return [
    { label: "Income", current: 0, prior: 0, kind: "header" },
    { label: "Boarding", current: boarding, prior: r(171800), indent: true },
    { label: "Daycare", current: daycare, prior: r(91200), indent: true },
    { label: "Grooming", current: grooming, prior: r(35900), indent: true },
    { label: "Retail & add-ons", current: retail, prior: r(13100), indent: true },
    { label: "Total income", current: income, prior: r(312000), kind: "total" },

    { label: "Cost of services", current: 0, prior: 0, kind: "header" },
    { label: "Kennel wages", current: wages, prior: r(99100), indent: true },
    { label: "Supplies & feed", current: supplies, prior: r(19400), indent: true },
    { label: "Total COGS", current: cogs, prior: r(118500), kind: "total" },

    { label: "Operating expenses", current: 0, prior: 0, kind: "header" },
    { label: "Facility rent", current: rent, prior: r(31000), indent: true },
    { label: "Software & tools", current: software, prior: r(3900), indent: true },
    { label: "Marketing", current: marketing, prior: r(6800), indent: true },
    { label: "Total OpEx", current: opex, prior: r(41700), kind: "total" },

    { label: "Net operating income", current: net, prior: r(151800), kind: "grand" },
  ];
}

/* ---- QuickBooks P&L analytics (composition + trend) ---- */

export type QboRevenueLine = { name: string; value: number };

export function qboRevenueLines(loc: LocationKey): QboRevenueLine[] {
  const f = LOCATION_FACTOR[loc];
  const r = (n: number) => Math.round(n * f);
  return [
    { name: "Boarding", value: r(184200) },
    { name: "Daycare", value: r(96400) },
    { name: "Grooming & spa", value: r(38600) },
    { name: "Training & classes", value: r(21800) },
    { name: "Retail & add-ons", value: r(14250) },
    { name: "Enrichment", value: r(9600) },
  ].sort((a, b) => b.value - a.value);
}

export type QboMonth = {
  label: string;
  revenue: number;
  payroll: number;
  payrollPct: number;
  noi: number;
  netIncome: number;
  coreExpenses: number;
};

const MONTH_LABELS = [
  "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",
  "Dec", "Jan", "Feb", "Mar", "Apr", "May",
];

export function qboTrend(loc: LocationKey): QboMonth[] {
  const rand = seeded(LOCATION_SEED[loc] + 2100);
  const factor = LOCATION_FACTOR[loc];
  return MONTH_LABELS.map((m, i) => {
    const wave = 0.82 + 0.22 * Math.sin((i / 12) * Math.PI * 2 + 0.5);
    const revenue = Math.round((328000 + rand() * 42000) * wave * factor);
    const payrollPct = Math.round((30 + Math.sin(i / 2) * 4 + (rand() - 0.5) * 3) * 10) / 10;
    const payroll = Math.round(revenue * (payrollPct / 100));
    const rent = Math.round(31000 * factor);
    const otherExp = Math.round((58000 + rand() * 14000) * factor);
    const coreExpenses = otherExp;
    const noi = revenue - payroll - rent - otherExp;
    const netIncome = Math.round(noi - revenue * 0.04);
    return {
      label: `${m} ${i < 6 ? "'24" : "'25"}`,
      revenue,
      payroll,
      payrollPct,
      noi,
      netIncome,
      coreExpenses,
    };
  });
}

export function qboKpis(loc: LocationKey): {
  revenue: number;
  payroll: number;
  noi: number;
} {
  const t = qboTrend(loc);
  const last = t[t.length - 1]!;
  return { revenue: last.revenue, payroll: last.payroll, noi: last.noi };
}
