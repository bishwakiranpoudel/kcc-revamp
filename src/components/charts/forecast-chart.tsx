"use client";

import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ForecastRow } from "./mock-data";
import { ClientOnly } from "@/components/client-only";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { payload?: ForecastRow }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-2 text-xs">
      <p className="mb-1 font-mono text-[10px] text-ink-muted/70">
        {label} {row.projected ? "· projected" : ""}
      </p>
      <p className="flex items-center justify-between gap-4">
        <span className="text-ink-muted">Scheduled revenue</span>
        <span className="tabular font-bold text-data-daycare">{row.reservations}</span>
      </p>
      <p className="mt-0.5 flex items-center justify-between gap-4">
        <span className="text-ink-muted">Scheduled payroll hrs</span>
        <span className="tabular font-semibold text-data-scheduled">{row.scheduledHours}</span>
      </p>
    </div>
  );
}

export function ForecastChart({
  data,
  height = 220,
}: {
  data: ForecastRow[];
  height?: number;
}) {
  return (
    <div style={{ height }} className="w-full">
      <ClientOnly>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "var(--ink-muted)" }}
            tickLine={false}
            axisLine={{ stroke: "var(--line)" }}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "var(--ink-muted)" }}
            tickLine={false}
            axisLine={false}
            width={32}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(15,23,42,0.04)" }} />
          <Bar dataKey="reservations" radius={[4, 4, 0, 0]} maxBarSize={26}>
            {data.map((row, i) => (
              <Cell
                key={i}
                fill="var(--data-daycare)"
                fillOpacity={row.projected ? 0.4 : 0.92}
              />
            ))}
          </Bar>
          <Line
            type="monotone"
            dataKey="scheduledHours"
            stroke="var(--data-scheduled)"
            strokeWidth={2.5}
            dot={{ r: 2.5, fill: "var(--data-scheduled)", stroke: "#fff", strokeWidth: 1 }}
            isAnimationActive
            animationDuration={650}
          />
        </ComposedChart>
      </ResponsiveContainer>
      </ClientOnly>
    </div>
  );
}
