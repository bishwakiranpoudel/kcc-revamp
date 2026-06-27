"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatUsd, formatUsdCompact, type RevenueRow } from "./mock-data";
import { ClientOnly } from "@/components/client-only";

const SERIES = [
  { key: "boarding", label: "Boarding", color: "var(--data-boarding)" },
  { key: "daycare", label: "Daycare", color: "var(--data-daycare)" },
  { key: "grooming", label: "Grooming", color: "var(--data-grooming)" },
] as const;

type Mode = "stacked" | "lines";

type TipEntry = { payload?: RevenueRow };

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TipEntry[];
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-2 text-xs">
      <p className="mb-1.5 font-mono text-[10px] text-ink-muted/70">{row.date}</p>
      <ul className="space-y-1">
        {SERIES.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="flex-1 text-ink-muted">{s.label}</span>
            <span className="tabular font-semibold text-ink">
              {formatUsd(row[s.key])}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-between gap-4 border-t border-line pt-1.5">
        <span className="text-ink-muted">Total</span>
        <span className="tabular font-bold text-ink">{formatUsd(row.total)}</span>
      </div>
    </div>
  );
}

export function RevenueAreaChart({
  data,
  height = 240,
}: {
  data: RevenueRow[];
  height?: number;
}) {
  const [mode, setMode] = useState<Mode>("stacked");
  const dense = data.length > 8;
  const seg =
    "rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors";

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex justify-end">
        <div className="flex rounded-lg bg-navy-800/[0.06] p-1">
          {(["stacked", "lines"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`${seg} ${
                mode === m
                  ? "bg-surface text-ink"
                  : "text-ink-muted/60 hover:text-ink"
              }`}
            >
              {m === "stacked" ? "Stacked" : "Lines"}
            </button>
          ))}
        </div>
      </div>
      <div style={{ height }} className="w-full">
        <ClientOnly>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 6, right: 6, left: -8, bottom: 0 }}
          >
            <defs>
              {SERIES.map((s) => (
                <linearGradient
                  key={s.key}
                  id={`rev-${s.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={0.04} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--line)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "var(--ink-muted)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--line)" }}
              interval={dense ? Math.floor(data.length / 6) : 0}
            />
            <YAxis
              tickFormatter={(v) => formatUsdCompact(Number(v))}
              tick={{ fontSize: 10, fill: "var(--ink-muted)" }}
              tickLine={false}
              axisLine={false}
              width={44}
            />
            <Tooltip
              cursor={{ stroke: "var(--line)", strokeWidth: 1 }}
              content={<ChartTooltip />}
            />
            {SERIES.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stackId={mode === "stacked" ? "rev" : undefined}
                stroke={s.color}
                strokeWidth={2}
                fill={mode === "stacked" ? `url(#rev-${s.key})` : "transparent"}
                fillOpacity={1}
                isAnimationActive
                animationDuration={650}
              />
            ))}
            {mode === "stacked" ? (
              <Line
                type="monotone"
                dataKey="total"
                stroke="#047857"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={false}
                isAnimationActive={false}
              />
            ) : null}
          </AreaChart>
        </ResponsiveContainer>
        </ClientOnly>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {SERIES.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5 text-[11px] text-ink-muted">
            <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
