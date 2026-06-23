"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INTEGRATIONS } from "@/lib/site";
import {
  BrandLogo,
  PageContainer,
  SectionHeader,
} from "@/components/revamp/section-ui";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Connect your accounts",
    copy: "Log into Gingr, When I Work, and QuickBooks once. We ask for read-only access — so we can see your numbers but never change a thing.",
    visual: "orbit" as const,
  },
  {
    title: "Tell us how you're set up",
    copy: "Match your locations, services, and pay rates one time. After that, KennelEyes knows your business and which numbers matter to you.",
    visual: "grid" as const,
  },
  {
    title: "Watch every location live",
    copy: "Open one screen. Revenue, payroll, and occupancy update on their own — across every site you run, all day long.",
    visual: "pulse" as const,
  },
];

const NODE_ACTIVE = {
  backgroundColor: "var(--trail-cyan)",
  borderColor: "var(--trail-cyan)",
  color: "#ffffff",
  scale: 1.12,
  boxShadow: "0 0 0 6px color-mix(in srgb, var(--trail-cyan) 16%, transparent)",
};

const NODE_INACTIVE = {
  backgroundColor: "var(--trail-bg)",
  borderColor: "var(--trail-border-strong)",
  color: "var(--trail-ink-muted)",
  scale: 1,
  boxShadow: "0 0 0 0px rgba(0,0,0,0)",
};

export function StickySplitSteps() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railFillRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
      const titles = titleRefs.current.filter(Boolean) as HTMLParagraphElement[];
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      const rail = railFillRef.current;
      const count = panels.length;

      const setBase = () => {
        gsap.set(nodes, { ...NODE_INACTIVE });
        gsap.set(nodes[0], { ...NODE_ACTIVE });
        gsap.set(titles, { color: "var(--trail-ink-muted)" });
        gsap.set(titles[0], { color: "var(--trail-ink)" });
      };

      // Fill % that lands the rail's leading edge exactly on node `i`'s center.
      const fillFor = (i: number) => (count > 1 ? (i / (count - 1)) * 100 : 100);

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          setBase();
          gsap.set(panels, {
            opacity: 0,
            rotateY: 10,
            scale: 0.94,
            yPercent: 4,
            pointerEvents: "none",
          });
          gsap.set(panels[0], {
            opacity: 1,
            rotateY: 0,
            scale: 1,
            yPercent: 0,
            pointerEvents: "auto",
          });
          gsap.set(rail, { "--how-fill": fillFor(0) });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinRef.current,
              start: "top top",
              end: "+=300%",
              pin: true,
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
          });

          const segment = 1 / count;

          for (let i = 1; i < count; i++) {
            const t = i * segment;

            // Rail advances to node `i` exactly as it activates.
            tl.to(
              rail,
              {
                "--how-fill": fillFor(i),
                duration: segment * 0.5,
                ease: "power1.inOut",
              },
              t,
            );

            nodes.forEach((node, j) => {
              tl.to(
                node,
                {
                  ...(j === i ? NODE_ACTIVE : NODE_INACTIVE),
                  duration: segment * 0.5,
                  ease: "power1.inOut",
                },
                t,
              );
            });

            titles.forEach((title, j) => {
              tl.to(
                title,
                {
                  color:
                    j === i ? "var(--trail-ink)" : "var(--trail-ink-muted)",
                  duration: segment * 0.5,
                  ease: "none",
                },
                t,
              );
            });

            tl.to(
              panels[i - 1],
              {
                opacity: 0,
                rotateY: -10,
                scale: 0.96,
                yPercent: -4,
                pointerEvents: "none",
                duration: segment * 0.42,
                ease: "power1.in",
              },
              t,
            ).fromTo(
              panels[i],
              { opacity: 0, rotateY: 10, scale: 0.94, yPercent: 4 },
              {
                opacity: 1,
                rotateY: 0,
                scale: 1,
                yPercent: 0,
                pointerEvents: "auto",
                duration: segment * 0.5,
                ease: "power2.out",
              },
              t + segment * 0.12,
            );
          }
        },

        "(max-width: 1023px)": () => {
          // Mobile: the top stepper is hidden; each panel is a complete step
          // (number, title, visual, copy) that reveals in sequence as you read.
          gsap.set(panels, {
            opacity: 1,
            rotateY: 0,
            scale: 1,
            yPercent: 0,
            pointerEvents: "auto",
          });

          panels.forEach((panel) => {
            gsap.fromTo(
              panel,
              { opacity: 0.35, y: 28 },
              {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                  trigger: panel,
                  start: "top 86%",
                  end: "top 56%",
                  scrub: 1,
                },
              },
            );
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
      id="how"
      ref={pinRef}
      className="trail-section relative overflow-hidden lg:h-screen"
    >
      <PageContainer className="py-[calc(var(--header-h)+1rem)] lg:grid lg:h-full lg:items-center lg:gap-16 lg:py-[calc(var(--header-h)+1rem)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:self-start">
          <SectionHeader
            eyebrow="How it works"
            title="Live numbers by this afternoon"
            description="No data team, no spreadsheets, no IT project. Three steps and you're watching real numbers from every location."
          />

          <div className="how-stepper mt-9 hidden sm:mt-11 lg:block">
            <span aria-hidden className="how-rail" />
            <span ref={railFillRef} aria-hidden className="how-rail-fill" />
            <ol className="flex flex-col gap-7">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="grid grid-cols-[2.75rem_1fr] items-start gap-4"
                >
                  <div
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    className="how-node"
                  >
                    0{i + 1}
                  </div>
                  <div className="pt-1.5">
                    <p
                      ref={(el) => {
                        titleRefs.current[i] = el;
                      }}
                      className="heading-card"
                    >
                      {step.title}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="how-stage relative mt-12 lg:mt-0 lg:h-[min(460px,60vh)]">
          <div aria-hidden className="how-stage-glow hidden lg:block" />
          <div aria-hidden className="how-stage-shadow hidden lg:block" />
          <div
            className="how-stage-frame relative z-10 space-y-8 lg:space-y-0"
            style={{ perspective: "1400px" }}
          >
            {steps.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="how-panel flex min-h-[300px] flex-col items-center justify-center p-6 will-change-transform sm:min-h-[340px] sm:p-8 lg:min-h-0"
              >
                <div className="mb-6 w-full text-center lg:hidden">
                  <span className="font-mono text-xs font-medium text-trail-orange">
                    0{i + 1}
                  </span>
                  <p className="heading-card mt-1 text-trail-ink">
                    {step.title}
                  </p>
                </div>
                {step.visual === "orbit" && (
                  <div className="relative size-52 sm:size-60">
                    <div className="how-orbit-ring absolute inset-0 animate-[spin_44s_linear_infinite] rounded-full border border-dashed border-trail-cyan/35" />
                    <div className="how-orbit-ring absolute inset-[14%] animate-[spin_30s_linear_infinite_reverse] rounded-full border border-trail-border/60" />
                    <div className="absolute left-1/2 top-1/2 flex size-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-trail-cyan/45 bg-trail-surface-strong text-center shadow-[0_8px_30px_-8px_rgba(14,116,144,0.55)]">
                      <Image
                        src="/logo/logo_eye.png"
                        alt="KennelEyes"
                        width={52}
                        height={29}
                        className="h-6 w-auto px-1 sm:h-7"
                      />
                    </div>
                    {INTEGRATIONS.map((name, j) => {
                      const a = (j / 3) * Math.PI * 2 - Math.PI / 2;
                      return (
                        <div
                          key={name}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{
                            left: `${50 + Math.cos(a) * 40}%`,
                            top: `${50 + Math.sin(a) * 40}%`,
                          }}
                        >
                          <BrandLogo
                            name={name}
                            size={44}
                            className="shadow-[0_6px_20px_-8px_rgba(31,27,22,0.35)] ring-1 ring-trail-cyan/25"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
                {step.visual === "grid" && (
                  <div className="grid w-full max-w-xs grid-cols-2 gap-3">
                    {[
                      { loc: "Northgate", on: false },
                      { loc: "Harbor", on: true },
                      { loc: "Cedar", on: false },
                      { loc: "All sites", on: true },
                    ].map(({ loc, on }) => (
                      <div
                        key={loc}
                        className={`flex items-center justify-between gap-2 rounded-xl border px-3.5 py-3 text-left text-sm font-semibold shadow-[var(--trail-card-shadow)] sm:px-4 ${
                          on
                            ? "border-trail-cyan/45 bg-[color-mix(in_srgb,var(--trail-cyan)_8%,transparent)] text-trail-ink"
                            : "border-trail-border bg-trail-surface text-trail-muted"
                        }`}
                      >
                        <span className="truncate">{loc}</span>
                        <span
                          className={`size-2 shrink-0 rounded-full ${
                            on ? "bg-trail-cyan" : "bg-trail-border-strong"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {step.visual === "pulse" && (
                  <div className="relative flex size-44 items-center justify-center sm:size-48">
                    <div className="how-pulse-ring absolute inset-0 rounded-full border border-trail-orange/30" />
                    <div className="how-pulse-ring absolute inset-[12%] rounded-full border border-trail-cyan/25" />
                    <div className="how-pulse-core absolute inset-[24%] animate-pulse rounded-full bg-trail-cyan/15" />
                    <div className="relative flex flex-col items-center">
                      <span className="font-display text-2xl font-extrabold text-trail-cyan sm:text-3xl">
                        LIVE
                      </span>
                      <span className="font-mono mt-1 text-[0.625rem] text-trail-muted">
                        updating now
                      </span>
                    </div>
                  </div>
                )}
                <p className="mt-6 max-w-sm px-2 text-center text-[0.9375rem] leading-relaxed text-trail-muted">
                  {step.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
