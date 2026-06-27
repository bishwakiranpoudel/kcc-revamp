import { PageContainer, SectionHeader } from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";

const fit = [
  "You run one kennel or 2–40 pet-care locations",
  "You already use kennel software, scheduling software, or financial software (like QuickBooks)",
  "You rebuild the same spreadsheet every week",
  "You want managers held to numbers, not vibes",
];

const notFit = [
  "You don't track labor or revenue at all",
  "You're shopping for new software (we read yours, not replace it)",
  "You need a booking or scheduling system built from scratch",
];

export function AudienceFit() {
  return (
    <section
      id="audience"
      className="section-fill section-surface-alt relative scroll-mt-[var(--header-h)] overflow-hidden py-[var(--section-py)]"
    >
      <PageContainer className="relative z-10">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Is this you?"
            title="Built for individual kennels and multi-location operators"
            description="We built KennelEyes for owners who already run on software — whether that's one site or many. Here's how to tell if that's you."
          />
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:mt-12 md:grid-cols-5">
          <Reveal delay={0.06} className="trail-card rounded-2xl bg-trail-green/10 p-7 sm:p-8 md:col-span-3">
            <p className="eyebrow text-trail-green">This is for you if</p>
            <p className="mt-1 text-xs text-trail-muted">
              KennelEyes pays for itself fast
            </p>
            <ul className="mt-6 space-y-3.5">
              {fit.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-medium text-trail-ink sm:text-[0.9375rem]"
                >
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-trail-green" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="trail-card rounded-2xl p-7 sm:p-8 md:col-span-2">
            <p className="eyebrow text-trail-muted">Probably not yet</p>
            <p className="mt-1 text-xs text-trail-faint">No hard feelings</p>
            <ul className="mt-6 space-y-3.5">
              {notFit.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-trail-muted"
                >
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-trail-faint" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </PageContainer>
    </section>
  );
}
