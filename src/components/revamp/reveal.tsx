"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  /** Element/tag to render. Defaults to a div. */
  as?: ElementType;
  className?: string;
  /** Vertical travel distance in px. */
  y?: number;
  /** Animate direct children in sequence instead of the wrapper as one block. */
  stagger?: boolean;
  /** Per-child stagger (seconds) when `stagger` is set. */
  staggerEach?: number;
  /** Initial delay before the reveal starts (seconds). */
  delay?: number;
  /** Viewport start position for the ScrollTrigger. */
  start?: string;
};

/**
 * Lightweight scroll-reveal: fades + lifts its content into place when it
 * scrolls into view. Runs in a layout effect so the from-state is set before
 * paint (no flash), reverts cleanly on unmount, and respects reduced motion.
 */
export function Reveal({
  children,
  as,
  className,
  y = 24,
  stagger = false,
  staggerEach = 0.12,
  delay = 0,
  start = "top 85%",
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets =
      stagger && el.children.length ? Array.from(el.children) : el;

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // If the element is already in (or above) the viewport on mount, play
      // immediately instead of attaching a ScrollTrigger. Otherwise above-the-fold
      // content can stay stuck at opacity:0 until the user happens to scroll.
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.9;

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay,
          stagger: stagger ? staggerEach : 0,
          // Kill any half-finished tween on these targets (e.g. React StrictMode's
          // double-mount in dev) so they can't freeze at a partial opacity.
          overwrite: true,
          // Clear the inline transform once revealed so hover lifts and layout
          // transforms (e.g. the featured tier's offset) aren't overridden.
          clearProps: "transform",
          scrollTrigger: inView ? undefined : { trigger: el, start, once: true },
        },
      );
    }, ref);

    return () => {
      ctx.revert();
      // Safety net: never leave content invisible if a tween was interrupted.
      gsap.set(targets, { clearProps: "opacity,transform" });
    };
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
