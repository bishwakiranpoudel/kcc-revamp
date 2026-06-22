"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.config({ nullTargetWarn: false });
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (reduced) {
      const refresh = () => ScrollTrigger.refresh();
      refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);
      return () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: true,
      anchors: true,
    });

    setLenis(lenis);

    // Lenis drives the *native* window scroll, so ScrollTrigger reads it
    // directly — no scrollerProxy. We only keep the two in lockstep:
    // update ScrollTrigger on every Lenis scroll, and drive Lenis from
    // GSAP's ticker so pin/scrub timelines share one animation clock.
    lenis.on("scroll", ScrollTrigger.update);

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 100);
    const refreshTimer2 = window.setTimeout(refresh, 600);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.clearTimeout(refreshTimer);
      window.clearTimeout(refreshTimer2);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return <>{children}</>;
}
