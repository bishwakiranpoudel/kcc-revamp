import type { Metadata } from "next";
import {
  Clock,
  PlugsConnected,
  Eye,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/revamp/reveal";
import { INTEGRATIONS } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "See your real revenue, labor, and occupancy in a tailored KennelEyes demo. Tell us about your locations and the systems you run — no card required.",
};

const assurances = [
  {
    icon: Clock,
    title: "30 minutes, all about you",
    body: "We dig into your group's numbers — not a slide deck.",
  },
  {
    icon: PlugsConnected,
    title: "We map it to your tools",
    body: "See how your kennel, scheduling, and financial software come together.",
  },
  {
    icon: Eye,
    title: "Watch your own data go live",
    body: "Connect a read-only test workspace and see real numbers.",
  },
  {
    icon: ShieldCheck,
    title: "Nothing to lose",
    body: "No card, no commitment, read-only the whole way through.",
  },
];

export default function DemoPage() {
  return (
    <section className="trail-section relative min-h-svh overflow-hidden pt-[calc(var(--header-h)+2rem)] pb-16">
      <div
        aria-hidden
        className="section-ambient section-ambient-cyan pointer-events-none absolute -right-20 top-[12%] z-0 size-72 opacity-30"
      />
      <div className="page-container relative z-10">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <Reveal>
              <Link
                href="/"
                className="text-sm font-medium text-trail-muted transition-colors hover:text-trail-ink"
              >
                ← Back to home
              </Link>
              <span className="eyebrow mt-6 flex w-fit items-center gap-2 text-trail-cyan">
                <span className="size-1.5 rounded-full bg-current" />
                Book a demo
              </span>
              <h1 className="mt-4 max-w-xl text-balance text-3xl font-bold leading-[1.05] tracking-tight text-trail-ink sm:text-4xl lg:text-[2.6rem]">
                See every location{" "}
                <span className="text-trail-cyan">live</span>
              </h1>
              <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-trail-muted lg:text-lg">
                Tell us about your group and we&apos;ll build the walkthrough
                around your real numbers. Most demos are booked within one
                business day.
              </p>
            </Reveal>

            <Reveal stagger className="mt-8 grid gap-3 sm:grid-cols-2">
              {assurances.map((item) => (
                <div
                  key={item.title}
                  className="trail-card group rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-trail-cyan/10 text-trail-cyan">
                    <item.icon size={19} weight="duotone" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold tracking-tight text-trail-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-trail-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </Reveal>

            <Reveal className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="eyebrow text-trail-muted">Works with</span>
              {INTEGRATIONS.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-trail-border bg-white px-3 py-1 text-xs font-semibold text-trail-ink"
                >
                  {name}
                </span>
              ))}
            </Reveal>
          </div>

          <div id="lead">
            <Reveal y={32} delay={0.1}>
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
