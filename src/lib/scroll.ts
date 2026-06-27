/** Current scroll offset. */
export function getScrollY() {
  return window.scrollY;
}

/** Subscribe to scroll position changes. */
export function subscribeScroll(onScroll: () => void) {
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

/** Stable scroll distance. */
export function getScrollDistance() {
  return Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
}
