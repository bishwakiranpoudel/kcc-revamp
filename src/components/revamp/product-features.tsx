"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageContainer, SectionHeader } from "@/components/revamp/section-ui";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "See revenue before it lands",
    body: "Know what each location will book this week by service line — projected next to confirmed. No end-of-month surprises.",
  },
  {
    title: "Catch overstaffed days before payday",
    body: "Watch labor as a live % of revenue against your target. The morning a site drifts over, you see it — while you can still cut a shift.",
  },
  {
    title: "Fill kennels without overbooking",
    body: "Dogs in-house vs. capacity for every site, with trends that flag the days you're leaving money — or risk — on the table.",
  },
  {
    title: "Managers see only their branch",
    body: "You get the whole group. Each manager gets their location. Everyone sees the numbers they own — nothing more, nothing less.",
  },
  {
    title: "Updates while you watch",
    body: "Numbers refresh on their own as bookings, shifts, and invoices change. Open the screen and it's already current.",
  },
  {
    title: "Read-only and encrypted",
    body: "We connect with read-only access and encrypt everything in transit and at rest. KennelEyes can see your numbers, never touch them.",
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
            description="The things you check across five logins every morning — revenue, labor, occupancy, and profit — now on one screen for every location at once."
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
