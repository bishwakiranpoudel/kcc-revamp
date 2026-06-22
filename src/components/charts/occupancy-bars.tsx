"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { OccupancyRow } from "./mock-data";
import { ClientOnly } from "@/components/client-only";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { payload?: OccupancyRow }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  const pct = Math.round((row.used / row.capacity) * 100);
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-2 text-xs shadow-sm">
      <p className="mb-1 font-mono text-[10px] text-ink-muted/70">{label}</p>
      <p className="flex items-center justify-between gap-4">
        <span className="text-ink-muted">In-house</span>
        <span className="tabular font-bold text-ink">{row.used}</span>
      </p>
      <p className="mt-0.5 flex items-center justify-between gap-4 text-ink-muted/70">
        <span>Utilization</span>
        <span className="tabular font-semibold text-data-daycare">{pct}%</span>
      </p>
    </div>
  );
}

export function OccupancyBars({
  data,
  height = 180,
}: {
  data: OccupancyRow[];
  height?: number;
}) {
  return (
    <div style={{ height }} className="w-full">
      <ClientOnly>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
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
            width={36}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(15,23,42,0.04)" }} />
          <Bar
            dataKey="used"
            radius={[4, 4, 0, 0]}
            maxBarSize={30}
            fill="var(--data-daycare)"
          />
        </BarChart>
      </ResponsiveContainer>
      </ClientOnly>
    </div>
  );
}
