import {
  PageContainer,
  SectionHeader,
  SoftwareBadge,
} from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";
import { SOFTWARE_STACK } from "@/lib/site";

/** Evenly spaced on an ellipse (top, bottom-right, bottom-left). */
const ORBIT_SLOTS = [
  { left: "50%", top: "14%" },
  { left: "84%", top: "72%" },
  { left: "16%", top: "72%" },
] as const;

export function ChaosCollide() {
  return (
    <section className="section-surface-warm relative overflow-hidden py-[var(--section-py)]">
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

        <Reveal delay={0.08} y={24} className="relative mx-auto mt-12 w-[min(520px,92vw)]">
          <div className="relative mx-auto aspect-square w-full">
            <div className="absolute inset-[6%] rounded-[50%] border border-dashed border-trail-orange/25" />
            <div className="absolute inset-[18%] rounded-[50%] border border-dashed border-trail-cyan/20" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-trail-cyan/10 blur-2xl" />

            {SOFTWARE_STACK.map((item, i) => (
              <div
                key={item.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: ORBIT_SLOTS[i]?.left ?? "50%",
                  top: ORBIT_SLOTS[i]?.top ?? "50%",
                }}
              >
                <div className="trail-card-strong rounded-xl p-2.5">
                  <SoftwareBadge item={item} size={40} />
                </div>
              </div>
            ))}
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
