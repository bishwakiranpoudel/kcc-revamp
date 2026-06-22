"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageContainer, SectionHeader } from "@/components/revamp/section-ui";

gsap.registerPlugin(ScrollTrigger);

const fit = [
  "You run 2–40 kennel or pet-care locations",
  "You already use Gingr, When I Work, or QuickBooks",
  "You rebuild the same spreadsheet every week",
  "You want managers held to numbers, not vibes",
];

const notFit = [
  "You run one location and like it that way",
  "You don't track labor or revenue at all",
  "You're shopping for a booking system (we read yours, not replace it)",
];

export function AudienceFit() {
  const sectionRef = useRef<HTMLElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const notFitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "top 18%",
          scrub: 1,
        },
      });

      // Two halves get "dealt" in from opposite sides and snap together with
      // a springy overshoot (back.out) for the wacky factor.
      tl.fromTo(
        fitRef.current,
        {
          xPercent: -55,
          rotation: -9,
          skewY: 6,
          opacity: 0,
          transformOrigin: "center center",
        },
        { xPercent: 0, rotation: 0, skewY: 0, opacity: 1, ease: "back.out(1.7)" },
        0,
      )
        .fromTo(
          notFitRef.current,
          {
            xPercent: 55,
            rotation: 9,
            skewY: -6,
            opacity: 0,
            transformOrigin: "center center",
          },
          { xPercent: 0, rotation: 0, skewY: 0, opacity: 1, ease: "back.out(1.7)" },
          0,
        )
        .fromTo(
          ".fit-item",
          { x: -32, opacity: 0 },
          { x: 0, opacity: 1, ease: "none", stagger: 0.08 },
          0.4,
        )
        .fromTo(
          ".fit-dot",
          { scale: 0 },
          { scale: 1, ease: "back.out(3)", stagger: 0.08 },
          0.45,
        )
        .fromTo(
          ".notfit-item",
          { x: 32, opacity: 0 },
          { x: 0, opacity: 1, ease: "none", stagger: 0.08 },
          0.48,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="audience"
      className="trail-section relative scroll-mt-[var(--header-h)] overflow-hidden py-[var(--section-py)]"
    >
      <PageContainer>
        <SectionHeader
          align="center"
          eyebrow="Is this you?"
          title="Built for owners juggling more than one location"
          description="We built KennelEyes for a specific operator — not for everyone. Here's how to tell if that's you."
        />

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:mt-12 md:grid-cols-5">
          <div
            ref={fitRef}
            className="rounded-3xl border border-trail-green/30 bg-trail-green/10 p-7 will-change-transform sm:p-8 md:col-span-3"
          >
            <p className="eyebrow text-trail-green">This is for you if</p>
            <p className="mt-1 text-xs text-trail-muted">
              KennelEyes pays for itself fast
            </p>
            <ul className="mt-6 space-y-3.5">
              {fit.map((item) => (
                <li
                  key={item}
                  className="fit-item flex items-start gap-3 text-sm font-medium text-trail-ink will-change-transform sm:text-[0.9375rem]"
                >
                  <span className="fit-dot mt-1 size-1.5 shrink-0 rounded-full bg-trail-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={notFitRef}
            className="trail-card rounded-3xl border border-trail-border p-7 will-change-transform sm:p-8 md:col-span-2"
          >
            <p className="eyebrow text-trail-muted">Probably not yet</p>
            <p className="mt-1 text-xs text-trail-faint">No hard feelings</p>
            <ul className="mt-6 space-y-3.5">
              {notFit.map((item) => (
                <li
                  key={item}
                  className="notfit-item flex items-start gap-3 text-sm text-trail-muted will-change-transform"
                >
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-trail-faint" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
