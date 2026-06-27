"use client";

import { useState } from "react";
import { PageContainer, SectionHeader } from "@/components/revamp/section-ui";
import { Reveal } from "@/components/revamp/reveal";

const faqs = [
  {
    q: "Will this mess with my kennel software or QuickBooks data?",
    a: "No. You log into each tool through its own secure screen and we only ask to read. We can see your bookings, shifts, and ledgers — we can't change, delete, or move a single thing in them.",
  },
  {
    q: "How long until I actually see my numbers?",
    a: "Most owners connect their accounts and map their locations in under ten minutes, then watch live numbers the same day. If you run a lot of sites, we'll usually finish mapping with you in one call.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. Every connection is read-only, your tokens are encrypted, and your workspace is walled off from everyone else's. We follow SOC 2-aligned practices and we never sell or share your numbers.",
  },
  {
    q: "Can I stop a manager from seeing other locations?",
    a: "Absolutely. You and your admins see the whole group. Each manager only sees the branch you assign them. They get the numbers they're responsible for — and nothing else.",
  },
  {
    q: "Do I have to switch off my kennel software or POS?",
    a: "Never. KennelEyes sits on top of what you already run. It reads your tools to build one clear picture — your booking and scheduling systems stay exactly where they are.",
  },
  {
    q: "What's it going to cost me?",
    a: "You pay by how many locations you run — from $149/mo for a single site, with volume discounts for multi-site operators. No setup fees, no add-ons. Book a demo and we'll size a plan to your group.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="section-surface-alt relative scroll-mt-[var(--header-h)] py-[var(--section-py)]"
    >
      <PageContainer>
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Before you ask"
            title="The questions every owner asks us"
            description="Straight answers. If yours isn't here, ask us on the demo — we'll tell you the truth."
          />
        </Reveal>

        <Reveal stagger staggerEach={0.07} delay={0.06} className="mx-auto mt-10 max-w-2xl space-y-2.5 sm:mt-12">
          {faqs.map((item, i) => {
            const isOpen = i === openIndex;
            return (
              <div key={item.q} className="trail-card overflow-hidden rounded-xl">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span className="font-semibold text-trail-ink">{item.q}</span>
                  <span className="shrink-0 text-trail-cyan">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen ? (
                  <div className="px-5 pb-4">
                    <p className="text-sm leading-relaxed text-trail-muted">
                      {item.a}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </Reveal>
      </PageContainer>
    </section>
  );
}
