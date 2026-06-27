import Image from "next/image";
import { BrandLogo, PageContainer } from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";

const integrations = [
  {
    name: "Gingr",
    role: "Bookings & revenue",
    dock: { x: -150, y: -118 },
    line: "M 0,0 C -70,-45 -120,-95 -150,-118",
  },
  {
    name: "When I Work",
    role: "Labor & shifts",
    dock: { x: 150, y: -118 },
    line: "M 0,0 C 70,-45 120,-95 150,-118",
  },
  {
    name: "QuickBooks",
    role: "Profit & loss",
    sub: "Online",
    dock: { x: 0, y: 120 },
    line: "M 0,0 C 10,60 5,95 0,120",
  },
];

const PANEL_BG = "var(--trail-surface-strong)";

function IntegrationCard({
  item,
  className = "",
}: {
  item: (typeof integrations)[number];
  className?: string;
}) {
  return (
    <div
      style={{ background: PANEL_BG }}
      className={`flex items-center gap-3 rounded-xl px-3.5 py-3 ${className}`}
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
  return (
    <section
      id="integrations"
      className="section-tint-white relative scroll-mt-[var(--header-h)] overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="stack-grid absolute inset-0 opacity-60" />
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

      <PageContainer className="relative grid items-center gap-10 py-12 lg:min-h-[520px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:py-16">
        <Reveal className="relative z-10 text-center lg:py-16 lg:text-left xl:py-20">
          <p className="eyebrow text-trail-orange">Your existing stack</p>
          <h2 className="display-md mt-3 text-trail-ink">
            Plugs into what you already run — nothing to rip out
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-trail-muted sm:text-base lg:mx-0">
            KennelEyes reads Gingr, When I Work, and QuickBooks with read-only
            access. Your tools connect to one live dashboard.
          </p>
          <p className="mt-4 hidden text-xs text-trail-faint lg:block">
            Read-only · nothing to migrate · your POS stays put
          </p>
        </Reveal>

        <Reveal stagger className="relative z-10 space-y-3 lg:hidden">
          {integrations.map((item) => (
            <IntegrationCard key={item.name} item={item} />
          ))}
          <div className="flex items-center justify-center py-1 text-trail-cyan" aria-hidden>
            ↓
          </div>
          <div
            style={{ background: PANEL_BG }}
            className="rounded-xl px-6 py-5 text-center"
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
        </Reveal>

        <Reveal delay={0.08} y={28} className="relative mx-auto hidden w-full max-w-md items-center justify-center lg:flex lg:max-w-none lg:min-h-[480px]">
          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2"
            viewBox="-170 -170 340 340"
            aria-hidden
          >
            <defs>
              <linearGradient id="lineFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(14,116,144,0.95)" />
                <stop offset="100%" stopColor="rgba(14,116,144,0.5)" />
              </linearGradient>
            </defs>
            {integrations.map((item) => (
              <path
                key={item.name}
                d={item.line}
                fill="none"
                stroke="url(#lineFade)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
            <g className="hub-packets">
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
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-trail-cyan/15 blur-3xl"
            aria-hidden
          />

          {integrations.map((item) => (
            <div
              key={item.name}
              className="integration-card absolute left-1/2 top-1/2 z-20 w-[11.5rem]"
              style={{
                transform: `translate(calc(-50% + ${item.dock.x}px), calc(-50% + ${item.dock.y}px))`,
              }}
            >
              <IntegrationCard item={item} />
            </div>
          ))}

          <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -m-4 rounded-3xl bg-trail-cyan/10 opacity-50"
            />
            <div
              style={{ background: PANEL_BG }}
              className="relative rounded-xl px-8 py-6 text-center"
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
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-trail-cyan/12 px-2.5 py-0.5 text-[0.625rem] font-bold tracking-wider text-trail-cyan uppercase">
                <span className="size-1.5 animate-pulse rounded-full bg-trail-cyan" />
                Live
              </span>
            </div>
          </div>
        </Reveal>
      </PageContainer>
    </section>
  );
}
