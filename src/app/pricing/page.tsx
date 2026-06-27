import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ShieldCheck, PlugsConnected } from "@phosphor-icons/react/dist/ssr";
import { PageContainer, SectionHeader } from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";
import { APP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple per-location pricing for KennelEyes. From $149/mo per location, with volume discounts for multi-site groups. No setup fees, no add-ons.",
};

type Tier = {
  name: string;
  blurb: string;
  price: string;
  unit: string;
  cta: string;
  href: string;
  featured?: boolean;
  features: string[];
};

const tiers: Tier[] = [
  {
    name: "Single Site",
    blurb: "Everything one location needs to see its real numbers.",
    price: "$149",
    unit: "/mo per location",
    cta: "Book a demo",
    href: "/demo",
    features: [
      "Live revenue, labor & occupancy",
      "Kennel, scheduling & financial software sync",
      "Daily & weekly performance reports",
      "Read-only, encrypted connections",
      "Email support",
    ],
  },
  {
    name: "Multi-Site",
    blurb: "Roll up every branch into one screen, with volume discounts.",
    price: "From $129",
    unit: "/mo per location",
    cta: "Book a demo",
    href: "/demo",
    featured: true,
    features: [
      "Everything in Single Site",
      "Group-wide rollups & comparisons",
      "Volume discounts as you add sites",
      "Per-manager location permissions",
      "Custom alerts & benchmarks",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    blurb: "For large groups that need bespoke rollups and controls.",
    price: "Custom",
    unit: "tailored to your group",
    cta: "Talk to sales",
    href: "/contact",
    features: [
      "Everything in Multi-Site",
      "Best volume pricing for 16+ sites",
      "Custom integrations & data exports",
      "SSO & advanced access controls",
      "Dedicated onboarding & CSM",
      "SLA-backed support",
    ],
  },
];

const assurances = [
  { icon: ShieldCheck, label: "No setup fees" },
  { icon: PlugsConnected, label: "No add-ons" },
  { icon: Check, label: "Cancel anytime" },
];

const compare: { label: string; single: boolean; multi: boolean; enterprise: boolean }[] = [
  { label: "Live revenue, labor & occupancy", single: true, multi: true, enterprise: true },
  { label: "Kennel · scheduling · financial software sync", single: true, multi: true, enterprise: true },
  { label: "Group-wide rollups & comparisons", single: false, multi: true, enterprise: true },
  { label: "Per-manager location permissions", single: false, multi: true, enterprise: true },
  { label: "Custom alerts & benchmarks", single: false, multi: true, enterprise: true },
  { label: "SSO & advanced access controls", single: false, multi: false, enterprise: true },
  { label: "Dedicated onboarding & CSM", single: false, multi: false, enterprise: true },
];

const faqs = [
  {
    q: "How does per-location pricing work?",
    a: "You pay for each physical location you connect — from $149/mo for a single site. The more locations you run, the lower the per-site price drops. We size the exact number with you on the demo.",
  },
  {
    q: "Are there any setup or onboarding fees?",
    a: "No. Setup, onboarding, and connecting your tools are all included. You won't see surprise add-ons or implementation invoices.",
  },
  {
    q: "Can I change plans as I grow?",
    a: "Yes. Add or remove locations whenever you need to and your pricing adjusts automatically. Multi-site discounts kick in the moment you cross each volume tier.",
  },
  {
    q: "Is there a contract or can I cancel?",
    a: "Plans are month-to-month and you can cancel anytime. Because every connection is read-only, leaving never touches the data in your own tools.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="trail-section section-wash-cyan relative overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-[var(--section-py)]">
        <PageContainer>
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Pricing"
              title={
                <>
                  One clear price,{" "}
                  <span className="text-emph text-trail-orange">per location</span>
                </>
              }
              description="From $149/mo per location, with volume discounts for multi-site groups. No setup fees, no add-ons — just every location on one screen."
            />

            <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {assurances.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 text-sm font-medium text-trail-muted"
                >
                  <item.icon size={16} weight="bold" className="text-trail-green" />
                  {item.label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal
            stagger
            staggerEach={0.14}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start"
          >
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`trail-card relative flex h-full flex-col rounded-3xl p-6 sm:p-7 ${
                  tier.featured
                    ? "bg-[color-mix(in_oklab,var(--trail-cyan)_10%,var(--trail-surface-strong))] md:-translate-y-2"
                    : ""
                }`}
              >
                {tier.featured ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-trail-cyan px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-white">
                    Most popular
                  </span>
                ) : null}

                <h3 className="heading-card text-trail-ink">{tier.name}</h3>
                <p className="mt-1.5 min-h-[2.5rem] text-sm leading-relaxed text-trail-muted">
                  {tier.blurb}
                </p>

                <div className="mt-5 flex items-end gap-1.5">
                  <span className="font-display text-4xl font-extrabold tracking-tight text-trail-ink">
                    {tier.price}
                  </span>
                  <span className="mb-1 text-sm text-trail-muted">{tier.unit}</span>
                </div>

                <Link
                  href={tier.href}
                  className={`mt-6 w-full ${
                    tier.featured ? "btn-trail-primary" : "btn-trail-secondary"
                  }`}
                >
                  {tier.cta}
                </Link>

                <ul className="mt-6 space-y-3 border-t border-trail-border pt-6">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-trail-ink">
                      <Check
                        size={18}
                        weight="bold"
                        className="mt-0.5 shrink-0 text-trail-green"
                      />
                      <span className="text-trail-muted">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </PageContainer>
      </section>

      <section className="trail-section py-[var(--section-py)]">
        <PageContainer>
          <Reveal>
            <SectionHeader
              eyebrow="Compare plans"
              title="What's included where"
              description="Every plan reads from your tools the same way — higher tiers add rollups, controls, and support."
            />
          </Reveal>

          <Reveal y={32} className="mt-10 overflow-hidden rounded-3xl border border-trail-border">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-trail-bg-deep">
                  <th className="px-5 py-4 font-semibold text-trail-ink">Feature</th>
                  <th className="px-5 py-4 text-center font-semibold text-trail-ink">
                    Single Site
                  </th>
                  <th className="px-5 py-4 text-center font-semibold text-trail-cyan">
                    Multi-Site
                  </th>
                  <th className="px-5 py-4 text-center font-semibold text-trail-ink">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 1 ? "bg-trail-bg-orbit" : ""}
                  >
                    <td className="px-5 py-3.5 text-trail-muted">{row.label}</td>
                    {[row.single, row.multi, row.enterprise].map((on, j) => (
                      <td key={j} className="px-5 py-3.5 text-center">
                        {on ? (
                          <Check
                            size={18}
                            weight="bold"
                            className="mx-auto text-trail-green"
                          />
                        ) : (
                          <X
                            size={16}
                            weight="bold"
                            className="mx-auto text-trail-faint"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </PageContainer>
      </section>

      <section className="trail-section py-[var(--section-py)]">
        <PageContainer>
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Pricing questions"
              title="The fine print, in plain English"
            />
          </Reveal>
          <Reveal stagger className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.q} className="trail-card rounded-2xl p-5">
                <h3 className="font-semibold text-trail-ink">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-trail-muted">
                  {item.a}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal y={32} className="mx-auto mt-12 max-w-2xl text-center">
            <h2 className="display-md text-trail-ink">
              Ready to see your real numbers?
            </h2>
            <p className="lead mx-auto mt-4 max-w-md text-trail-muted">
              Book a 30-minute demo and we&apos;ll size a plan to your group using
              your own data. No card, no commitment.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/demo" className="btn-trail-primary">
                Book my demo
              </Link>
              <Link href="/contact" className="btn-trail-secondary">
                Talk to sales
              </Link>
            <Link href={APP_URL} className="btn-trail-secondary">
              Log in
            </Link>
            </div>
          </Reveal>
        </PageContainer>
      </section>
    </>
  );
}
