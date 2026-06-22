"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BrandLogo,
  PageContainer,
  SectionHeader,
} from "@/components/revamp/section-ui";
import {
  ArtIsolate,
  TopoBackdrop,
  TrailScene,
} from "@/components/revamp/trail-art";
import { SectionSeam } from "@/components/revamp/section-seam";
import { INTEGRATIONS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

// How far the electrons travel around the nucleus across the full scroll pass.
const TURNS = 0.85;
const TWO_PI = Math.PI * 2;

export function ChaosCollide() {
  const sectionRef = useRef<HTMLElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const atomRef = useRef<HTMLDivElement>(null);
  const electronRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const electrons = electronRefs.current.filter(Boolean) as HTMLDivElement[];
    const count = electrons.length;
    const atom = atomRef.current;

    // Each electron rides a flat ellipse, rotated so the three orbits cross at
    // the nucleus like an atom symbol. Radii are derived from the live box.
    let rx = 0;
    let ry = 0;
    const measure = () => {
      const w = atom?.clientWidth ?? 0;
      rx = w * 0.46;
      ry = w * 0.32;
    };

    const place = (t: number) => {
      electrons.forEach((el, k) => {
        const phase = (k / count) * TWO_PI;
        const tilt = (k / count) * Math.PI; // 0° / 60° / 120° for 3 orbits
        const theta = phase + t * TWO_PI * TURNS;
        const xp = Math.cos(theta) * rx;
        const yp = Math.sin(theta) * ry;
        const x = xp * Math.cos(tilt) - yp * Math.sin(tilt);
        const y = xp * Math.sin(tilt) + yp * Math.cos(tilt);
        const depth = (Math.sin(theta) + 1) / 2; // 0 = far side, 1 = near side
        gsap.set(el, {
          x,
          y,
          scale: 0.74 + depth * 0.36,
          opacity: 0.45 + depth * 0.55,
          zIndex: depth > 0.5 ? 2 : 0,
        });
      });
    };

    gsap.set(electrons, { transformOrigin: "0 0" });
    measure();
    place(0);

    const orbit = { t: 0 };
    const onResize = () => {
      measure();
      place(orbit.t);
    };
    window.addEventListener("resize", onResize);

    let ctx: gsap.Context | undefined;
    if (!reduced) {
      ctx = gsap.context(() => {
        const section = sectionRef.current!;

        // Wacky ridge seam: parallax the two ridge layers in opposite
        // directions as you descend into the dark valley.
        const seamScrub = {
          trigger: section,
          start: "top bottom",
          end: "top top",
          scrub: 1,
        } as const;
        gsap.fromTo(
          ".valley-seam-back",
          { xPercent: -4 },
          { xPercent: 4, ease: "none", scrollTrigger: seamScrub },
        );
        gsap.fromTo(
          ".valley-seam-front-group",
          { xPercent: 3, yPercent: -8 },
          { xPercent: -3, yPercent: 0, ease: "none", scrollTrigger: seamScrub },
        );

        // The nucleus settles in as the section centers.
        gsap.fromTo(
          coreRef.current,
          { scale: 0.94, opacity: 0 },
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

        // Electrons revolve around the nucleus as you scroll through.
        gsap.to(orbit, {
          t: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onRefresh: () => {
              measure();
              place(orbit.t);
            },
          },
          onUpdate: () => place(orbit.t),
        });
      }, sectionRef);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="trail-dark relative flex min-h-screen items-center overflow-hidden bg-trail-bg py-[var(--section-py)]"
    >
      <SectionSeam />

      <ArtIsolate>
        <TopoBackdrop opacity={0.14} />
        <TrailScene
          src="/graphics/dog-chaos.png"
          position="center"
          opacity={0.34}
          className="!object-contain"
        />
      </ArtIsolate>

      {/* Atom: integration logos orbit the nucleus (the text) like electrons. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div ref={atomRef} className="relative aspect-square w-[min(760px,92vw)]">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 size-2/5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--trail-cyan) 20%, transparent), transparent 70%)",
              filter: "blur(34px)",
            }}
          />
          {INTEGRATIONS.map((_, k) => (
            <span
              key={k}
              aria-hidden
              className="absolute left-1/2 top-1/2 rounded-[50%] border border-dashed border-trail-border/30"
              style={{
                width: "92%",
                height: "64%",
                transform: `translate(-50%, -50%) rotate(${(k / INTEGRATIONS.length) * 180}deg)`,
              }}
            />
          ))}
          {INTEGRATIONS.map((name, k) => (
            <div
              key={name}
              ref={(el) => {
                electronRefs.current[k] = el;
              }}
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{ opacity: 0 }}
            >
              <div className="-translate-x-1/2 -translate-y-1/2">
                <div className="rounded-2xl border border-trail-cyan/25 bg-trail-surface-strong p-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur-sm">
                  <BrandLogo name={name} size={34} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PageContainer>
        <div ref={coreRef} className="relative z-20 mx-auto max-w-2xl text-center">
          <SectionHeader
            align="center"
            eyebrow="The problem"
            title={
              <>
                Five logins. Zero{" "}
                <span className="text-gradient-trail text-emph">
                  single answer.
                </span>
              </>
            }
            description="Gingr for bookings. When I Work for labor. QuickBooks for profit. Plus the spreadsheet you rebuild every Monday — none of them talk to each other."
          />
          <p className="lead mx-auto mt-6 max-w-lg text-trail-cyan">
            KennelEyes reads all of them and puts revenue, labor, occupancy, and
            profit for every location on one live screen.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
