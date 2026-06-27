"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PinnedDemo } from "@/components/demo/pinned-demo";
import { ClientOnly } from "@/components/client-only";
import { MIcon } from "@/components/m-icon";
import {
  LOCATIONS,
  qboKpis,
  qboRevenueLines,
  qboTrend,
  type LocationKey,
} from "@/components/charts/mock-data";

const CHROMATIC = [
  "#4a7ebf",
  "#389a72",
  "#8b62c4",
  "#c48a28",
  "#2a9d9a",
  "#c45d7a",
  "#5b7fd4",
];
const fill = (i: number) => CHROMATIC[i % CHROMATIC.length];

const usd0 = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const usd2 = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const kfmt = (v: number) =>
  Math.abs(v) >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`;

const CARD =
  "border-line bg-surface flex min-h-0 flex-col rounded-xl border p-5 sm:p-6";
const TITLE =
  "text-ink/65 text-xs font-bold tracking-widest uppercase";

function MoneyTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; color?: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-line bg-surface rounded-lg border px-3 py-2 text-xs">
      <p className="mb-1 font-semibold text-ink-muted">{label}</p>
      <ul className="tabular space-y-1 font-mono text-[11px]">
        {payload.map((p, i) => (
          <li key={i} className="flex justify-between gap-4">
            <span className="flex items-center gap-1.5 text-ink-muted/80">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              {p.name}
            </span>
            <span className="text-ink">{usd2(Number(p.value))}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PctTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value?: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-line bg-surface rounded-lg border px-3 py-2 text-xs">
      <p className="mb-1 font-semibold text-ink-muted">{label}</p>
      <p className="tabular font-mono text-[11px] text-ink">
        {Number(payload[0]?.value).toFixed(1)}%
      </p>
    </div>
  );
}

function Kpi({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <article className="border-line rounded-xl border bg-ink/[0.02] px-4 py-3">
      <p className="text-[10px] font-bold tracking-widest text-ink-muted/60 uppercase">
        {label}
      </p>
      <p className="tabular mt-1 text-2xl font-bold tracking-tight text-ink">
        {value}
      </p>
      <p className="mt-2 text-[10px] leading-snug text-ink-muted/50">{sub}</p>
    </article>
  );
}

export function QuickbooksDemo() {
  const [loc, setLoc] = useState<LocationKey>("all");

  const revenueLines = useMemo(() => qboRevenueLines(loc), [loc]);
  const trend = useMemo(() => qboTrend(loc), [loc]);
  const kpis = useMemo(() => qboKpis(loc), [loc]);

  const totalRevenue = revenueLines.reduce((s, l) => s + l.value, 0);
  const pctLines = revenueLines.map((l) => ({
    ...l,
    pct: Math.round((l.value / totalRevenue) * 1000) / 10,
  }));
  const barHeight = Math.max(220, 48 + revenueLines.length * 30);
  const pctCeil = Math.max(
    10,
    Math.ceil(Math.max(...trend.map((t) => t.payrollPct)) * 1.08),
  );

  const toolbar = (
    <header className="border-line bg-background flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <h1 className="text-base font-semibold tracking-tight text-ink sm:text-lg">
        QuickBooks P&amp;L
      </h1>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-ink-muted/60 uppercase">
          Location
          <select
            value={loc}
            onChange={(e) => setLoc(e.target.value as LocationKey)}
            className="border-line bg-background/80 h-8 max-w-[16rem] rounded-md border px-2 text-xs font-medium text-ink"
          >
            {LOCATIONS.map((l) => (
              <option key={l.key} value={l.key}>
                {l.name}
              </option>
            ))}
          </select>
        </label>
        <div className="border-line inline-flex items-center gap-1 rounded-lg border bg-white/40 p-1">
          <span className="border-line rounded-md border bg-ink/5 px-2 py-1 text-ink-muted/40">
            <MIcon name="chevron_left" size={14} />
          </span>
          <span className="tabular px-2 text-[11px] font-semibold text-ink-muted">
            May 2025
          </span>
          <span className="border-line rounded-md border bg-ink/5 px-2 py-1 text-ink-muted/40">
            <MIcon name="chevron_right" size={14} />
          </span>
        </div>
      </div>
    </header>
  );

  return (
    <div className="kcc-light">
      <PinnedDemo title="app.kenneleyes.com/quickbooks" toolbar={toolbar}>
        {/* Snapshot header + KPIs */}
        <div className="space-y-4 p-4 sm:p-6">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-ink-muted/50 uppercase">
                Stored Profit &amp; Loss
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">
                2025-05-01 → 2025-05-31
              </h2>
              <p className="mt-1 text-[11px] text-ink-muted/45">
                Realm 9130 · USD · Accrual
                <span className="mx-2">·</span>Fetched 2 hours ago
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Kpi
                label="Revenue (excl. tips)"
                value={usd0(kpis.revenue)}
                sub="Total income for the month, tips removed."
              />
              <Kpi
                label="Payroll (excl. tips)"
                value={usd0(kpis.payroll)}
                sub="Payroll expense net of payroll tips."
              />
              <Kpi
                label="Net operating income"
                value={usd0(kpis.noi)}
                sub="From the monthly series (selected month)."
              />
            </div>

            {/* Composition charts */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:items-stretch">
              {/* Revenue by business line — horizontal bar */}
              <div className={CARD}>
                <p className={`${TITLE} mb-1`}>Monthly revenue by business line</p>
                <p className="mb-4 text-[10px] leading-snug text-ink-muted/45">
                  Stored P&amp;L income accounts, largest first.
                </p>
                <div style={{ height: barHeight }} className="w-full">
                  <ClientOnly>
                    <ResponsiveContainer width="100%" height="100%" debounce={50}>
                      <BarChart
                        layout="vertical"
                        data={revenueLines}
                        margin={{ top: 8, right: 16, left: 4, bottom: 8 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="var(--line)"
                          horizontal={false}
                        />
                        <XAxis
                          type="number"
                          tickFormatter={kfmt}
                          tick={{ fontSize: 10, fill: "var(--ink)", opacity: 0.48 }}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          width={128}
                          tick={{ fontSize: 10, fill: "var(--ink)", opacity: 0.6 }}
                        />
                        <Tooltip
                          content={<MoneyTooltip />}
                          cursor={{ fill: "rgba(0,0,0,0.04)" }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={22}>
                          {revenueLines.map((_, i) => (
                            <Cell key={i} fill={fill(i)} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ClientOnly>
                </div>
              </div>

              {/* Revenue by business line (%) — donut + list */}
              <div className={CARD}>
                <p className={`${TITLE} mb-1`}>Revenue by business line (%)</p>
                <p className="mb-4 text-[10px] leading-snug text-ink-muted/45">
                  Share of monthly revenue per line.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center">
                  <div className="border-line/80 flex min-h-[220px] items-center justify-center rounded-xl border bg-ink/[0.025] p-4 sm:min-h-[240px]">
                    <ClientOnly>
                      <ResponsiveContainer width="100%" height={210} debounce={50}>
                        <PieChart>
                          <Pie
                            data={pctLines}
                            dataKey="pct"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius="48%"
                            outerRadius="82%"
                            paddingAngle={0}
                            stroke="var(--surface)"
                            strokeWidth={2}
                            isAnimationActive={false}
                          >
                            {pctLines.map((_, i) => (
                              <Cell key={i} fill={fill(i)} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </ClientOnly>
                  </div>
                  <ul className="border-line/60 divide-y divide-slate-200/80 rounded-lg border bg-ink/[0.02] p-1">
                    {pctLines.map((row, i) => (
                      <li
                        key={row.name}
                        className="flex items-center gap-3 px-2.5 py-2 text-[11px] text-ink/75"
                      >
                        <span
                          className="size-2.5 shrink-0 rounded-sm ring-1 ring-black/[0.06]"
                          style={{ backgroundColor: fill(i) }}
                        />
                        <span className="min-w-0 flex-1 leading-snug font-medium">
                          {row.name}
                        </span>
                        <span className="tabular shrink-0 text-right font-mono text-[11px]">
                          <span className="block text-ink/70">{row.pct}%</span>
                          <span className="block text-[10px] text-ink-muted/40">
                            {usd0(row.value)}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Trend charts */}
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
              {/* Payroll / Revenue % */}
              <div className={CARD}>
                <p className={`${TITLE} mb-4`}>Payroll / revenue (%)</p>
                <div className="h-[240px] w-full">
                  <ClientOnly>
                    <ResponsiveContainer width="100%" height="100%" debounce={50}>
                      <ComposedChart data={trend}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="var(--line)"
                          opacity={0.75}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="label"
                          tick={{ fontSize: 10, fill: "var(--ink)", opacity: 0.5 }}
                        />
                        <YAxis
                          domain={[0, pctCeil]}
                          tickFormatter={(v) => `${v}%`}
                          tick={{ fontSize: 10, fill: "var(--ink)", opacity: 0.5 }}
                        />
                        <Tooltip content={<PctTooltip />} />
                        <Area
                          type="linear"
                          dataKey="payrollPct"
                          name="Payroll / revenue %"
                          fill="rgba(52, 211, 153, 0.18)"
                          stroke="#047857"
                          strokeWidth={2}
                          connectNulls
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ClientOnly>
                </div>
              </div>

              {/* Revenue vs payroll $ */}
              <div className={CARD}>
                <p className={`${TITLE} mb-4`}>Revenue vs. payroll ($)</p>
                <div className="h-[240px] w-full">
                  <ClientOnly>
                    <ResponsiveContainer width="100%" height="100%" debounce={50}>
                      <ComposedChart data={trend}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="var(--line)"
                          opacity={0.75}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="label"
                          tick={{ fontSize: 10, fill: "var(--ink)", opacity: 0.5 }}
                        />
                        <YAxis
                          tickFormatter={(v) => `${kfmt(Number(v))}`}
                          tick={{ fontSize: 10, fill: "var(--ink)", opacity: 0.5 }}
                        />
                        <Tooltip content={<MoneyTooltip />} />
                        <Legend wrapperStyle={{ fontSize: "11px" }} />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          name="Total revenue"
                          stroke="#2563eb"
                          strokeWidth={2.25}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="payroll"
                          name="Payroll expense"
                          stroke="#9333ea"
                          strokeWidth={2.25}
                          dot={{ r: 3 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ClientOnly>
                </div>
              </div>

              {/* NOI & net income */}
              <div className={CARD}>
                <p className={`${TITLE} mb-4`}>Operating &amp; net income ($)</p>
                <div className="h-[240px] w-full">
                  <ClientOnly>
                    <ResponsiveContainer width="100%" height="100%" debounce={50}>
                      <ComposedChart data={trend}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="var(--line)"
                          opacity={0.75}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="label"
                          tick={{ fontSize: 10, fill: "var(--ink)", opacity: 0.5 }}
                        />
                        <YAxis
                          tickFormatter={(v) => `${kfmt(Number(v))}`}
                          tick={{ fontSize: 10, fill: "var(--ink)", opacity: 0.5 }}
                        />
                        <Tooltip content={<MoneyTooltip />} />
                        <Legend wrapperStyle={{ fontSize: "11px" }} />
                        <Line
                          type="monotone"
                          dataKey="noi"
                          name="Operating income"
                          stroke="#0369a1"
                          strokeWidth={2}
                          dot={{ r: 2.75 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="netIncome"
                          name="Net income"
                          stroke="#c026d3"
                          strokeWidth={2}
                          dot={{ r: 2.75 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ClientOnly>
                </div>
              </div>

              {/* Core expenses */}
              <div className={CARD}>
                <p className={`${TITLE} mb-1`}>Core expenses index ($)</p>
                <p className="mb-4 text-[10px] leading-snug text-ink-muted/45">
                  Total expense − payroll − rent (from stored P&amp;L rollup).
                </p>
                <div className="h-[228px] w-full">
                  <ClientOnly>
                    <ResponsiveContainer width="100%" height="100%" debounce={50}>
                      <ComposedChart data={trend}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="var(--line)"
                          opacity={0.75}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="label"
                          tick={{ fontSize: 10, fill: "var(--ink)", opacity: 0.5 }}
                        />
                        <YAxis
                          tickFormatter={(v) => `${kfmt(Number(v))}`}
                          tick={{ fontSize: 10, fill: "var(--ink)", opacity: 0.5 }}
                        />
                        <Tooltip content={<MoneyTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="coreExpenses"
                          name="Exp − payroll − rent"
                          stroke="#92400e"
                          fill="rgba(245, 158, 11, 0.15)"
                          strokeWidth={2}
                          connectNulls
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ClientOnly>
                </div>
              </div>
            </div>
          </div>
      </PinnedDemo>
    </div>
  );
}
