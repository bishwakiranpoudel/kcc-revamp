import type { Metadata } from "next";
import {
  EnvelopeSimple,
  ChatCircleDots,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/revamp/reveal";
import { APP_URL, INTEGRATIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Talk to the KennelEyes team about pricing, demos, support, or partnerships. A real person replies within one business day — no card, no commitment.",
};

const channels = [
  {
    icon: EnvelopeSimple,
    title: "Email us",
    value: "hello@kenneleyes.com",
    note: "Best for detailed questions",
    href: "mailto:hello@kenneleyes.com",
  },
  {
    icon: ChatCircleDots,
    title: "Talk to sales",
    value: "Book a 30-min demo",
    note: "See your own numbers live",
    href: "/demo",
  },
  {
    icon: Phone,
    title: "Call us",
    value: "+1 (555) 012-3456",
    note: "Mon–Fri, 9am–6pm ET",
    href: "tel:+15550123456",
  },
];

export default function ContactPage() {
  return (
    <section className="trail-section relative min-h-svh overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-20">
      <div
        aria-hidden
        className="section-ambient section-ambient-cyan pointer-events-none absolute -right-20 top-[10%] z-0 size-72 opacity-30"
      />
      <div className="page-container relative z-10">
        <Reveal className="max-w-2xl">
          <Link
            href="/"
            className="text-sm font-medium text-trail-muted transition-colors hover:text-trail-ink"
          >
            ← Back to home
          </Link>
          <span className="eyebrow mt-6 flex w-fit items-center gap-2 text-trail-cyan">
            <span className="size-1.5 rounded-full bg-current" />
            Contact us
          </span>
          <h1 className="mt-4 text-balance text-3xl font-bold leading-[1.05] tracking-tight text-trail-ink sm:text-4xl lg:text-[2.7rem]">
            Let&apos;s talk about your{" "}
            <span className="text-trail-cyan">whole group</span>
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-trail-muted lg:text-lg">
            Questions about pricing, a demo, or how KennelEyes fits your stack?
            Send us a note and a real person — not a bot — gets back to you within
            one business day.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <Reveal stagger className="flex flex-col gap-3">
            {channels.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="trail-card group flex items-center gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-trail-cyan/10 text-trail-cyan">
                  <item.icon size={22} weight="duotone" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold tracking-tight text-trail-ink">
                    {item.title}
                  </span>
                  <span className="block truncate text-sm font-medium text-trail-cyan">
                    {item.value}
                  </span>
                  <span className="block text-xs text-trail-muted">{item.note}</span>
                </span>
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  className="shrink-0 text-trail-muted transition-colors group-hover:text-trail-cyan"
                />
              </Link>
            ))}

            <div className="trail-card rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-trail-green/12 text-trail-green">
                  <Clock size={22} weight="duotone" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-trail-ink">
                    One business day, every time
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-trail-muted">
                    No ticket queues — your message reaches the team directly.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-trail-border pt-4 text-xs text-trail-muted">
                <ShieldCheck
                  size={16}
                  weight="duotone"
                  className="shrink-0 text-trail-cyan"
                />
                Read-only, encrypted — we never sell or share your numbers.
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-trail-border pt-4">
                <span className="eyebrow text-trail-muted">Works with</span>
                {INTEGRATIONS.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-trail-border bg-white px-2.5 py-0.5 text-xs font-semibold text-trail-ink"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <p className="px-1 text-sm text-trail-muted">
              Already a customer?{" "}
              <Link
                href={APP_URL}
                className="font-semibold text-trail-cyan hover:underline"
              >
                Log in to your workspace
              </Link>
              .
            </p>
          </Reveal>

          <Reveal y={32} delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
