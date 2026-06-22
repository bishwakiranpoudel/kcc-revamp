"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageContainer, SectionHeader } from "@/components/revamp/section-ui";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "Will this mess with my Gingr or QuickBooks data?",
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
    q: "Do I have to switch off Gingr or my POS?",
    a: "Never. KennelEyes sits on top of what you already run. It reads your tools to build one clear picture — your booking and scheduling systems stay exactly where they are.",
  },
  {
    q: "What's it going to cost me?",
    a: "You pay by how many locations you run — from $149/mo for a single site, with volume discounts for multi-site operators. No setup fees, no add-ons. Book a demo and we'll size a plan to your group.",
  },
];

export function FaqAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openCount, setOpenCount] = useState(1);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let lastCount = 1;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        end: "bottom 35%",
        scrub: 1,
        onUpdate: (self) => {
          const count = Math.max(1, Math.ceil(self.progress * faqs.length));
          if (count !== lastCount) {
            lastCount = count;
            setOpenCount(count);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="trail-section scroll-mt-[var(--header-h)] py-[var(--section-py)]"
    >
      <PageContainer>
        <SectionHeader
          align="center"
          eyebrow="Before you ask"
          title="The questions every owner asks us"
          description="Straight answers. If yours isn't here, ask us on the demo — we'll tell you the truth."
        />

        <div className="mx-auto mt-10 max-w-2xl space-y-2.5 sm:mt-12">
          {faqs.map((item, i) => {
            const isOpen = i < openCount;
            return (
              <div key={item.q} className="trail-card overflow-hidden rounded-2xl">
                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <span className="font-semibold text-trail-ink">{item.q}</span>
                  <span className="shrink-0 text-trail-cyan">{isOpen ? "−" : "+"}</span>
                </div>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-trail-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
