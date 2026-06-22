import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

/** Current scroll offset — works with Lenis smooth scroll or native fallback. */
export function getScrollY() {
  return lenisInstance?.scroll ?? window.scrollY;
}

/** Subscribe to scroll position changes (Lenis or native). */
export function subscribeScroll(onScroll: () => void) {
  const lenis = lenisInstance;
  if (lenis) {
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

/** Stable scroll distance — avoids function-based tween end values that jitter on pin refresh. */
export function getScrollDistance() {
  return Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
}

/** Re-measure GSAP pins after images/fonts shift layout. */
export function refreshScrollTriggers() {
  if (typeof window === "undefined") return;
  import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
    ScrollTrigger.refresh();
  });
}
