"use client";

import { useEffect, useRef } from "react";
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

const ACTIVE = {
  borderColor: "rgba(34, 211, 238, 0.45)",
  backgroundColor: "rgba(245, 240, 230, 0.08)",
};

const INACTIVE = {
  borderColor: "rgba(245, 240, 230, 0.12)",
  backgroundColor: "rgba(245, 240, 230, 0)",
};

export function StickySplitSteps() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const stepEls = stepRefs.current.filter(Boolean) as HTMLLIElement[];
      const titles = titleRefs.current.filter(Boolean) as HTMLParagraphElement[];
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      const copies = copyRefs.current.filter(Boolean) as HTMLParagraphElement[];

      gsap.set(stepEls, { ...INACTIVE });
      gsap.set(stepEls[0], { ...ACTIVE });
      gsap.set(titles, { color: "var(--trail-ink-muted)" });
      gsap.set(titles[0], { color: "var(--trail-ink)" });

      gsap.set(panels, { opacity: 0, y: 28, scale: 0.96, pointerEvents: "none" });
      gsap.set(panels[0], { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" });
      gsap.set(copies, { opacity: 0, y: 12 });
      gsap.set(copies[0], { opacity: 1, y: 0 });

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinRef.current,
              start: "top top",
              end: "+=300%",
              pin: true,
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          const segment = 1 / stepEls.length;

          stepEls.forEach((_, i) => {
            if (i === 0) return;

            const t = i * segment;

            stepEls.forEach((step, j) => {
              tl.to(
                step,
                {
                  ...(j === i ? ACTIVE : INACTIVE),
                  duration: segment * 0.35,
                  ease: "none",
                },
                t,
              );
            });

            titles.forEach((title, j) => {
              tl.to(
                title,
                {
                  color: j === i ? "var(--trail-ink)" : "var(--trail-ink-muted)",
                  duration: segment * 0.35,
                  ease: "none",
                },
                t,
              );
            });

            tl.to(
              panels[i - 1],
              {
                opacity: 0,
                y: -24,
                scale: 0.96,
                pointerEvents: "none",
                duration: segment * 0.4,
                ease: "none",
              },
              t,
            )
              .to(
                copies[i - 1],
                { opacity: 0, y: -8, duration: segment * 0.3, ease: "none" },
                t,
              )
              .to(
                panels[i],
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  pointerEvents: "auto",
                  duration: segment * 0.4,
                  ease: "none",
                },
                t + segment * 0.08,
              )
              .to(
                copies[i],
                { opacity: 1, y: 0, duration: segment * 0.35, ease: "none" },
                t + segment * 0.12,
              );
          });
        },

        "(max-width: 1023px)": () => {
          gsap.set(panels, { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" });
          gsap.set(copies, { opacity: 1, y: 0 });

          function highlightMobile(active: number) {
            stepEls.forEach((step, j) => {
              gsap.to(step, {
                ...(j === active ? ACTIVE : INACTIVE),
                duration: 0.35,
                overwrite: "auto",
              });
              gsap.to(titles[j], {
                color: j === active ? "var(--trail-ink)" : "var(--trail-ink-muted)",
                duration: 0.35,
                overwrite: "auto",
              });
            });
          }

          stepEls.forEach((step, i) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 72%",
              end: "bottom 28%",
              onEnter: () => highlightMobile(i),
              onEnterBack: () => highlightMobile(i),
            });
          });

          panels.forEach((panel) => {
            gsap.fromTo(
              panel,
              { opacity: 0.4, y: 20 },
              {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                  trigger: panel,
                  start: "top 88%",
                  end: "top 58%",
                  scrub: 1,
                },
              },
            );
          });
        },
      });
    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how" ref={pinRef} className="trail-section relative overflow-hidden lg:h-screen">
      <PageContainer className="py-[calc(var(--header-h)+1rem)] lg:grid lg:h-full lg:items-center lg:gap-14 lg:py-[calc(var(--header-h)+1rem)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:self-start">
          <SectionHeader
            eyebrow="How it works"
            title="Live numbers by this afternoon"
            description="No data team, no spreadsheets, no IT project. Three steps and you're watching real numbers from every location."
          />

          <ol className="mt-8 space-y-3 sm:mt-10">
            {steps.map((step, i) => (
              <li
                key={step.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="how-step rounded-2xl border px-4 py-3.5 sm:px-5 sm:py-4"
                style={
                  i === 0
                    ? {
                        borderColor: ACTIVE.borderColor,
                        backgroundColor: ACTIVE.backgroundColor,
                      }
                    : undefined
                }
              >
                <span className="font-mono text-[0.6875rem] text-trail-orange">
                  0{i + 1}
                </span>
                <p
                  ref={(el) => {
                    titleRefs.current[i] = el;
                  }}
                  className="mt-1 font-semibold"
                  style={{
                    color: i === 0 ? "var(--trail-ink)" : "var(--trail-ink-muted)",
                  }}
                >
                  {step.title}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mt-10 lg:mt-0">
          <div className="space-y-8 lg:relative lg:h-[min(400px,52vh)] lg:space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="how-panel trail-card flex min-h-[280px] flex-col items-center justify-center rounded-3xl p-6 sm:min-h-[320px] sm:p-8 lg:absolute lg:inset-0 lg:min-h-0"
              >
                {step.visual === "orbit" && (
                  <div className="relative size-48 sm:size-56">
                    <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-trail-cyan/30" />
                    <div className="absolute inset-[16%] rounded-full border border-trail-border/50" />
                    <div className="absolute left-1/2 top-1/2 flex size-[36%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-trail-cyan/40 bg-trail-surface-strong text-center shadow-[0_0_30px_-8px_rgba(34,211,238,0.5)]">
                      <span className="font-display text-[0.625rem] font-bold leading-tight text-trail-cyan sm:text-[0.6875rem]">
                        Kennel<br />Eyes
                      </span>
                    </div>
                    {INTEGRATIONS.map((name, j) => {
                      const a = (j / 3) * Math.PI * 2 - Math.PI / 2;
                      return (
                        <div
                          key={name}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{
                            left: `${50 + Math.cos(a) * 38}%`,
                            top: `${50 + Math.sin(a) * 38}%`,
                          }}
                        >
                          <BrandLogo
                            name={name}
                            size={40}
                            className="ring-1 ring-trail-cyan/25"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
                {step.visual === "grid" && (
                  <div className="grid w-full max-w-xs grid-cols-2 gap-2.5 sm:gap-3">
                    {["Northgate", "Harbor", "Cedar", "All sites"].map((loc) => (
                      <span
                        key={loc}
                        className="rounded-xl border border-trail-border px-3 py-2.5 text-center text-xs font-semibold sm:px-4 sm:py-3 sm:text-sm"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                )}
                {step.visual === "pulse" && (
                  <div className="relative flex size-32 items-center justify-center rounded-full border border-trail-orange/35 sm:size-40">
                    <div className="absolute inset-5 rounded-full bg-trail-cyan/15 animate-pulse" />
                    <span className="font-display text-2xl font-bold text-trail-cyan">
                      LIVE
                    </span>
                  </div>
                )}
                <p
                  ref={(el) => {
                    copyRefs.current[i] = el;
                  }}
                  className="mt-5 max-w-sm px-2 text-center text-sm leading-relaxed text-trail-muted"
                >
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
