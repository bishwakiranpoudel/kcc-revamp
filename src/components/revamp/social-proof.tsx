import { PageContainer, SectionHeader } from "@/components/revamp/section-ui";
import { ArtIsolate, TopoBackdrop } from "@/components/revamp/trail-art";

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
    <section className="trail-section relative overflow-hidden py-[var(--section-py)]">
      <ArtIsolate>
        <TopoBackdrop opacity={0.14} />
      </ArtIsolate>
      <div className="section-wash-purple absolute inset-0 z-0 opacity-30" />

      <PageContainer>
        <SectionHeader
          align="center"
          eyebrow="Don't take our word for it"
          title="Owners who stopped flying blind"
          description="Here's what changed once every location lived on one screen."
        />

        <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((item) => (
            <figure
              key={item.name}
              className="trail-card flex h-full flex-col rounded-2xl p-6 sm:p-7"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-trail-muted sm:text-[0.9375rem]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-trail-border pt-4">
                <p className="text-sm font-semibold text-trail-ink">{item.name}</p>
                <p className="text-xs text-trail-faint">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
