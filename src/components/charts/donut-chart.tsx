"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { PositionSlice } from "./mock-data";
import { ClientOnly } from "@/components/client-only";

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload?: PositionSlice & { pct: number } }[];
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-2 text-xs shadow-sm">
      <p className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-1.5 text-ink-muted">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: row.color }}
          />
          {row.label}
        </span>
        <span className="tabular font-semibold text-ink">{row.hours}h</span>
      </p>
      <p className="mt-0.5 text-right text-[10px] text-ink-muted/60">
        {row.pct}% of hours
      </p>
    </div>
  );
}

export function DonutChart({
  data,
  height = 260,
}: {
  data: PositionSlice[];
  height?: number;
}) {
  const total = data.reduce((s, d) => s + d.hours, 0);
  const rows = data.map((d) => ({
    ...d,
    pct: Math.round((d.hours / total) * 100),
  }));

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <div className="relative mx-auto shrink-0" style={{ width: height, height }}>
        <ClientOnly>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={rows}
                dataKey="hours"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius="58%"
                outerRadius="80%"
                paddingAngle={1}
                stroke="var(--surface)"
                strokeWidth={2}
                isAnimationActive
                animationDuration={600}
              >
                {rows.map((d) => (
                  <Cell key={d.label} fill={d.color} />
                ))}
              </Pie>
              <Tooltip content={<DonutTooltip />} cursor={false} />
            </PieChart>
          </ResponsiveContainer>
        </ClientOnly>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="tabular text-2xl font-bold tracking-tight text-ink">
            {total}h
          </span>
          <span className="mt-0.5 text-[10px] font-bold tracking-widest text-ink-muted/60 uppercase">
            Position hours
          </span>
        </div>
      </div>

      <ul className="w-full space-y-0.5 sm:flex-1">
        {rows.map((d) => (
          <li
            key={d.label}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left"
          >
            <span
              className="size-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: d.color }}
            />
            <span className="flex-1 truncate text-[13px] font-medium text-ink">
              {d.label}
            </span>
            <span className="tabular text-[13px] font-semibold text-ink">
              {d.pct}%
            </span>
            <span className="tabular w-14 text-right text-xs text-ink-muted">
              {d.hours}h
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
