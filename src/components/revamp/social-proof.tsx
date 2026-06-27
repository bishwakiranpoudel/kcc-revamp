import { PageContainer, SectionHeader } from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";

const quotes = [
  {
    quote:
      "I used to find out about a bad labor week ten days too late. Now I catch payroll drifting over 32% the morning it happens — and fix it that day.",
    name: "Dana R.",
    role: "COO · 6-location group",
  },
  {
    quote:
      "First time I opened it, all four sites were on one screen and revenue already matched QuickBooks. I stopped building my Sunday spreadsheet that week.",
    name: "Marcus T.",
    role: "Owner · Boarding & daycare",
  },
  {
    quote:
      "My managers finally have a number they answer to every day — occupancy and dogs per labor hour. No more guessing how a location is doing.",
    name: "Priya S.",
    role: "Regional Director",
  },
];

export function SocialProof() {
  return (
    <section className="section-surface-warm relative overflow-hidden py-[var(--section-py)]">
      <PageContainer className="relative z-10">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Don't take our word for it"
            title="Owners who stopped flying blind"
            description="Here's what changed once every location lived on one screen."
          />
        </Reveal>

        <Reveal stagger staggerEach={0.1} delay={0.06} className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((item) => (
            <figure
              key={item.name}
              className="trail-card flex h-full flex-col p-6 sm:p-7"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-trail-muted sm:text-[0.9375rem]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pt-4">
                <p className="text-sm font-semibold text-trail-ink">{item.name}</p>
                <p className="text-xs text-trail-faint">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </PageContainer>
    </section>
  );
}
