"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Metrics = {
  bodyH: number;
  overflow: number;
  topPx: number;
  sceneH: number;
  ready: boolean;
};

/**
 * Scroll-pinned demo window. As the page scrolls into it, the window parks
 * dead-center in the viewport; continued scrolling drives the demo's own
 * content (1:1), and once it bottoms out the page releases to the next
 * section. Falls back to a normal inline window when the content fits, when
 * reduced motion is requested, or before measurement on first paint.
 */
export function PinnedDemo({
  title,
  toolbar,
  children,
}: {
  title: string;
  toolbar: ReactNode;
  children: ReactNode;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [m, setM] = useState<Metrics>({
    bodyH: 0,
    overflow: 0,
    topPx: 0,
    sceneH: 0,
    ready: false,
  });
  const translateRef = useRef(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const topFadeRef = useRef<HTMLDivElement>(null);
  const bottomFadeRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const measure = () => {
      const vh = window.innerHeight;
      // Clear the floating navbar at the top and leave a small bottom margin so
      // the pinned window centers inside the visible area, never under the nav.
      const topClear = 84;
      const botMargin = 28;
      const avail = vh - topClear - botMargin;
      const headH = headRef.current?.offsetHeight ?? 0;
      const contentH = contentRef.current?.scrollHeight ?? 0;
      const bodyH = Math.round(Math.min(contentH, Math.max(240, avail - headH)));
      const overflow = Math.max(0, Math.round(contentH - bodyH));
      const windowH = headH + bodyH;
      const topPx = Math.round(topClear + Math.max(0, (avail - windowH) / 2));
      const sceneH = windowH + overflow;
      setM({ bodyH, overflow, topPx, sceneH, ready: true });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (contentRef.current) ro.observe(contentRef.current);
    if (headRef.current) ro.observe(headRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const pin = m.ready && !reduced && m.overflow > 0;

  useEffect(() => {
    if (!pin) {
      translateRef.current = 0;
      if (contentRef.current) {
        contentRef.current.style.transform = "translate3d(0,0,0)";
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.width = "0%";
      }
      return;
    }

    const apply = (next: number) => {
      translateRef.current = next;
      const ratio = m.overflow > 0 ? next / m.overflow : 0;

      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0,${-next}px,0)`;
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.round(ratio * 100)}%`;
      }
      if (topFadeRef.current) {
        topFadeRef.current.style.opacity = ratio > 0.015 ? "1" : "0";
      }
      if (bottomFadeRef.current) {
        bottomFadeRef.current.style.opacity = ratio < 0.985 ? "1" : "0";
      }
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const scene = sceneRef.current;
        if (!scene) return;
        const top = scene.getBoundingClientRect().top;
        apply(Math.min(Math.max(m.topPx - top, 0), m.overflow));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pin, m.topPx, m.overflow]);

  const chrome = (
    <div className="flex items-center gap-3 border-b border-line bg-paper-2/70 px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="mx-auto flex max-w-xs flex-1 items-center justify-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1">
        <span className="size-2.5 rounded-full bg-data-revenue/80" />
        <span className="truncate font-mono text-[11px] text-ink-muted">
          {title}
        </span>
      </div>
      <span className="hidden w-12 sm:block" />
    </div>
  );

  const windowEl = (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-navy-900/20 ring-1 ring-black/5">
      <div ref={headRef}>
        {chrome}
        {toolbar}
        {pin ? (
          <div className="h-0.5 w-full bg-line/50">
            <div
              ref={progressBarRef}
              className="h-full bg-data-revenue"
              style={{ width: "0%" }}
            />
          </div>
        ) : null}
      </div>

      <div
        className="relative overflow-hidden bg-background"
        style={pin ? { height: m.bodyH } : undefined}
      >
        <div
          ref={contentRef}
          className={pin ? "will-change-transform" : undefined}
        >
          {children}
        </div>

        <div
          ref={topFadeRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background to-transparent"
          style={{ opacity: 0 }}
        />
        <div
          ref={bottomFadeRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 flex h-14 items-end justify-center bg-gradient-to-t from-background to-transparent pb-2"
          style={{ opacity: 1 }}
        >
          <span className="flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-3 py-1 text-[10px] font-bold tracking-widest text-ink-muted/70 uppercase shadow-sm">
            Scroll to explore
          </span>
        </div>
      </div>
    </div>
  );

  if (!pin) return windowEl;

  return (
    <div ref={sceneRef} className="relative" style={{ height: m.sceneH }}>
      <div className="sticky" style={{ top: m.topPx }}>
        {windowEl}
      </div>
    </div>
  );
}
