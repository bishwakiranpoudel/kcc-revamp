"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { APP_URL } from "@/lib/site";
import { PageContainer } from "@/components/revamp/section-ui";
import { ArtIsolate, TopoBackdrop, TrailScene } from "@/components/revamp/trail-art";

gsap.registerPlugin(ScrollTrigger);

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const petRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(backRef.current, {
        y: -80,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(frontRef.current, {
        y: 60,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(petRef.current, {
        y: -24,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.fromTo(
        headlineRef.current,
        { letterSpacing: "0.04em", opacity: 0.5 },
        {
          letterSpacing: "0em",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            end: "top 48%",
            scrub: 1.2,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="trail-section relative overflow-hidden py-[var(--section-py)]"
    >
      <ArtIsolate>
        <TopoBackdrop opacity={0.14} />
        <div
          ref={petRef}
          className="absolute inset-x-0 bottom-0 h-[min(70%,30rem)] will-change-transform"
        >
          <TrailScene src="/graphics/dog-cta.png" position="bottom" opacity={0.45} />
        </div>
      </ArtIsolate>

      <div ref={backRef} className="section-wash-orange absolute inset-0 z-0 opacity-70" />
      <div ref={frontRef} className="section-wash-purple absolute inset-0 z-0 opacity-40" />

      <PageContainer className="relative z-10 text-center">
        <p className="eyebrow text-trail-orange">Get started</p>
        <h2
          ref={headlineRef}
          className="display-lg mx-auto mt-4 max-w-3xl"
        >
          See your real numbers this week
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-trail-muted sm:text-lg">
          Book a 30-minute demo. We&apos;ll connect your Gingr, When I Work, and
          QuickBooks accounts and put every location on one screen using your
          data — not a canned tour. No card. No commitment.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
          <Link href="/demo" className="btn-trail-primary">
            Book my demo
          </Link>
          <Link href="#demo" className="btn-trail-secondary">
            See the live dashboard
          </Link>
          <Link href={`${APP_URL}/login`} className="btn-trail-secondary">
            Log in
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-md text-xs text-trail-faint">
          From $149/mo per location · volume discounts for multi-site groups ·
          no setup fees
        </p>
      </PageContainer>
    </section>
  );
}
