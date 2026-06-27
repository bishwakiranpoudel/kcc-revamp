"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  stagger?: boolean;
  staggerEach?: number;
  delay?: number;
  /** Play on mount for above-the-fold content. */
  immediate?: boolean;
  start?: string;
};

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
}

/** One-time fade-up when the block first enters the viewport (or on mount). */
export function Reveal({
  children,
  as,
  className = "",
  y = 24,
  stagger = false,
  staggerEach = 0.1,
  delay = 0,
  immediate = false,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    if (immediate && delay === 0) {
      setVisible(true);
      return;
    }

    if (isInViewport(el)) {
      setVisible(true);
    }
  }, [immediate, delay]);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    if (immediate) {
      const timer = window.setTimeout(() => setVisible(true), delay * 1000);
      return () => window.clearTimeout(timer);
    }

    const show = () => setVisible(true);

    if (isInViewport(el)) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px 15% 0px" },
    );

    observer.observe(el);

    const onScroll = () => {
      if (isInViewport(el)) {
        show();
        observer.disconnect();
        window.removeEventListener("scroll", onScroll, { capture: true });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, [immediate, delay, visible]);

  const style = {
    "--reveal-y": `${y}px`,
    "--reveal-delay": `${delay}s`,
    "--reveal-stagger": `${staggerEach}s`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      className={`${stagger ? "reveal-stagger" : "reveal"} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
