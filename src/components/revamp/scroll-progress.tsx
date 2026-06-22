"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollY, subscribeScroll } from "@/lib/scroll";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let max = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    let ticking = false;

    const measure = () => {
      max = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
    };

    const render = () => {
      ticking = false;
      const pct = max > 0 ? (getScrollY() / max) * 100 : 0;
      bar.style.transform = `scaleX(${pct / 100})`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(render);
    };

    const onResize = () => {
      measure();
      render();
    };

    measure();
    render();

    const unsubScroll = subscribeScroll(onScroll);
    window.addEventListener("resize", onResize);
    ScrollTrigger.addEventListener("refresh", onResize);

    return () => {
      unsubScroll();
      window.removeEventListener("resize", onResize);
      ScrollTrigger.removeEventListener("refresh", onResize);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
      style={{ background: "var(--trail-surface-strong)" }}
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left will-change-transform"
        style={{
          transform: "scaleX(0)",
          background: "var(--trail-progress)",
        }}
      />
    </div>
  );
}
