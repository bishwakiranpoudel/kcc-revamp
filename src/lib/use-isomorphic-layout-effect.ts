import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect` on the client, `useEffect` on the server (to avoid the SSR
 * warning). GSAP/ScrollTrigger setups must run in a layout effect so their
 * cleanup (reverting pins + pin-spacer wrappers) runs synchronously during the
 * commit's mutation phase — before React removes the pinned nodes on route
 * change. Using a passive `useEffect` cleanup runs too late and crashes unmount
 * with "removeChild: node to be removed is not a child of this node".
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
