"use client";

import { useMemo, useState, type ReactNode } from "react";
import { PinnedDemo } from "@/components/demo/pinned-demo";
import { RevenueAreaChart } from "@/components/charts/revenue-area-chart";
import { ForecastChart } from "@/components/charts/forecast-chart";
import { OccupancyBars } from "@/components/charts/occupancy-bars";
import { LaborComposedChart } from "@/components/charts/labor-composed-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { PayrollPctChart } from "@/components/charts/payroll-pct-chart";
import { Sparkline } from "@/components/charts/sparkline";
import {
  LOCATIONS,
  forecastSeries,
  laborActual,
  laborScheduled,
  laborVariance,
  occupancySeries,
  payrollPctSeries,
  positionHours,
  rangeLabel,
  revenueSeries,
  utilizationTrend,
  type LocationKey,
  type RangeKey,
} from "@/components/charts/mock-data";

const EYEBROW =
  "text-ink/65 text-[13px] font-bold tracking-widest uppercase leading-none";
const RANGES: { key: RangeKey; label: string }[] = [
  { key: "day", label: "Day" },
  { key: "week", label: "Week" },
  { key: "month", label: "30D" },
];

function Card({
  title,
  sub,
  accent,
  badge,
  className = "",
  children,
}: {
  title?: string;
  sub?: string;
  accent?: string;
  badge?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`border-line bg-surface relative overflow-hidden rounded-xl border p-5 sm:p-6 ${className}`}
    >
      {accent ? (
        <span
          className="absolute top-0 left-0 h-full w-1"
          style={{ backgroundColor: accent }}
        />
      ) : null}
      {title ? (
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className={EYEBROW}>{title}</p>
            {sub ? (
              <p className="mt-1 text-xs leading-snug text-ink-muted/70">{sub}</p>
            ) : null}
          </div>
          {badge}
        </div>
      ) : null}
      {children}
    </div>
  );
}

function ScopeBadge({ children }: { children: ReactNode }) {
  return (
    <span className="border-line/80 inline-flex items-center rounded-md border bg-ink/[0.04] px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-ink-muted/70 uppercase">
      {children}
    </span>
  );
}

export function DashboardDemo() {
  const [range, setRange] = useState<RangeKey>("week");
  const [loc, setLoc] = useState<LocationKey>("all");

  const revenue = useMemo(() => revenueSeries(range, loc), [range, loc]);
  const forecast = useMemo(() => forecastSeries(loc), [loc]);
  const occupancy = useMemo(() => occupancySeries(loc), [loc]);
  const trend = useMemo(() => utilizationTrend(range, loc), [range, loc]);
  const sched = useMemo(() => laborScheduled(range, loc), [range, loc]);
  const act = useMemo(() => laborActual(range, loc), [range, loc]);
  const varc = useMemo(() => laborVariance(range, loc), [range, loc]);
  const positions = useMemo(() => positionHours(loc), [loc]);
  const payroll = useMemo(() => payrollPctSeries(range, loc), [range, loc]);

  const activeLoc = LOCATIONS.find((l) => l.key === loc) ?? LOCATIONS[0];

  const cap = occupancy[0]?.capacity ?? 320;
  const avgUsed = Math.round(
    occupancy.reduce((s, r) => s + r.used, 0) / occupancy.length,
  );
  const util = Math.round(
    (occupancy.reduce((s, r) => s + r.used / r.capacity, 0) / occupancy.length) *
      100,
  );
  const schedHrs = Math.round(sched.reduce((s, r) => s + r.staffHours, 0));
  const workedHrs = Math.round(act.reduce((s, r) => s + r.staffHours, 0));
  const dogsTotal = sched.reduce((s, r) => s + r.dogs, 0);
  const dogsPerHr = Math.round((dogsTotal / Math.max(1, workedHrs)) * 100) / 100;
  const avgPct =
    Math.round((payroll.reduce((s, r) => s + r.pct, 0) / payroll.length) * 10) /
    10;
  const overTarget = avgPct > 32;

  const capAccent =
    util >= 92 ? "#dc2626" : util >= 80 ? "#f59e0b" : "#059669";

  const toolbar = (
    <header className="border-line bg-background flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-baseline gap-3">
        <h1 className="text-base font-semibold tracking-tight text-ink sm:text-lg">
          Mission Control
        </h1>
        <span className="hidden text-xs text-ink-muted/50 sm:inline">
          {rangeLabel(range)} · America/Chicago
        </span>
        <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 uppercase">
          Live
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="border-line inline-flex rounded-lg border bg-white/40 p-1">
          {RANGES.map((r) => {
            const on = range === r.key;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => setRange(r.key)}
                className={`rounded-md px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase transition ${
                  on
                    ? "bg-ink text-white"
                    : "bg-ink/5 text-ink-muted/60 hover:bg-ink/10"
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
        <select
          value={loc}
          onChange={(e) => setLoc(e.target.value as LocationKey)}
          className="border-line bg-background/80 h-8 rounded-md border px-2 text-xs font-medium text-ink"
          aria-label="Location"
        >
          {LOCATIONS.map((l) => (
            <option key={l.key} value={l.key}>
              {l.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );

  return (
    <div className="kcc-light">
      <PinnedDemo title="app.kenneleyes.com/dashboard" toolbar={toolbar}>
        <div className="flex flex-col gap-6 p-4 sm:p-6">
            {/* KPI row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
              {/* Capacity utilization */}
              <Card title="Capacity utilization" accent={capAccent}>
                <div className="flex items-baseline gap-2">
                  <span className="tabular text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
                    {util}%
                  </span>
                  <span className="font-mono text-xs text-ink-muted/40 uppercase">
                    max {cap}
                  </span>
                </div>
                <div className="border-line/70 mt-3 grid grid-cols-3 divide-x divide-line/70 border-t pt-3 text-center">
                  <Stat k="Max/day" v={`${cap}`} />
                  <Stat k="Avg dogs" v={`${avgUsed}`} />
                  <Stat
                    k="Status"
                    v={util >= 92 ? "Tight" : util >= 80 ? "Healthy" : "Open"}
                  />
                </div>
                <p className="mt-4 mb-1 text-[10px] font-bold tracking-widest text-ink-muted/60 uppercase">
                  Daily trend
                </p>
                <Sparkline trend={trend} />
              </Card>

              {/* Labor efficiency */}
              <Card title="Labor efficiency" accent="#059669">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] font-bold tracking-widest text-ink-muted/60 uppercase">
                      Hours
                    </p>
                    <dl className="mt-2 space-y-1.5">
                      <Row k="Scheduled" v={`${schedHrs}h`} />
                      <Row k="Worked" v={`${workedHrs}h`} />
                    </dl>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-widest text-ink-muted/60 uppercase">
                      Efficiency
                    </p>
                    <dl className="mt-2 space-y-1.5">
                      <Row k="Dog-days" v={`${dogsTotal}`} />
                      <Row k="Payroll %" v={`${avgPct}%`} />
                    </dl>
                  </div>
                </div>
                <div className="border-line/70 mt-4 flex items-end justify-between border-t pt-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-ink-muted/60 uppercase">
                      Dogs / worked hr
                    </p>
                    <span className="tabular text-xl font-bold text-ink sm:text-2xl">
                      {dogsPerHr}
                    </span>
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                      overTarget
                        ? "bg-red-500/10 text-red-600"
                        : "bg-emerald-500/10 text-emerald-700"
                    }`}
                  >
                    {overTarget ? "Over target" : "On target"}
                  </span>
                </div>
              </Card>

              {/* Labor optimization */}
              <Card
                title="Labor optimization"
                sub="Dogs vs. staff hours"
                badge={<ScopeBadge>{rangeLabel(range)}</ScopeBadge>}
                className="sm:col-span-2 xl:col-span-1"
              >
                <LaborComposedChart
                  scheduled={sched}
                  actual={act}
                  variance={varc}
                  height={232}
                />
              </Card>
            </div>

            {/* Payroll % of revenue — full width */}
            <Card
              title="Payroll as % of revenue"
              accent={overTarget ? "#ef4444" : "#10b981"}
              badge={
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className="text-[9px] font-bold tracking-widest text-ink-muted/50 uppercase">
                      Avg
                    </p>
                    <p
                      className={`tabular text-sm font-bold ${overTarget ? "text-red-500" : "text-emerald-600"}`}
                    >
                      {avgPct}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-widest text-ink-muted/50 uppercase">
                      Target
                    </p>
                    <p className="tabular text-sm font-bold text-ink-muted">32%</p>
                  </div>
                </div>
              }
            >
              <PayrollPctChart data={payroll} height={250} />
            </Card>

            {/* Operational row 1 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card
                title="Revenue by business line"
                sub="Boarding · daycare · grooming"
                badge={<ScopeBadge>{activeLoc.name}</ScopeBadge>}
              >
                <RevenueAreaChart data={revenue} height={236} />
              </Card>
              <Card
                title="Reservations & labor outlook"
                sub="Next 10 days · bars = reservations, line = scheduled hours"
                badge={<ScopeBadge>Outlook · 10d</ScopeBadge>}
              >
                <ForecastChart data={forecast} height={236} />
              </Card>
            </div>

            {/* Operational row 2 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
              <Card
                title="Daycare occupancy"
                sub="Dogs in-house vs. capacity"
                accent="#2563eb"
              >
                <OccupancyBars data={occupancy} height={236} />
              </Card>
              <Card title="Hours by position" sub="Where labor is spent">
                <DonutChart data={positions} height={236} />
              </Card>
            </div>
          </div>
      </PinnedDemo>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="px-1">
      <p className="text-[9px] font-bold tracking-wider text-ink-muted/50 uppercase">
        {k}
      </p>
      <p className="tabular mt-0.5 text-sm font-bold text-ink">{v}</p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-xs text-ink-muted/70">{k}</dt>
      <dd className="tabular text-xs font-semibold text-ink">{v}</dd>
    </div>
  );
}
