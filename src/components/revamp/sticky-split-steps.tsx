"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { SOFTWARE_STACK } from "@/lib/site";
import {
  PageContainer,
  SectionHeader,
  SoftwareBadge,
} from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";

const steps = [
  {
    title: "Connect your accounts",
    copy: "Connect your kennel software, scheduling software, and financial software once. We ask for read-only access — so we can see your numbers but never change a thing.",
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

const gridItems = [
  { loc: "Northgate", on: false },
  { loc: "Harbor", on: true },
  { loc: "Cedar", on: false },
  { loc: "All sites", on: true },
] as const;

function StepVisual({ visual }: { visual: (typeof steps)[number]["visual"] }) {
  if (visual === "orbit") {
    return (
      <div className="relative mx-auto size-52 sm:size-60">
        <div className="how-orbit-ring absolute inset-0 rounded-full border border-dashed border-trail-cyan/30" />
        <div className="how-orbit-ring absolute inset-[14%] rounded-full border border-dashed border-[color:var(--border-hairline-strong)]" />
        <div className="absolute left-1/2 top-1/2 flex size-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-trail-surface-strong shadow-[0_8px_30px_-8px_rgba(63,195,179,0.35)]">
          <Image
            src="/logo/logo_eye.png?v=2"
            alt="KennelEyes"
            width={52}
            height={29}
            className="h-6 w-auto px-1 sm:h-7"
          />
        </div>
        {SOFTWARE_STACK.map((item, j) => {
          const a = (j / SOFTWARE_STACK.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <div
              key={item.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${50 + Math.cos(a) * 40}%`,
                top: `${50 + Math.sin(a) * 40}%`,
              }}
            >
              <SoftwareBadge item={item} size={44} className="rounded-xl shadow-md" />
            </div>
          );
        })}
      </div>
    );
  }

  if (visual === "grid") {
    return (
      <div className="grid w-full max-w-xs grid-cols-2 gap-3">
        {gridItems.map(({ loc, on }) => (
          <div
            key={loc}
            className={`how-grid-tile flex items-center justify-between gap-2 rounded-xl px-3.5 py-3 text-left text-sm font-semibold sm:px-4 ${
              on ? "how-grid-tile-on" : "how-grid-tile-off"
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
    );
  }

  return (
    <div className="relative mx-auto flex size-44 items-center justify-center sm:size-48">
      <div className="how-pulse-ring absolute inset-0 rounded-full border border-[color:var(--border-hairline-strong)]" />
      <div className="how-pulse-ring absolute inset-[12%] rounded-full border border-trail-cyan/30" />
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
  );
}

function StepPanel({
  step,
  index,
  compact = false,
}: {
  step: (typeof steps)[number];
  index: number;
  compact?: boolean;
}) {
  return (
    <>
      {compact ? (
        <div className="mb-6 w-full text-center">
          <span className="font-mono text-xs font-medium text-trail-orange">
            0{index + 1}
          </span>
          <p className="heading-card mt-1 text-trail-ink">{step.title}</p>
        </div>
      ) : null}
      <StepVisual visual={step.visual} />
      <p className="mt-6 max-w-sm px-2 text-center text-[0.9375rem] leading-relaxed text-trail-muted">
        {step.copy}
      </p>
    </>
  );
}

export function StickySplitSteps() {
  const [active, setActive] = useState(0);
  const railFill = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 100;

  return (
    <section id="how" className="section-fill section-surface-warm relative overflow-hidden py-[var(--section-py)]">
      <PageContainer className="relative z-10 lg:grid lg:items-start lg:gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:self-start">
          <Reveal>
            <SectionHeader
              eyebrow="How it Works"
              title="Live numbers by this afternoon"
              description="No data team, no spreadsheets, no IT project. Three steps and you're watching real numbers from every location."
            />
          </Reveal>

          <Reveal delay={0.08} className="how-stepper mt-9 hidden lg:block">
            <span aria-hidden className="how-rail" />
            <span
              aria-hidden
              className="how-rail-fill"
              style={{ "--how-fill": railFill } as CSSProperties}
            />
            <ol className="flex flex-col gap-7">
              {steps.map((step, i) => {
                const isActive = i === active;
                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={isActive ? "step" : undefined}
                      className="grid w-full grid-cols-[2.75rem_1fr] items-start gap-4 text-left transition-opacity hover:opacity-90"
                    >
                      <div className={`how-node ${isActive ? "how-node-active" : ""}`}>
                        0{i + 1}
                      </div>
                      <div className="pt-1.5">
                        <p
                          className={`heading-card transition-colors ${
                            isActive ? "text-trail-ink" : "text-trail-muted"
                          }`}
                        >
                          {step.title}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative mt-12 lg:mt-0">
          {/* Mobile / tablet: stacked step cards */}
          <div className="space-y-8 lg:hidden">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="how-panel flex min-h-[300px] flex-col items-center justify-center p-6 sm:min-h-[340px] sm:p-8"
              >
                <StepPanel step={step} index={i} compact />
              </div>
            ))}
          </div>

          {/* Desktop: one stage, swap visuals on step click */}
          <div className="how-stage relative hidden lg:block">
            <div aria-hidden className="how-stage-glow" />
            <div className="how-stage-frame">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className={`how-panel how-panel-swap flex flex-col items-center justify-center p-8 ${
                    i === active ? "is-active" : ""
                  }`}
                  aria-hidden={i !== active}
                >
                  <StepPanel step={step} index={i} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </PageContainer>
    </section>
  );
}
