"use client";

import { useEffect, useRef, useState } from "react";

/** SVG arc gauge for a single 0–100 metric (capacity utilization). */
export function Gauge({
  value,
  label,
  size = 180,
}: {
  value: number;
  label: string;
  size?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const r = 70;
  const cx = 100;
  const cy = 100;
  const startAngle = 135;
  const sweep = 270;
  const circ = 2 * Math.PI * r;
  const arcLen = (sweep / 360) * circ;
  const pct = Math.min(100, Math.max(0, value));
  const color =
    pct >= 90 ? "var(--data-danger)" : pct >= 80 ? "var(--data-grooming)" : "var(--data-revenue)";

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg
        ref={ref}
        viewBox="0 0 200 200"
        width={size}
        height={size}
        style={{ transform: `rotate(${startAngle}deg)` }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--paper-2)"
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={`${arcLen} ${circ}`}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={`${shown ? (pct / 100) * arcLen : 0} ${circ}`}
          style={{ transition: "stroke-dasharray 1s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="-mt-[55%] flex flex-col items-center pb-[15%]">
        <span className="tabular text-4xl font-bold tracking-tight text-ink">{pct}%</span>
        <span className="mt-1 text-xs font-medium text-ink-muted">{label}</span>
      </div>
    </div>
  );
}
