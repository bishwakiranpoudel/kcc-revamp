import type { CSSProperties } from "react";
import Image from "next/image";
import { INTEGRATIONS } from "@/lib/site";
import {
  BrandLogo,
  PageContainer,
  SectionHeader,
} from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";

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

export function StickySplitSteps() {
  return (
    <section id="how" className="section-tint-white relative overflow-hidden py-[var(--section-py)]">
      <PageContainer className="relative z-10 lg:grid lg:items-start lg:gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:self-start">
          <Reveal>
            <SectionHeader
              eyebrow="How it works"
              title="Live numbers by this afternoon"
              description="No data team, no spreadsheets, no IT project. Three steps and you're watching real numbers from every location."
            />
          </Reveal>

          <Reveal delay={0.08} className="how-stepper mt-9 hidden sm:mt-11 lg:block">
            <span aria-hidden className="how-rail" />
            <span
              aria-hidden
              className="how-rail-fill"
              style={{ "--how-fill": 100 } as CSSProperties}
            />
            <ol className="flex flex-col gap-7">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[2.75rem_1fr] items-start gap-4"
                >
                  <div
                    className="how-node bg-trail-cyan text-white"
                  >
                    0{i + 1}
                  </div>
                  <div className="pt-1.5">
                    <p className="heading-card text-trail-ink">{step.title}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal stagger staggerEach={0.12} className="relative mt-12 space-y-8 lg:mt-0">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="how-panel flex min-h-[300px] flex-col items-center justify-center p-6 sm:min-h-[340px] sm:p-8"
            >
              <div className="mb-6 w-full text-center lg:hidden">
                <span className="font-mono text-xs font-medium text-trail-orange">
                  0{i + 1}
                </span>
                <p className="heading-card mt-1 text-trail-ink">{step.title}</p>
              </div>
              {step.visual === "orbit" && (
                <div className="relative size-52 sm:size-60">
                  <div className="how-orbit-ring absolute inset-0 animate-[spin_44s_linear_infinite] rounded-full border border-dashed border-trail-cyan/20" />
                  <div className="how-orbit-ring absolute inset-[14%] animate-[spin_30s_linear_infinite_reverse] rounded-full border border-dashed border-trail-orange/15" />
                  <div className="absolute left-1/2 top-1/2 flex size-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-trail-surface-strong text-center">
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
                          className="rounded-xl"
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
                      className={`flex items-center justify-between gap-2 rounded-xl px-3.5 py-3 text-left text-sm font-semibold sm:px-4 ${
                        on
                          ? "bg-[color-mix(in_srgb,var(--trail-cyan)_12%,var(--trail-surface-strong))] text-trail-ink"
                          : "bg-trail-surface text-trail-muted"
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
                  <div className="how-pulse-ring absolute inset-0 rounded-full bg-trail-orange/8" />
                  <div className="how-pulse-ring absolute inset-[12%] rounded-full bg-trail-cyan/8" />
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
        </Reveal>
      </PageContainer>
    </section>
  );
}
