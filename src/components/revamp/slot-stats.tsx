"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageContainer, SectionHeader } from "@/components/revamp/section-ui";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "−4.1%", label: "Lower payroll-to-revenue" },
  { value: "6.5 hrs", label: "Back in your week, every week" },
  { value: "<10 min", label: "From sign-up to live numbers" },
  { value: "40+", label: "Locations on one account" },
];

export function SlotStats() {
  const pinRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !pinRef.current || !reelRef.current) return;

    const ctx = gsap.context(() => {
      // Each reel item is exactly as tall as the window, so shifting the reel by
      // a percentage of its own height lands every value dead-center — at any
      // breakpoint, without fragile pixel measuring.
      const travelPct = -100 * ((stats.length - 1) / stats.length);

      const updateLabel = (idx: number) => {
        if (labelRef.current) labelRef.current.textContent = stats[idx].label;
        dotsRef.current.forEach((dot, i) => {
          if (dot) dot.style.opacity = i === idx ? "1" : "0.35";
        });
      };

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinRef.current,
              start: "top top",
              end: "+=220%",
              pin: true,
              scrub: 1.4,
              invalidateOnRefresh: true,
              onUpdate(self) {
                const idx = Math.min(
                  stats.length - 1,
                  Math.round(self.progress * (stats.length - 1)),
                );
                updateLabel(idx);
              },
            },
          });

          tl.to(reelRef.current, { yPercent: travelPct, ease: "none" });
        },

        "(max-width: 767px)": () => {
          gsap.to(reelRef.current, {
            yPercent: travelPct,
            ease: "none",
            scrollTrigger: {
              trigger: pinRef.current,
              start: "top 75%",
              end: "bottom 25%",
              scrub: 1.2,
              invalidateOnRefresh: true,
              onUpdate(self) {
                const idx = Math.min(
                  stats.length - 1,
                  Math.round(self.progress * (stats.length - 1)),
                );
                updateLabel(idx);
              },
            },
          });
        },
      });
    }, pinRef);

    return () => {
      ctx.revert();
      // ScrollTrigger.matchMedia pins aren't captured by the context, so revert
      // them explicitly — otherwise the pin-spacer wrapper leaks and React
      // throws removeChild when this section unmounts during navigation.
      ScrollTrigger.clearMatchMedia();
    };
  }, []);

  return (
    <section
      ref={pinRef}
      className="relative flex min-h-[min(100svh,720px)] flex-col items-center justify-center overflow-hidden bg-trail-bg-orbit py-16 text-trail-ink md:min-h-screen md:py-0"
    >
      <div className="section-wash-cyan absolute inset-0 z-0 opacity-60" />

      <PageContainer className="relative z-10 text-center">
        <SectionHeader
          align="center"
          eyebrow="Results"
          title="Numbers that matter to operators"
          description="Scroll to cycle through what early customers report after putting every location on one screen."
        />

        <div className="relative mx-auto mt-10 h-24 w-full max-w-[min(100%,20rem)] overflow-hidden rounded-2xl border border-trail-cyan/40 bg-trail-surface-strong shadow-[var(--trail-card-shadow)] sm:mt-12 sm:h-28 sm:max-w-sm">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-white/95 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t from-white/95 to-transparent" />
          <div ref={reelRef} className="will-change-transform">
            {stats.map((s) => (
              <div
                key={s.value}
                className="font-display flex h-24 items-center justify-center px-4 text-4xl font-extrabold tabular text-trail-cyan sm:h-28 sm:text-6xl"
              >
                {s.value}
              </div>
            ))}
          </div>
        </div>

        <p
          ref={labelRef}
          className="mx-auto mt-6 min-h-[2.75rem] max-w-md text-sm leading-relaxed text-trail-muted sm:text-base"
        >
          {stats[0].label}
        </p>

        <div className="mt-4 flex items-center justify-center gap-2">
          {stats.map((s, i) => (
            <span
              key={s.value}
              ref={(el) => {
                dotsRef.current[i] = el;
              }}
              className="size-1.5 rounded-full bg-trail-cyan transition-opacity duration-300"
              style={{ opacity: i === 0 ? 1 : 0.35 }}
              aria-hidden
            />
          ))}
        </div>

        <p className="mt-8 text-xs text-trail-faint">
          Illustrative figures shown for demonstration during early access.
        </p>
      </PageContainer>
    </section>
  );
}
