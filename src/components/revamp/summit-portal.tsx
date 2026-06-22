"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageContainer } from "@/components/revamp/section-ui";
import { SummitMountain } from "@/components/revamp/trail-art";
import { refreshScrollTriggers } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export function SummitPortal() {
  const pinRef = useRef<HTMLDivElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const onMountainReady = useCallback(() => {
    refreshScrollTriggers();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !pinRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [tunnelRef.current, mountainRef.current, portalRef.current],
        { force3D: true },
      );

      const buildTimeline = (end: string) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end,
            pin: true,
            scrub: 1.4,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          tunnelRef.current,
          { rotateX: 10, scale: 1.12, transformPerspective: 900 },
          { rotateX: 0, scale: 1, ease: "none", duration: 0.6 },
          0,
        )
          .fromTo(
            mountainRef.current,
            { yPercent: 28, scale: 1.25, opacity: 0.12 },
            { yPercent: 0, scale: 1, opacity: 1, ease: "none", duration: 0.6 },
            0,
          )
          .fromTo(
            copyRef.current,
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, ease: "power1.out", duration: 0.3 },
            0.14,
          )
          .fromTo(
            portalRef.current,
            { clipPath: "circle(0% at 50% 58%)", opacity: 0 },
            {
              clipPath: "circle(145% at 50% 58%)",
              opacity: 1,
              ease: "none",
              duration: 0.38,
            },
            0.62,
          );
      };

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => buildTimeline("+=220%"),
        "(max-width: 767px)": () => buildTimeline("+=140%"),
      });
    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="summit"
      ref={pinRef}
      className="relative min-h-[min(100svh,680px)] overflow-hidden bg-trail-bg-deep text-trail-ink md:min-h-screen"
      style={{ perspective: "900px" }}
    >
      <div
        ref={tunnelRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={mountainRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center will-change-transform"
        >
          <SummitMountain onReady={onMountainReady} />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 36%, rgba(3,7,18,0.92), rgba(3,7,18,0.6) 50%, transparent 78%)",
        }}
      />

      <PageContainer className="relative z-30 pt-[calc(var(--header-h)+1rem)]">
        <div
          ref={copyRef}
          className="mx-auto max-w-2xl text-center will-change-transform [text-shadow:0_2px_18px_rgba(3,7,18,0.85)]"
        >
          <p className="eyebrow text-trail-cream">Mission Control</p>
          <h2 className="display-lg mt-4">
            This is the screen you&apos;d open{" "}
            <span className="text-trail-cyan">every morning</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-trail-cream/85 sm:text-lg">
            Revenue by service line, payroll as a % of revenue, occupancy by
            site, and QuickBooks P&L — one dashboard, every location, live.
          </p>
        </div>
      </PageContainer>

      <div
        ref={portalRef}
        className="pointer-events-none absolute inset-0 z-40 will-change-[clip-path,opacity]"
        style={{
          background:
            "linear-gradient(180deg, var(--trail-portal-from), var(--trail-portal-mid) 40%, var(--trail-portal-to))",
          clipPath: "circle(0% at 50% 58%)",
        }}
      />
    </div>
  );
}
