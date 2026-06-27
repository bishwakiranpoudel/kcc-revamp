import Link from "next/link";
import { SOFTWARE_COPY } from "@/lib/site";
import { PageContainer } from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";

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
    sub: "Instead of multiple separate logins",
  },
];

export function HeroZoom() {
  return (
    <div className="section-surface-hero relative min-h-screen overflow-hidden">
      <div aria-hidden className="saas-grid pointer-events-none absolute inset-0 z-0 opacity-70" />

      <PageContainer className="relative z-10 grid min-h-screen items-center gap-10 pb-16 pt-[calc(var(--header-h)+1.5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20">
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
          </div>
        </Reveal>

        <Reveal immediate delay={0.12} y={32}>
          <div className="relative mx-auto w-full max-w-[min(100%,420px)] lg:max-w-[440px] lg:justify-self-end xl:max-w-[480px]">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-trail-orange/15 via-transparent to-trail-cyan/15 blur-3xl" />

          <div className="relative z-10 rounded-[var(--radius-card)] bg-white p-5 shadow-[var(--trail-card-shadow)] sm:p-6">
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

            <div className="mt-5 space-y-2.5 pt-4">
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
                className="rounded-xl bg-white px-4 py-3 shadow-[var(--trail-card-shadow)] sm:py-3.5"
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
