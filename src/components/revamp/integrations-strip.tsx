"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandLogo, PageContainer } from "@/components/revamp/section-ui";

gsap.registerPlugin(ScrollTrigger);

const integrations = [
  {
    name: "Gingr",
    role: "Bookings & revenue",
    start: { x: -240, y: -160, rot: -14 },
    dock: { x: -150, y: -118 },
    line: "M 0,0 C -70,-45 -120,-95 -150,-118",
  },
  {
    name: "When I Work",
    role: "Labor & shifts",
    start: { x: 240, y: -150, rot: 12 },
    dock: { x: 150, y: -118 },
    line: "M 0,0 C 70,-45 120,-95 150,-118",
  },
  {
    name: "QuickBooks",
    role: "Profit & loss",
    sub: "Online",
    start: { x: 30, y: 210, rot: -6 },
    dock: { x: 0, y: 120 },
    line: "M 0,0 C 10,60 5,95 0,120",
  },
];

/** Solid white panel so connector lines never bleed through on light sand. */
const PANEL_BG = "var(--trail-surface-strong)";
const PANEL_SHADOW = "var(--trail-card-shadow)";

function IntegrationCard({
  item,
  className = "",
}: {
  item: (typeof integrations)[number];
  className?: string;
}) {
  return (
    <div
      style={{ background: PANEL_BG, boxShadow: PANEL_SHADOW }}
      className={`flex items-center gap-3 rounded-2xl border border-trail-border px-3.5 py-3 ${className}`}
    >
      <BrandLogo name={item.name} size={36} />
      <div className="min-w-0 text-left">
        <span className="font-display block truncate text-sm font-bold text-trail-ink">
          {item.name}
        </span>
        {item.sub ? (
          <span className="eyebrow block !text-[0.5rem] text-trail-faint">
            {item.sub}
          </span>
        ) : null}
        <span className="block truncate text-[0.6875rem] text-trail-muted">
          {item.role}
        </span>
      </div>
    </div>
  );
}

export function IntegrationsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);
  const pulseRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileHubRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const packetsRef = useRef<SVGGElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const lines = lineRefs.current.filter(Boolean) as SVGPathElement[];
      const mobileCards = mobileCardRefs.current.filter(Boolean) as HTMLDivElement[];

      lines.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          cards.forEach((card, i) => {
            const start = integrations[i].start;
            gsap.set(card, {
              x: start.x,
              y: start.y,
              rotation: start.rot,
              opacity: 0.65,
              scale: 0.92,
            });
          });

          gsap.set(hubRef.current, { scale: 0.88, opacity: 0.5 });
          gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });
          gsap.set(pulseRef.current, { scale: 0.6, opacity: 0 });
          gsap.set(packetsRef.current, { opacity: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=200%",
              pin: true,
              scrub: 1.3,
              invalidateOnRefresh: true,
            },
          });

          // Backdrop drifts for depth while the stack assembles.
          tl.fromTo(
            bgRef.current,
            { yPercent: 4 },
            { yPercent: -4, ease: "none", duration: 1 },
            0,
          );

          cards.forEach((card, i) => {
            const dock = integrations[i].dock;
            tl.to(
              card,
              {
                x: dock.x,
                y: dock.y,
                rotation: 0,
                opacity: 1,
                scale: 1,
                ease: "none",
                duration: 0.45,
              },
              i * 0.06,
            );
          });

          lines.forEach((path, i) => {
            tl.to(
              path,
              { strokeDashoffset: 0, ease: "none", duration: 0.35 },
              0.25 + i * 0.08,
            );
          });

          tl.to(
            hubRef.current,
            { scale: 1, opacity: 1, ease: "none", duration: 0.3 },
            0.35,
          )
            .to(
              glowRef.current,
              { opacity: 1, scale: 1.15, ease: "none", duration: 0.35 },
              0.55,
            )
            .to(
              pulseRef.current,
              { scale: 1.4, opacity: 0.35, ease: "none", duration: 0.25 },
              0.65,
            )
            // Data starts streaming into the hub once it's connected.
            .to(
              packetsRef.current,
              { opacity: 1, ease: "none", duration: 0.3 },
              0.7,
            );
        },

        "(max-width: 1023px)": () => {
          mobileCards.forEach((card, i) => {
            gsap.fromTo(
              card,
              { x: i % 2 === 0 ? -36 : 36, opacity: 0, scale: 0.92 },
              {
                x: 0,
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                  trigger: card,
                  start: "top 92%",
                  end: "top 72%",
                  scrub: 1,
                },
              },
            );
          });

          gsap.fromTo(
            mobileHubRef.current,
            { scale: 0.88, opacity: 0.35 },
            {
              scale: 1,
              opacity: 1,
              scrollTrigger: {
                trigger: mobileHubRef.current,
                start: "top 92%",
                end: "top 68%",
                scrub: 1,
              },
            },
          );
        },
      });
    }, sectionRef);

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
      id="integrations"
      ref={sectionRef}
      className="relative scroll-mt-[var(--header-h)] overflow-hidden border-y border-trail-border bg-trail-bg-deep"
    >
      <div className="section-wash-orange pointer-events-none absolute inset-0 z-0 opacity-50" />

      {/* Live data-flow backdrop */}
      <div
        ref={bgRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
      >
        <div className="stack-grid absolute inset-0" />
        <div className="absolute -left-24 top-[-12%] size-[420px] rounded-full bg-trail-orange/10 blur-3xl" />
        <div className="absolute -right-20 bottom-[-14%] size-[460px] rounded-full bg-trail-cyan/10 blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 600"
          aria-hidden
        >
          <g stroke="rgba(14,116,144,0.45)">
            <path
              className="stack-stream"
              vectorEffect="non-scaling-stroke"
              style={{ animationDuration: "5s" }}
              d="M-50,120 C300,70 620,170 1250,120"
            />
            <path
              className="stack-stream"
              vectorEffect="non-scaling-stroke"
              style={{ animationDuration: "6.5s" }}
              d="M-50,300 C380,250 780,350 1250,300"
            />
            <path
              className="stack-stream"
              vectorEffect="non-scaling-stroke"
              style={{ animationDuration: "5.8s" }}
              d="M-50,470 C340,520 700,420 1250,480"
            />
          </g>
          <g stroke="rgba(234,88,12,0.35)">
            <path
              className="stack-stream"
              vectorEffect="non-scaling-stroke"
              style={{ animationDuration: "7.4s", animationDirection: "reverse" }}
              d="M-50,210 C420,180 820,250 1250,205"
            />
            <path
              className="stack-stream"
              vectorEffect="non-scaling-stroke"
              style={{ animationDuration: "6.8s", animationDirection: "reverse" }}
              d="M-50,390 C360,430 760,360 1250,400"
            />
          </g>
        </svg>
      </div>

      <PageContainer className="relative grid items-center gap-10 py-12 lg:min-h-screen lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:py-0">
        <div ref={copyRef} className="relative z-10 text-center lg:py-16 lg:text-left xl:py-20">
          <p className="eyebrow text-trail-orange">Your existing stack</p>
          <h2 className="display-md mt-3 text-trail-ink">
            Plugs into what you already run — nothing to rip out
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-trail-muted sm:text-base lg:mx-0">
            KennelEyes reads Gingr, When I Work, and QuickBooks with read-only
            access. Scroll — watch your tools connect to one live dashboard.
          </p>
          <p className="mt-4 hidden text-xs text-trail-faint lg:block">
            Read-only · nothing to migrate · your POS stays put
          </p>
        </div>

        {/* Mobile: vertical plug-in list */}
        <div className="relative z-10 space-y-3 lg:hidden">
          {integrations.map((item, i) => (
            <div
              key={item.name}
              ref={(el) => {
                mobileCardRefs.current[i] = el;
              }}
              className="will-change-transform"
            >
              <IntegrationCard item={item} />
            </div>
          ))}
          <div className="flex items-center justify-center py-1 text-trail-cyan" aria-hidden>
            ↓
          </div>
          <div ref={mobileHubRef} className="will-change-transform">
            <div
              style={{ background: PANEL_BG, boxShadow: PANEL_SHADOW }}
              className="rounded-2xl border border-trail-cyan/40 px-6 py-5 text-center"
            >
              <Image
                src="/logo/logo_eye.png"
                alt=""
                width={48}
                height={27}
                className="mx-auto mb-1.5 h-6 w-auto"
              />
              <span className="font-display text-lg font-bold text-trail-cyan">
                KennelEyes
              </span>
              <span className="mt-1.5 block text-xs text-trail-muted">
                One live dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Desktop: orbital hub */}
        <div className="relative mx-auto hidden w-full max-w-md items-center justify-center lg:flex lg:max-w-none lg:min-h-[520px]">
          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2"
            viewBox="-170 -170 340 340"
            aria-hidden
            style={{ filter: "drop-shadow(0 0 4px rgba(14,116,144,0.35))" }}
          >
            <defs>
              <linearGradient id="lineFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(14,116,144,0.95)" />
                <stop offset="100%" stopColor="rgba(14,116,144,0.5)" />
              </linearGradient>
            </defs>
            {integrations.map((item, i) => (
              <path
                key={item.name}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                d={item.line}
                fill="none"
                stroke="url(#lineFade)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
            {/* Live data packets flowing from each tool into the hub */}
            <g
              ref={packetsRef}
              className="hub-packets"
              style={{
                opacity: 0,
                filter: "drop-shadow(0 0 3px rgba(14,116,144,0.55))",
              }}
            >
              {integrations.map((item) => (
                <g key={`${item.name}-packet`}>
                  <circle r="3.4" fill="rgb(14,116,144)">
                    <animateMotion
                      dur="2.4s"
                      repeatCount="indefinite"
                      calcMode="linear"
                      keyPoints="1;0"
                      keyTimes="0;1"
                      path={item.line}
                    />
                  </circle>
                  <circle r="2.4" fill="rgb(234,88,12)">
                    <animateMotion
                      dur="2.4s"
                      begin="1.2s"
                      repeatCount="indefinite"
                      calcMode="linear"
                      keyPoints="1;0"
                      keyTimes="0;1"
                      path={item.line}
                    />
                  </circle>
                </g>
              ))}
            </g>
          </svg>

          <div
            ref={glowRef}
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-trail-cyan/15 blur-3xl"
            aria-hidden
          />

          {integrations.map((item, i) => (
            <div
              key={item.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="integration-card absolute left-1/2 top-1/2 z-20 w-[11.5rem] -translate-x-1/2 -translate-y-1/2 will-change-transform"
            >
              <IntegrationCard item={item} />
            </div>
          ))}

          <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <div
              ref={pulseRef}
              className="pointer-events-none absolute inset-0 -m-4 rounded-3xl border border-trail-cyan/30"
              aria-hidden
            />
            <div
              ref={hubRef}
              style={{ background: PANEL_BG, boxShadow: PANEL_SHADOW }}
              className="relative rounded-2xl border border-trail-cyan/40 px-8 py-6 text-center"
            >
              <Image
                src="/logo/logo_eye.png"
                alt=""
                width={52}
                height={29}
                className="mx-auto mb-2 h-7 w-auto"
              />
              <span className="font-display text-xl font-bold text-trail-cyan">
                KennelEyes
              </span>
              <span className="mt-1.5 block text-sm text-trail-muted">
                One live dashboard
              </span>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-trail-cyan/30 bg-trail-cyan/10 px-2.5 py-0.5 text-[0.625rem] font-bold tracking-wider text-trail-cyan uppercase">
                <span className="size-1.5 animate-pulse rounded-full bg-trail-cyan" />
                Live
              </span>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
