"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Re-measure ScrollTriggers after the page finishes laying out. */
export function ScrollTriggerRefresh() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const refresh = () => ScrollTrigger.refresh();

    const t1 = window.setTimeout(refresh, 200);
    const t2 = window.setTimeout(refresh, 800);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}
