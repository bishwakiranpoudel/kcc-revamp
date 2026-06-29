import type { ReactNode, CSSProperties } from "react";
import Image from "next/image";
import { PageContainer, SectionHeader } from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "size-6 sm:size-7",
};

const PawIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 sm:size-7">
    <circle cx="6.5" cy="10.5" r="1.9" />
    <circle cx="10" cy="6.6" r="1.9" />
    <circle cx="14" cy="6.6" r="1.9" />
    <circle cx="17.5" cy="10.5" r="1.9" />
    <path d="M12 11.4c2.7 0 4.9 1.9 4.9 4.1 0 1.9-1.6 2.7-3.1 2.7-.8 0-1.2-.3-1.8-.3s-1 .3-1.8.3c-1.6 0-3.1-.8-3.1-2.7 0-2.2 2.2-4.1 4.9-4.1Z" />
  </svg>
);

const ClockIcon = (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </svg>
);

const ChartIcon = (
  <svg {...iconProps}>
    <path d="M4 19.5h16" />
    <rect x="6" y="11" width="3" height="6.5" rx="0.7" />
    <rect x="10.5" y="7" width="3" height="10.5" rx="0.7" />
    <rect x="15" y="13" width="3" height="4.5" rx="0.7" />
  </svg>
);

const SheetIcon = (
  <svg {...iconProps}>
    <rect x="4" y="4.5" width="16" height="15" rx="1.6" />
    <path d="M4 9.5h16M4 14.5h16M9.5 4.5v15M14.5 4.5v15" />
  </svg>
);

function PlanetTile({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="grid size-12 place-items-center rounded-xl border border-[color:var(--border-hairline)] bg-white text-trail-cyan shadow-[var(--shadow-md)] sm:size-14">
        {icon}
      </span>
      <span className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-trail-muted">
        {label}
      </span>
    </div>
  );
}

/** Two planets per orbit ring, on opposite phases. */
function Orbit({
  inset,
  duration,
  reverse = false,
  top,
  bottom,
}: {
  inset: string;
  duration: string;
  reverse?: boolean;
  top: { icon: ReactNode; label: string };
  bottom: { icon: ReactNode; label: string };
}) {
  return (
    <div
      className="solar-orbit"
      data-dir={reverse ? "rev" : undefined}
      style={{ inset, "--orbit-dur": duration } as CSSProperties}
    >
      <div className="solar-planet" data-pos="top">
        <div className="solar-upright">
          <PlanetTile icon={top.icon} label={top.label} />
        </div>
      </div>
      <div className="solar-planet" data-pos="bottom">
        <div className="solar-upright">
          <PlanetTile icon={bottom.icon} label={bottom.label} />
        </div>
      </div>
    </div>
  );
}

export function ChaosCollide() {
  return (
    <section className="section-fill section-surface-warm relative overflow-hidden py-[var(--section-py)]">
      <div
        aria-hidden
        className="section-ambient section-ambient-cyan pointer-events-none absolute -right-16 top-[20%] z-0 size-72 opacity-35"
      />
      <PageContainer className="relative z-10">
        <Reveal y={28}>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeader
              align="center"
              eyebrow="The problem"
              title={
                <>
                  Multiple logins. Zero{" "}
                  <span className="text-gradient-trail text-emph">
                    single answer.
                  </span>
                </>
              }
              description="Kennel software for bookings. Scheduling software for labor. Financial software for profit. Plus the spreadsheets you rebuild every Monday — none of them talk to each other."
            />
          </div>
        </Reveal>

        <Reveal delay={0.08} y={24} className="relative mx-auto mt-12 w-[min(520px,90vw)]">
          <div className="solar" aria-hidden>
            <Orbit
              inset="24%"
              duration="28s"
              top={{ icon: PawIcon, label: "Kennel" }}
              bottom={{ icon: ClockIcon, label: "Scheduling" }}
            />
            <Orbit
              inset="5%"
              duration="44s"
              reverse
              top={{ icon: ChartIcon, label: "Financial" }}
              bottom={{ icon: SheetIcon, label: "Spreadsheets" }}
            />

            <div className="solar-core">
              <Image
                src="/logo/logo_eye.png?v=2"
                alt="KennelEyes"
                width={56}
                height={31}
                className="h-7 w-auto sm:h-8"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="lead mx-auto mt-10 max-w-lg text-center text-trail-cyan">
            KennelEyes reads your kennel, scheduling, and financial software — then
            puts revenue, payroll, occupancy, and profit for every location on one
            live screen.
          </p>
        </Reveal>
      </PageContainer>
    </section>
  );
}
