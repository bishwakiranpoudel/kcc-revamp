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
    <section className="section-tint-sky relative overflow-hidden py-[var(--section-py)] text-trail-ink">
      <div className="section-wash-cyan pointer-events-none absolute inset-0 z-0 opacity-45" />
      <PageContainer className="relative z-10 text-center">
        <Reveal>
          <SectionHeader
          align="center"
          eyebrow="Results"
          title="Numbers that matter to operators"
          description="What early customers report after putting every location on one screen."
          />
        </Reveal>

        <Reveal stagger staggerEach={0.08} delay={0.08} className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:mt-12 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.value}
              className="rounded-xl bg-trail-surface-strong px-4 py-6"
            >
              <span className="font-display block text-3xl font-extrabold tabular text-trail-cyan sm:text-4xl">
                {s.value}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-trail-muted">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-xs text-trail-faint">
            Illustrative figures shown for demonstration during early access.
          </p>
        </Reveal>
      </PageContainer>
    </section>
  );
}
