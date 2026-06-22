"use client";

import { useId, useState } from "react";
import type { TrendPoint } from "./mock-data";

const W = 360;
const H = 120;
const padL = 30;
const padR = 8;
const padT = 12;
const padB = 20;

function y(pct: number) {
  const c = Math.min(100, Math.max(0, pct));
  return padT + (1 - c / 100) * (H - padT - padB);
}

/** Code-built SVG utilization sparkline with hover crosshair (mirrors the product). */
export function Sparkline({
  trend,
  color = "var(--data-daycare)",
}: {
  trend: TrendPoint[];
  color?: string;
}) {
  const gradId = useId();
  const [active, setActive] = useState<number | null>(null);
  if (trend.length < 2) return null;

  const plotW = W - padL - padR;
  const coords = trend.map((p, i) => ({
    x: padL + (i / (trend.length - 1)) * plotW,
    y: y(p.pct),
    ...p,
  }));
  const line = coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const area = `M ${coords[0]!.x.toFixed(1)} ${(H - padB).toFixed(1)} ${coords
    .map((c) => `L ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ")} L ${coords[coords.length - 1]!.x.toFixed(1)} ${(H - padB).toFixed(1)} Z`;

  const labelIdx = [0, Math.floor(trend.length / 2), trend.length - 1];
  const act = active != null ? coords[active] : null;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full touch-none"
      preserveAspectRatio="none"
      role="img"
      aria-label="Utilization trend"
      onMouseLeave={() => setActive(null)}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.28} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
      </defs>

      {[100, 50, 0].map((g) => (
        <g key={g}>
          <line
            x1={padL}
            x2={W - padR}
            y1={y(g)}
            y2={y(g)}
            stroke="var(--ink)"
            strokeOpacity={g === 0 ? 0.14 : 0.06}
            strokeDasharray={g === 0 ? undefined : "3 4"}
          />
          <text x={4} y={y(g) + 3} fill="var(--ink-muted)" fontSize={9} className="tabular">
            {g}%
          </text>
        </g>
      ))}

      <path d={area} fill={`url(#${gradId})`} />
      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth={2.25}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {act ? (
        <line
          x1={act.x}
          x2={act.x}
          y1={padT}
          y2={H - padB}
          stroke="var(--ink)"
          strokeOpacity={0.2}
        />
      ) : null}

      {coords.map((c, i) => (
        <g key={i}>
          <rect
            x={c.x - plotW / (trend.length - 1) / 2}
            y={0}
            width={plotW / (trend.length - 1)}
            height={H}
            fill="transparent"
            onMouseEnter={() => setActive(i)}
          />
          <circle
            cx={c.x}
            cy={c.y}
            r={active === i ? 4 : 2.5}
            fill={color}
            stroke="#fff"
            strokeWidth={active === i ? 1.5 : 0}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}

      {act ? (
        <text
          x={Math.min(W - padR - 4, Math.max(padL + 20, act.x))}
          y={padT + 2}
          textAnchor="middle"
          fontSize={10}
          fontWeight={700}
          fill="var(--ink)"
          className="tabular"
        >
          {act.label} · {act.pct}%
        </text>
      ) : null}

      {labelIdx.map((idx) => {
        const c = coords[idx]!;
        return (
          <text
            key={idx}
            x={c.x}
            y={H - 4}
            textAnchor={idx === 0 ? "start" : idx === trend.length - 1 ? "end" : "middle"}
            fontSize={9}
            fill="var(--ink-muted)"
          >
            {c.label}
          </text>
        );
      })}
    </svg>
  );
}
