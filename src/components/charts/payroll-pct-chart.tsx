"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PayrollPctRow } from "./mock-data";
import { ClientOnly } from "@/components/client-only";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value?: number; payload?: PayrollPctRow }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  const over = row.pct > row.goal;
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-2 text-xs shadow-sm">
      <p className="mb-1 font-mono text-[10px] text-ink-muted/70">{label}</p>
      <p className="flex items-center justify-between gap-4">
        <span className="text-ink-muted">Payroll %</span>
        <span
          className={`tabular font-bold ${over ? "text-data-danger" : "text-data-revenue"}`}
        >
          {row.pct}%
        </span>
      </p>
      <p className="mt-0.5 flex items-center justify-between gap-4 text-ink-muted/70">
        <span>Goal</span>
        <span className="tabular">{row.goal}%</span>
      </p>
    </div>
  );
}

export function PayrollPctChart({
  data,
  height = 180,
}: {
  data: PayrollPctRow[];
  height?: number;
}) {
  const goal = data[0]?.goal ?? 32;
  const dense = data.length > 8;
  return (
    <div style={{ height }} className="w-full">
      <ClientOnly>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "var(--ink-muted)" }}
            tickLine={false}
            axisLine={{ stroke: "var(--line)" }}
            interval={dense ? Math.floor(data.length / 6) : 0}
          />
          <YAxis
            domain={[20, 45]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 10, fill: "var(--ink-muted)" }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--line)" }} />
          <ReferenceLine
            y={goal}
            stroke="rgba(148, 163, 184, 0.85)"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: `Goal ${goal}%`,
              position: "insideTopRight",
              fill: "rgba(100, 116, 139, 0.9)",
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <Line
            type="monotone"
            dataKey="pct"
            stroke="rgba(15, 23, 42, 0.7)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "rgba(15, 23, 42, 0.8)", stroke: "#fff", strokeWidth: 1.5 }}
            isAnimationActive
            animationDuration={650}
          />
        </LineChart>
      </ResponsiveContainer>
      </ClientOnly>
    </div>
  );
}
