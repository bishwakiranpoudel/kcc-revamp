import Link from "next/link";
import Image from "next/image";
import { APP_URL } from "@/lib/site";
import { PageContainer } from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";

export function FinalCta() {
  return (
    <section
      id="cta"
      className="section-surface-cta relative overflow-hidden py-[var(--section-py)]"
    >
      <div aria-hidden className="saas-grid pointer-events-none absolute inset-0 z-0 opacity-40" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/graphics/dog-cta-light.png"
          alt=""
          fill
          sizes="100vw"
          className="cta-photo object-cover object-bottom"
        />
      </div>

      <div className="section-wash-orange pointer-events-none absolute inset-0 z-0 opacity-35" />
      <PageContainer className="relative z-10 text-center">
        <Reveal y={28}>
          <p className="eyebrow text-trail-orange">Get started</p>
          <h2 className="display-lg mx-auto mt-4 max-w-3xl">
            See your real numbers{" "}
            <span className="text-emph text-trail-orange">this week</span>
          </h2>
          <p className="lead mx-auto mt-5 max-w-lg text-trail-muted">
            Book a 30-minute demo. We&apos;ll connect your kennel, scheduling, and
            financial software and put every location on one screen using your
            data — not a canned tour. No card. No commitment.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
          <Link href="/demo" className="btn-trail-primary">
            Book my demo
          </Link>
          <Link href="#demo" className="btn-trail-secondary">
            See the live dashboard
          </Link>
          <Link href={APP_URL} className="btn-trail-secondary">
            Log in
          </Link>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mx-auto mt-6 max-w-md text-xs text-trail-faint">
            From $149/mo per location · volume discounts for multi-site groups ·
            no setup fees
          </p>
        </Reveal>
      </PageContainer>
    </section>
  );
}
