"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { APP_URL } from "@/lib/site";
import { PageContainer } from "@/components/revamp/section-ui";

gsap.registerPlugin(ScrollTrigger);

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

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

      gsap.fromTo(
        photoRef.current,
        { y: 40, scale: 1.06 },
        {
          y: -40,
          scale: 1.06,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );

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
      <div
        ref={photoRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/graphics/dog-cta-light.png"
          alt=""
          fill
          sizes="100vw"
          className="cta-photo object-cover object-bottom"
        />
      </div>

      <div ref={backRef} className="section-wash-orange absolute inset-0 z-0 opacity-80" />
      <div ref={frontRef} className="section-wash-purple absolute inset-0 z-0 opacity-50" />

      <PageContainer className="relative z-10 text-center">
        <p className="eyebrow text-trail-orange">Get started</p>
        <h2
          ref={headlineRef}
          className="display-lg mx-auto mt-4 max-w-3xl"
        >
          See your real numbers{" "}
          <span className="text-emph text-trail-orange">this week</span>
        </h2>
        <p className="lead mx-auto mt-5 max-w-lg text-trail-muted">
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
          <Link href={APP_URL} className="btn-trail-secondary">
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
