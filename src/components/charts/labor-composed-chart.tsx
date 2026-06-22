"use client";

import { useState } from "react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { LaborDay, LaborVarianceDay } from "./mock-data";
import { ClientOnly } from "@/components/client-only";

type Mode = "scheduled" | "actual" | "variance";

function Tip({
  active,
  payload,
  label,
  mode,
}: {
  active?: boolean;
  payload?: { payload?: LaborDay & LaborVarianceDay }[];
  label?: string;
  mode: Mode;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-2 text-xs shadow-sm">
      <p className="mb-1 font-mono text-[10px] text-ink-muted">{label}</p>
      <p className="flex items-center justify-between gap-4">
        <span className="text-ink-muted">Dogs</span>
        <span className="tabular font-bold text-data-daycare">{row.dogs}</span>
      </p>
      {mode === "variance" ? (
        <p className="mt-0.5 flex items-center justify-between gap-4">
          <span className="text-ink-muted">Variance</span>
          <span
            className={`tabular font-semibold ${
              row.varianceHours > 0 ? "text-data-danger" : "text-data-revenue"
            }`}
          >
            {row.varianceHours > 0 ? "+" : ""}
            {row.varianceHours}h
          </span>
        </p>
      ) : (
        <p className="mt-0.5 flex items-center justify-between gap-4">
          <span className="text-ink-muted">Staff hrs</span>
          <span className="tabular font-semibold text-data-grooming">
            {row.staffHours}
          </span>
        </p>
      )}
    </div>
  );
}

const TABS: { key: Mode; label: string }[] = [
  { key: "scheduled", label: "Scheduled" },
  { key: "actual", label: "Actual" },
  { key: "variance", label: "Variance" },
];

export function LaborComposedChart({
  scheduled,
  actual,
  variance,
  height = 240,
}: {
  scheduled: LaborDay[];
  actual: LaborDay[];
  variance: LaborVarianceDay[];
  height?: number;
}) {
  const [mode, setMode] = useState<Mode>("scheduled");
  const data = mode === "scheduled" ? scheduled : mode === "actual" ? actual : variance;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex justify-center">
        <div className="flex rounded-lg bg-navy-800/[0.06] p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setMode(t.key)}
              className={`rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                mode === t.key
                  ? "bg-surface text-ink shadow-sm"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height }} className="w-full">
        <ClientOnly>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data as (LaborDay & Partial<LaborVarianceDay>)[]}
              margin={{ top: 8, right: 4, left: -12, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "var(--ink-muted)" }}
                tickLine={false}
                axisLine={{ stroke: "var(--line)" }}
              />
              <YAxis
                yAxisId="dogs"
                tick={{ fontSize: 10, fill: "var(--data-daycare)" }}
                tickLine={false}
                axisLine={false}
                width={32}
              />
              <YAxis
                yAxisId="hrs"
                orientation="right"
                tick={{ fontSize: 10, fill: "var(--data-grooming)" }}
                tickLine={false}
                axisLine={false}
                width={34}
              />
              <Tooltip
                cursor={{ fill: "rgba(15,23,42,0.04)" }}
                content={<Tip mode={mode} />}
              />
              {mode === "variance" ? (
                <ReferenceLine yAxisId="hrs" y={0} stroke="var(--ink-muted)" strokeOpacity={0.4} />
              ) : null}
              <Bar yAxisId="dogs" dataKey="dogs" radius={[3, 3, 0, 0]} maxBarSize={26}>
                {data.map((_, i) => (
                  <Cell key={i} fill="var(--data-daycare)" fillOpacity={0.28} />
                ))}
              </Bar>
              <Line
                yAxisId="hrs"
                type={mode === "variance" ? "linear" : "monotone"}
                dataKey={mode === "variance" ? "varianceHours" : "staffHours"}
                stroke="var(--data-grooming)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--data-grooming)", stroke: "#fff", strokeWidth: 1 }}
                activeDot={{ r: 5 }}
                isAnimationActive
                animationDuration={550}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ClientOnly>
      </div>

      <div className="mt-3 flex justify-center gap-5">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-ink-muted">
          <span className="h-1.5 w-3 rounded-sm bg-data-daycare/30" />
          Dogs
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-ink-muted">
          <span className="h-0.5 w-3 rounded-full bg-data-grooming" />
          {mode === "variance" ? "Worked − scheduled" : "Staff hours"}
        </span>
      </div>
    </div>
  );
}
