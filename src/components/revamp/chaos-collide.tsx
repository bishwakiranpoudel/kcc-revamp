import {
  BrandLogo,
  PageContainer,
  SectionHeader,
} from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";
import { INTEGRATIONS } from "@/lib/site";

/** Evenly spaced on an ellipse (top, bottom-right, bottom-left). */
const ORBIT_SLOTS = [
  { left: "50%", top: "14%" },
  { left: "84%", top: "72%" },
  { left: "16%", top: "72%" },
] as const;

export function ChaosCollide() {
  return (
    <section className="section-tint-cream relative overflow-hidden py-[var(--section-py)]">
      <PageContainer className="relative z-10">
        <Reveal y={28}>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeader
              align="center"
              eyebrow="The problem"
              title={
                <>
                  Five logins. Zero{" "}
                  <span className="text-gradient-trail text-emph">
                    single answer.
                  </span>
                </>
              }
              description="Gingr for bookings. When I Work for labor. QuickBooks for profit. Plus the spreadsheet you rebuild every Monday — none of them talk to each other."
            />
          </div>
        </Reveal>

        <Reveal delay={0.08} y={24} className="relative mx-auto mt-12 w-[min(520px,92vw)]">
          <div className="relative mx-auto aspect-square w-full">
            <div className="absolute inset-[6%] rounded-[50%] border border-dashed border-trail-orange/25" />
            <div className="absolute inset-[18%] rounded-[50%] border border-dashed border-trail-cyan/20" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-trail-cyan/10 blur-2xl" />

            {INTEGRATIONS.map((name, i) => (
              <div
                key={name}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: ORBIT_SLOTS[i]?.left ?? "50%",
                  top: ORBIT_SLOTS[i]?.top ?? "50%",
                }}
              >
                <div className="trail-card-strong rounded-xl p-2.5">
                  <BrandLogo name={name} size={40} className="border-0" />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="lead mx-auto mt-10 max-w-lg text-center text-trail-cyan">
            KennelEyes reads all of them and puts revenue, payroll, occupancy,
            and profit for every location on one live screen.
          </p>
        </Reveal>
      </PageContainer>
    </section>
  );
}
