"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ClientOnly } from "@/components/client-only";

const C = {
  booked: "#4d79b9",
  payroll: "#e6862e",
  pct: "#2f9e6f",
  target: "#df3b34",
};

type Row = { day: string; booked: number; payroll: number; pct: number };

const DATA: Row[] = [
  { day: "6/28", booked: 500, payroll: 390, pct: 78.0 },
  { day: "6/29", booked: 900, payroll: 410, pct: 45.5 },
  { day: "6/30", booked: 940, payroll: 540, pct: 57.7 },
  { day: "7/1", booked: 1080, payroll: 430, pct: 39.4 },
  { day: "7/2", booked: 1600, payroll: 620, pct: 38.8 },
  { day: "7/3", booked: 1750, payroll: 485, pct: 27.9 },
  { day: "7/4", booked: 1470, payroll: 565, pct: 38.7 },
];

const TARGET = 40;

function Seg({ left, right }: { left: string; right: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[color:var(--border-hairline)] p-0.5 text-[0.5rem] font-bold uppercase tracking-[0.08em]">
      <span className="rounded-[4px] bg-trail-ink px-1.5 py-0.5 text-white">
        {left}
      </span>
      <span className="px-1.5 py-0.5 text-trail-faint">{right}</span>
    </span>
  );
}

function LegendItem({
  marker,
  children,
}: {
  marker: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-1.5">
      {marker}
      {children}
    </span>
  );
}

export function HeroPayrollChart() {
  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-trail-ink">
            Scheduled payroll vs. revenue
          </p>
          <span className="mt-1 inline-flex rounded-md bg-trail-green/12 px-1.5 py-0.5 text-[0.5rem] font-bold uppercase tracking-[0.1em] text-trail-green">
            Outlook · 7d
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Seg left="Booked" right="Projected" />
          <Seg left="7d" right="14d" />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.5rem] font-semibold uppercase tracking-[0.06em] text-trail-muted">
        <LegendItem
          marker={<span className="size-2 rounded-full" style={{ background: C.booked }} />}
        >
          Booked revenue
        </LegendItem>
        <LegendItem
          marker={<span className="size-2 rounded-full" style={{ background: C.payroll }} />}
        >
          Scheduled payroll
        </LegendItem>
        <LegendItem
          marker={<span className="h-[2px] w-3.5 rounded" style={{ background: C.pct }} />}
        >
          Payroll % of revenue
        </LegendItem>
        <LegendItem
          marker={
            <span
              className="w-3.5 border-t-2 border-dashed"
              style={{ borderColor: C.target }}
            />
          }
        >
          Target 40%
        </LegendItem>
      </div>

      <div className="mt-2 h-[178px] w-full">
        <ClientOnly>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={DATA}
              margin={{ top: 6, right: 4, left: -10, bottom: 0 }}
              barGap={1}
              barCategoryGap="26%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(15,23,42,0.07)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(15,23,42,0.1)" }}
              />
              <YAxis
                yAxisId="left"
                domain={[0, 2000]}
                ticks={[0, 500, 1000, 1500, 2000]}
                tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                tick={{ fontSize: 8, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={false}
                width={34}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 8, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <ReferenceLine
                yAxisId="right"
                y={TARGET}
                stroke={C.target}
                strokeDasharray="5 4"
                strokeWidth={1.5}
              />
              <Bar
                yAxisId="left"
                dataKey="booked"
                fill={C.booked}
                radius={[2, 2, 0, 0]}
                maxBarSize={11}
                isAnimationActive={false}
              />
              <Bar
                yAxisId="left"
                dataKey="payroll"
                fill={C.payroll}
                radius={[2, 2, 0, 0]}
                maxBarSize={11}
                isAnimationActive={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="pct"
                stroke={C.pct}
                strokeWidth={2.5}
                dot={{ r: 2.5, fill: C.pct, stroke: "#fff", strokeWidth: 1 }}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ClientOnly>
      </div>

      <div className="mt-3 border-t border-[color:var(--border-hairline)] pt-2.5">
        <div className="grid grid-cols-7 gap-1 text-center">
          {DATA.map((d) => (
            <div key={d.day}>
              <div className="text-[0.5rem] font-medium text-trail-faint">
                {d.day}
              </div>
              <div
                className={`mt-0.5 rounded px-0.5 py-0.5 text-[0.5625rem] font-bold tabular ${
                  d.pct > TARGET
                    ? "bg-amber-200/70 text-amber-900"
                    : "text-trail-ink"
                }`}
              >
                {d.pct.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
