"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { PageContainer } from "@/components/revamp/section-ui";

gsap.registerPlugin(ScrollTrigger);

const revenueBars = [42, 55, 48, 63, 58, 71, 67, 82, 76, 90, 84, 96];

const dashboardRows = [
  { label: "Boarding", value: "$21,480", trend: "+8.2%", up: true },
  { label: "Daycare", value: "$14,260", trend: "+4.7%", up: true },
  { label: "Grooming", value: "$8,940", trend: "−1.3%", up: false },
];

const stats = [
  {
    value: "−4.1%",
    label: "Payroll-to-revenue efficiency",
    sub: "Realized in the first 30 days",
  },
  {
    value: "<10 min",
    label: "Setup time",
    sub: "Connect and see live numbers",
  },
  {
    value: "1 screen",
    label: "Every location",
    sub: "Instead of five separate logins",
  },
];

export function HeroZoom() {
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !pinRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [line1Ref.current, line2Ref.current, headlineRef.current, runnerRef.current],
        { force3D: true },
      );

      const buildTimeline = (end: string) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        tl.to(line1Ref.current, {
          xPercent: -30,
          rotation: -8,
          opacity: 0,
          ease: "none",
        })
          .to(
            line2Ref.current,
            { xPercent: 25, rotation: 6, opacity: 0, ease: "none" },
            0,
          )
          .to(
            headlineRef.current,
            { scale: 1.2, opacity: 0, ease: "none" },
            0.08,
          )
          .to(subRef.current, { y: 24, opacity: 0, ease: "none" }, 0.05)
          .to(contentRef.current, { opacity: 0, y: -20, ease: "none" }, 0.1)
          .to(
            runnerRef.current,
            { scale: 1.15, y: "-8vh", x: "4vw", ease: "none" },
            0,
          )
          .to(vignetteRef.current, { opacity: 1, ease: "none" }, 0.3);
      };

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => buildTimeline("+=160%"),

        // Mobile: don't pin. A pinned hero traps the dashboard card + stats
        // below the fold. Let the page flow and gently reveal the card instead.
        "(max-width: 767px)": () => {
          gsap.fromTo(
            runnerRef.current,
            { y: 36, opacity: 0.65, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: runnerRef.current,
                start: "top 92%",
                end: "top 58%",
                scrub: 1,
              },
            },
          );
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
    <div ref={pinRef} className="trail-section relative min-h-screen overflow-hidden">
      <div className="section-wash-orange absolute inset-0 z-0 halftone opacity-80" />

      <div
        ref={vignetteRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(circle at 65% 50%, color-mix(in oklab, var(--trail-cyan) 28%, transparent), transparent 55%), radial-gradient(circle at center, transparent 30%, var(--trail-bg) 78%)",
        }}
      />

      <PageContainer className="relative z-10 grid min-h-screen items-center gap-10 pb-16 pt-[calc(var(--header-h)+1.5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20">
        <div ref={contentRef}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow rounded-full border border-trail-border bg-trail-surface/50 px-3 py-1 text-trail-cyan">
              Operations intelligence
            </span>
            <span className="h-px w-10 bg-trail-border" />
            <span className="eyebrow text-trail-muted">For multi-location owners</span>
          </div>

          <h1 ref={headlineRef} className="display-xl mt-5 text-trail-ink will-change-transform">
            <span ref={line1Ref} className="block will-change-transform">
              Stop finding out about a bad week
            </span>
            <span ref={line2Ref} className="text-gradient-trail text-emph block will-change-transform">
              ten days too late
            </span>
          </h1>

          <p ref={subRef} className="lead mt-6 max-w-xl border-l-2 border-trail-border pl-5 text-trail-muted sm:pl-6">
            You run your locations on Gingr, When I Work, and QuickBooks — then
            stitch the real numbers together by hand.{" "}
            <span className="font-semibold text-trail-ink">KennelEyes</span> puts
            revenue, payroll, and profit for every site on one live screen, so
            you catch the money leaks while you can still stop them.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/demo" className="btn-trail-primary w-full sm:w-auto">
              Book a 30-min demo
            </Link>
            <Link href="#demo" className="btn-trail-secondary w-full sm:w-auto">
              See the live dashboard
            </Link>
          </div>
        </div>

        <div
          ref={runnerRef}
          className="relative mx-auto w-full max-w-[min(100%,420px)] will-change-transform lg:max-w-[440px] lg:justify-self-end xl:max-w-[480px]"
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-trail-orange/15 via-transparent to-trail-cyan/15 blur-3xl" />

          <div className="trail-card-strong relative z-10 rounded-3xl border border-trail-cyan/20 p-5 shadow-[0_30px_90px_-25px_rgba(34,211,238,0.4)] ring-1 ring-trail-cyan/10 backdrop-blur-md sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trail-green opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-trail-green" />
                </span>
                <span className="eyebrow !text-[0.5625rem] text-trail-muted">
                  Mission Control · Live
                </span>
              </div>
              <span className="eyebrow !text-[0.5rem] text-trail-faint">4 locations</span>
            </div>

            <div className="mt-5">
              <span className="eyebrow !text-[0.5rem] text-trail-faint">
                Revenue · this week
              </span>
              <div className="mt-1 flex items-end gap-2">
                <span className="font-display text-3xl font-extrabold tabular text-trail-ink sm:text-4xl">
                  $48,920
                </span>
                <span className="mb-1 text-xs font-semibold text-trail-green">
                  ▲ 6.4%
                </span>
              </div>
            </div>

            <div className="mt-5 flex h-24 items-end gap-1.5">
              {revenueBars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-trail-cyan/30 to-trail-cyan"
                  style={{ height: `${h}%`, opacity: 0.45 + (i / revenueBars.length) * 0.55 }}
                />
              ))}
            </div>

            <div className="mt-5 space-y-2.5 border-t border-trail-border pt-4">
              {dashboardRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-xs text-trail-muted">{row.label}</span>
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-sm font-bold tabular text-trail-ink">
                      {row.value}
                    </span>
                    <span
                      className={`w-12 text-right text-[0.6875rem] font-semibold tabular ${
                        row.up ? "text-trail-green" : "text-trail-orange"
                      }`}
                    >
                      {row.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="trail-card-strong rounded-2xl px-4 py-3 backdrop-blur-sm sm:py-3.5"
              >
                <span className="font-display block text-xl font-bold tabular text-trail-cyan sm:text-2xl">
                  {s.value}
                </span>
                <span className="eyebrow mt-1 block !text-[0.5625rem] text-trail-muted">
                  {s.label}
                </span>
                {s.sub ? (
                  <p className="mt-1 text-[0.6875rem] text-trail-faint">{s.sub}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </PageContainer>

      <a
        href="#demo"
        className="scroll-cue absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 transition-colors hover:text-trail-ink md:block lg:bottom-8"
      >
        <span className="eyebrow !text-[0.5625rem] !tracking-[0.28em]">
          See the live dashboard
        </span>
        <div className="scroll-cue-track">
          <div className="scroll-cue-dot" />
        </div>
      </a>
    </div>
  );
}
