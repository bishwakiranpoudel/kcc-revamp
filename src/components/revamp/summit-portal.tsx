import Link from "next/link";
import { PageContainer } from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";

export function SummitPortal() {
  return (
    <section
      id="summit"
      className="section-fill section-surface-alt relative overflow-hidden py-[var(--section-py)]"
    >
      <PageContainer className="relative z-10">
        <Reveal y={28}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-trail-cyan">Mission Control</p>
            <p className="font-serif mt-3 text-xl italic text-trail-muted sm:text-2xl">
              Analyze Your Numbers &amp; Make Consequential Decisions
            </p>
            <h2 className="display-lg mt-4 text-trail-ink">
              This is the screen you will open{" "}
              <span className="text-emph text-trail-cyan">every morning</span>
            </h2>
            <p className="lead mx-auto mt-5 max-w-lg text-trail-muted">
              Revenue by service line, payroll as a % of revenue, occupancy by
              site, and financial software P&amp;L — one dashboard, every location, live.
            </p>
            <Link href="#demo" className="btn-trail-primary mt-8 inline-flex">
              See the live dashboard
            </Link>
          </div>
        </Reveal>
      </PageContainer>
    </section>
  );
}
