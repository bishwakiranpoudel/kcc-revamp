import Link from "next/link";
import { SOFTWARE_COPY } from "@/lib/site";
import { PageContainer } from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";
import { HeroPayrollChart } from "@/components/revamp/hero-payroll-chart";

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
    sub: "Instead of multiple separate logins",
  },
];

const trustPoints = ["No card required", "Live in under 10 minutes", "Read-only access"];

export function HeroZoom() {
  return (
    <div className="section-surface-hero relative min-h-screen overflow-hidden">
      <div aria-hidden className="saas-grid pointer-events-none absolute inset-0 z-0 opacity-100" />

      <PageContainer className="relative z-10 grid min-h-screen items-center gap-10 pb-16 pt-[calc(var(--header-h)+1.5rem)] lg:grid-cols-2 lg:gap-12 lg:pb-20">
        <Reveal immediate y={28}>
          <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow rounded-full border border-trail-cyan/20 bg-white/80 px-3 py-1 text-trail-cyan backdrop-blur-sm">
              Operations intelligence
            </span>
            <span className="h-px w-10 bg-trail-border" />
            <span className="eyebrow text-trail-muted">{SOFTWARE_COPY.heroAudience}</span>
          </div>

          <h1 className="display-xl mt-5 text-trail-ink">
            <span className="block">Stop finding out about a bad week</span>
            <span className="text-gradient-trail text-emph block">
              ten days too late
            </span>
          </h1>

          <p className="lead mt-6 max-w-xl pl-1 text-trail-muted">
            {SOFTWARE_COPY.heroLead}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/demo" className="btn-trail-primary w-full sm:w-auto">
              Book a 30-min demo
            </Link>
            <Link href="#demo" className="btn-trail-secondary w-full sm:w-auto">
              See the live dashboard
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 pl-1 text-xs text-trail-faint">
            {trustPoints.map((point, i) => (
              <span key={point} className="flex items-center gap-2.5">
                {i > 0 ? <span className="text-trail-border">·</span> : null}
                {point}
              </span>
            ))}
          </div>
          </div>
        </Reveal>

        <Reveal immediate delay={0.12} y={32} className="w-full lg:justify-self-end">
          <div className="mx-auto w-full max-w-[min(100%,480px)] lg:max-w-[540px] xl:max-w-[580px]">
            <div className="relative">
              <div aria-hidden className="app-window-glow" />
              <div aria-hidden className="app-window-stack hidden sm:block" />

              <div className="app-window">
                <div className="app-window-bar">
                  <span className="app-dot" />
                  <span className="app-dot" />
                  <span className="app-dot" />
                  <span className="ml-2 rounded-md bg-trail-surface px-2 py-1">
                    <span className="eyebrow !text-[0.5rem] !tracking-[0.14em] text-trail-faint">
                      Dashboard / This week
                    </span>
                  </span>
                  <span className="ml-auto flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trail-green opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-trail-green" />
                    </span>
                    <span className="eyebrow !text-[0.5rem] text-trail-muted">Live</span>
                  </span>
                </div>

                <div className="flex">
                  <div className="app-rail hidden sm:flex">
                    <div className="app-rail-icon is-active" />
                    <div className="app-rail-icon" />
                    <div className="app-rail-icon" />
                    <div className="app-rail-icon" />
                  </div>

                  <div className="min-w-0 flex-1 p-5 sm:p-6">
                    <HeroPayrollChart />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-9 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[color:var(--border-hairline)] bg-[color:var(--border-hairline)]">
              {stats.map((s) => (
                <div key={s.label} className="bg-white px-3 py-3.5 text-center sm:px-4">
                  <span className="font-display block text-lg font-extrabold tabular text-trail-cyan sm:text-xl">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-[0.625rem] leading-tight text-trail-muted">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
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
