import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";

export function SummitPortal() {
  return (
    <section
      id="summit"
      className="section-tint-white relative overflow-hidden py-[var(--section-py)]"
    >
      <PageContainer className="relative z-10">
        <Reveal y={28}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-trail-orange">Mission Control</p>
            <p className="font-serif mt-3 text-xl italic text-trail-muted sm:text-2xl">
              Analyze Your Numbers &amp; Make Consequential Decisions
            </p>
            <h2 className="display-lg mt-4 text-trail-ink">
              This is the screen you&apos;d open{" "}
              <span className="text-emph text-trail-cyan">every morning</span>
            </h2>
            <p className="lead mx-auto mt-5 max-w-lg text-trail-muted">
              Revenue by service line, payroll as a % of revenue, occupancy by
              site, and QuickBooks P&L — one dashboard, every location, live.
            </p>
            <Link href="#demo" className="btn-trail-primary mt-8 inline-flex">
              See the live dashboard
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.12} y={32} className="relative mx-auto mt-14 max-w-4xl">
          <div className="pointer-events-none absolute inset-x-[8%] bottom-0 top-1/4 rounded-full bg-trail-orange/12 blur-3xl" />
          <Image
            src="/graphics/dog-summit.png"
            alt=""
            width={1600}
            height={1067}
            className="relative w-full rounded-2xl object-contain object-bottom opacity-90"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 18%, black 88%, transparent 100%)",
            }}
          />
        </Reveal>
      </PageContainer>
    </section>
  );
}
