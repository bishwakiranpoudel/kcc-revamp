import { PageContainer, SectionHeader } from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";

const features = [
  {
    title: "Revenue by business line, the accurate way",
    body: "Boarding, daycare, grooming — measured by the revenue the dogs in your care actually generated, not just payments collected. See a single day or analyze the trend.",
  },
  {
    title: "Know exactly how full every kennel is",
    body: "Track occupancy and capacity utilization over any time period and spot the trends. Are you overbooking, or do you have room to grow?",
  },
  {
    title: "Dogs per labor hour — the metric you'll wish you had sooner",
    body: "Likely a new number for you: how many dogs are you caring for per employee hour worked? It quietly decides your margins, and now you can watch it.",
  },
  {
    title: "Match staffing to the dogs in the building",
    body: "See how labor hours move with the number of dogs in-house, and where scheduled hours drift from hours actually worked — then adjust before it costs you.",
  },
  {
    title: "Payroll as a % of revenue — your make-or-break number",
    body: "The one benchmark that's often the difference between success and failure. We pair true revenue with real payroll — hours, rates, and taxes — so the percentage is honest.",
  },
  {
    title: "See next week's payroll before it happens",
    body: "Upcoming reservations next to your staffing plan for the next 1–2 weeks. Overstaffed? Cut hours early. Understaffed? Add shifts before the last-minute bind.",
  },
];

export function ProductFeatures() {
  return (
    <section
      id="features"
      className="section-surface-alt relative scroll-mt-[var(--header-h)] overflow-hidden py-[var(--section-py)]"
    >
      <PageContainer className="relative z-10">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="What you get"
            title="Every number you chase, in one place"
            description="The things you check across multiple logins every morning — revenue, payroll, occupancy, and profit — now on one screen for every location at once."
          />
        </Reveal>

        <Reveal
          stagger
          staggerEach={0.08}
          delay={0.06}
          className="mx-auto mt-7 grid w-full max-w-5xl gap-4 sm:mt-9 sm:grid-cols-2 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <article key={feature.title} className="feature-card p-5 sm:p-6">
                <span className="font-mono text-[0.6875rem] text-trail-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="heading-card mt-2 text-trail-ink">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-trail-muted">
                  {feature.body}
                </p>
              </article>
          ))}
        </Reveal>
      </PageContainer>
    </section>
  );
}
