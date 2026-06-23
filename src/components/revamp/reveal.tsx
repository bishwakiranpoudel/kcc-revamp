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
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.7,
        ease: "power3.out",
        delay,
        stagger: stagger ? staggerEach : 0,
        // Clear the inline transform once revealed so hover lifts and layout
        // transforms (e.g. the featured tier's offset) aren't overridden.
        clearProps: "transform",
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
