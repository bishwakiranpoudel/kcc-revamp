"use client";

import { useEffect, useRef, useState } from "react";
import type { PositionSlice } from "./mock-data";

/** Horizontal hours-by-position bars with grow-on-reveal animation. */
export function PositionBars({ data }: { data: PositionSlice[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const max = Math.max(...data.map((d) => d.hours), 1);

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
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-3">
      {data.map((d, i) => {
        const pct = (d.hours / max) * 100;
        return (
          <div key={d.label} className="group">
            <div className="mb-1 flex items-center justify-between text-[13px]">
              <span className="font-medium text-ink">{d.label}</span>
              <span className="tabular font-semibold text-ink-muted">{d.hours}h</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-paper-2">
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-out"
                style={{
                  width: shown ? `${pct}%` : "0%",
                  backgroundColor: d.color,
                  transitionDelay: `${i * 80}ms`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
