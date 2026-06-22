"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BrandLogo,
  PageContainer,
  SectionHeader,
} from "@/components/revamp/section-ui";
import { MIcon } from "@/components/m-icon";
import {
  ArtIsolate,
  ChaosBurst,
  PetSilhouette,
  TopoBackdrop,
  TrailScene,
} from "@/components/revamp/trail-art";

gsap.registerPlugin(ScrollTrigger);

const shards = [
  { label: "Gingr", x: "-22vw", y: "-14vh", rot: -12 },
  { label: "When I Work", x: "20vw", y: "-16vh", rot: 10 },
  { label: "QuickBooks", x: "-24vw", y: "6vh", rot: 7 },
  { label: "Spreadsheet", x: "26vw", y: "8vh", rot: -8, icon: "table" },
  { label: "Payroll %", x: "-14vw", y: "22vh", rot: 5, icon: "payments" },
  { label: "Occupancy", x: "16vw", y: "24vh", rot: -10, icon: "pets" },
];

export function ChaosCollide() {
  const sectionRef = useRef<HTMLElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;

      const shardTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          end: "center center",
          scrub: 1.4,
        },
      });

      gsap.utils.toArray<HTMLElement>(".chaos-shard").forEach((el) => {
        shardTl.fromTo(
          el,
          {
            x: el.dataset.x ?? "0",
            y: el.dataset.y ?? "0",
            rotation: Number(el.dataset.rot ?? 0),
            scale: 1,
            opacity: 1,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 0.4,
            opacity: 0,
            ease: "none",
          },
          0,
        );
      });

      gsap.fromTo(
        coreRef.current,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "center 75%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".chaos-burst",
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 62%",
            end: "center center",
            scrub: 1.2,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[120vh] items-center overflow-hidden bg-trail-bg py-[var(--section-py)]"
    >
      <ArtIsolate>
        <TopoBackdrop opacity={0.16} />
        <TrailScene
          src="/graphics/dog-chaos.png"
          position="center"
          opacity={0.32}
          className="!object-contain"
        />
      </ArtIsolate>

      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <ChaosBurst className="chaos-burst" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        {shards.map((s) => (
          <div
            key={s.label}
            className="chaos-shard trail-card-strong absolute flex items-center gap-2 rounded-xl px-3.5 py-2.5 will-change-transform"
            data-x={s.x}
            data-y={s.y}
            data-rot={s.rot}
          >
            {"icon" in s && s.icon ? (
              <MIcon name={s.icon} size={16} className="text-trail-cyan/80" />
            ) : (
              <BrandLogo name={s.label} size={20} />
            )}
            <span className="font-mono text-[0.625rem] tracking-widest text-trail-muted uppercase">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <PageContainer>
        <div ref={coreRef} className="relative z-20 mx-auto max-w-2xl text-center">
          <PetSilhouette
            variant="chaos"
            className="mx-auto mb-6 w-20 opacity-40 sm:hidden"
          />
          <SectionHeader
            align="center"
            eyebrow="The problem"
            title={
              <>
                Five logins. Zero{" "}
                <span className="text-gradient-trail">single answer.</span>
              </>
            }
            description="Gingr for bookings. When I Work for labor. QuickBooks for profit. Plus the spreadsheet you rebuild every Monday — none of them talk to each other."
          />
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-trail-cyan sm:text-lg">
            KennelEyes reads all of them and puts revenue, labor, occupancy, and
            profit for every location on one live screen.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
