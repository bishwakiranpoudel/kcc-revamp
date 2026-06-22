"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageContainer, SectionHeader } from "@/components/revamp/section-ui";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Revenue by business line, the accurate way",
    body: "Boarding, daycare, grooming — measured by the revenue the dogs in your care actually generated, not just payments collected. See a single day or analyze the trend.",
  },
  {
    title: "Know exactly how full every kennel is",
    body: "Track occupancy and capacity utilization over any time period and spot the trends. Are you overbooking, or do you have room to grow?",
  },
  {
    title: "Dogs per labor hour — the metric you'll wish you had sooner",
    body: "Likely a new number for you: how many dogs are you caring for per employee hour worked? It quietly decides your margins, and now you can watch it.",
  },
  {
    title: "Match staffing to the dogs in the building",
    body: "See how labor hours move with the number of dogs in-house, and where scheduled hours drift from hours actually worked — then adjust before it costs you.",
  },
  {
    title: "Payroll as a % of revenue — your make-or-break number",
    body: "The one benchmark that's often the difference between success and failure. We pair true revenue with real payroll — hours, rates, and taxes — so the percentage is honest.",
  },
  {
    title: "See next week's payroll before it happens",
    body: "Upcoming reservations next to your staffing plan for the next 1–2 weeks. Overstaffed? Cut hours early. Understaffed? Add shifts before the last-minute bind.",
  },
];

export function ProductFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];

      cards.forEach((card, i) => {
        gsap.set(card, {
          opacity: 0,
          y: 56,
          x: i % 2 === 0 ? -20 : 20,
          scale: 0.94,
        });
      });

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=260%",
              pin: true,
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          const slot = 1 / (cards.length + 0.5);

          cards.forEach((card, i) => {
            tl.to(
              card,
              {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                ease: "none",
                duration: slot * 0.85,
              },
              slot * i + 0.08,
            );
          });

          tl.to(
            headerRef.current,
            { opacity: 0.45, y: -16, ease: "none", duration: slot * 2 },
            slot * 2,
          );
        },

        "(max-width: 767px)": () => {
          gsap.set(cards, { opacity: 1, y: 0, x: 0, scale: 1 });

          cards.forEach((card, i) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 40, x: i % 2 === 0 ? -16 : 16, scale: 0.96 },
              {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                scrollTrigger: {
                  trigger: card,
                  start: "top 92%",
                  end: "top 70%",
                  scrub: 1,
                },
              },
            );
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="trail-section relative scroll-mt-[var(--header-h)] overflow-hidden"
    >
      <div className="section-wash-purple absolute inset-0 z-0 opacity-70" />

      <PageContainer className="flex min-h-[min(100svh,800px)] flex-col justify-center py-12 md:min-h-screen md:py-0 md:pt-[calc(var(--header-h)+1rem)] md:pb-10">
        <div ref={headerRef}>
          <SectionHeader
            align="center"
            eyebrow="What you get"
            title="Every number you chase, in one place"
            description="The things you check across five logins every morning — revenue, payroll, occupancy, and profit — now on one screen for every location at once."
          />
        </div>

        <div className="mx-auto mt-7 w-full max-w-5xl overflow-hidden rounded-3xl border border-trail-border sm:mt-9">
          <div className="grid gap-px bg-trail-border sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature, i) => (
              <article
                key={feature.title}
                className="feature-card bg-trail-surface-strong p-5 sm:p-6"
              >
                <div
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="will-change-transform"
                >
                  <span className="font-mono text-[0.6875rem] text-trail-orange">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="heading-card mt-2 text-trail-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-trail-muted">
                    {feature.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-trail-faint md:hidden">
          Scroll — cards reveal one by one
        </p>
      </PageContainer>
    </section>
  );
}
