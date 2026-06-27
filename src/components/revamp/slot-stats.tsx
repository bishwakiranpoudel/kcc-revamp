import { PageContainer, SectionHeader } from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";

const stats = [
  { value: "−4.1%", label: "Lower payroll-to-revenue" },
  { value: "6.5 hrs", label: "Back in your week, every week" },
  { value: "<10 min", label: "From sign-up to live numbers" },
  { value: "40+", label: "Locations on one account" },
];

export function SlotStats() {
  return (
    <section className="section-band-metrics relative overflow-hidden py-[var(--section-py)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% -10%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 62%)",
        }}
      />
      <PageContainer className="relative z-10 text-center">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Results"
            title="Numbers that matter to operators"
            description="What early customers report after putting every location on one screen."
          />
        </Reveal>

        <Reveal
          stagger
          staggerEach={0.08}
          delay={0.08}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/[0.08] sm:mt-12 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.value}
              className="flex flex-col items-center bg-[#16130f] px-4 py-8"
            >
              <span
                className="font-display text-3xl font-extrabold tabular sm:text-4xl"
                style={{ color: "color-mix(in oklab, var(--accent) 42%, white)" }}
              >
                {s.value}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-xs text-white/40">
            Illustrative figures shown for demonstration during early access.
          </p>
        </Reveal>
      </PageContainer>
    </section>
  );
}
