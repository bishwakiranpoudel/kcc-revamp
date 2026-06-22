"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { APP_URL, NAV_LINKS } from "@/lib/site";
import { getScrollY, subscribeScroll } from "@/lib/scroll";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [onDemo, setOnDemo] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = getScrollY() > 24;
    setScrolled(last);

    const onScroll = () => {
      const next = getScrollY() > 24;
      if (next !== last) {
        last = next;
        setScrolled(next);
      }
    };

    const unsubScroll = subscribeScroll(onScroll);

    const demoZone = document.querySelector(".demo-zone");
    let observer: IntersectionObserver | undefined;
    if (demoZone) {
      observer = new IntersectionObserver(
        ([entry]) => setOnDemo(entry.isIntersecting),
        { threshold: 0.08 },
      );
      observer.observe(demoZone);
    }

    return () => {
      unsubScroll();
      observer?.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 z-50 flex justify-center px-[var(--page-px)] transition-all duration-300 ${
        scrolled ? "top-3" : "top-4 sm:top-5"
      }`}
    >
      <div
        className={`flex w-full max-w-[var(--page-max)] items-center justify-between rounded-full px-4 py-2.5 transition-colors sm:px-5 sm:py-3 ${
          onDemo || scrolled
            ? "border border-line bg-surface/90 shadow-lg shadow-navy-900/10 backdrop-blur-md"
            : "glass-pill"
        }`}
      >
        <Link
          href="/"
          className={`font-display text-lg font-extrabold tracking-tight ${
            onDemo ? "text-ink" : "text-trail-ink"
          }`}
        >
          Kennel<span className="text-trail-orange">Eyes</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                onDemo
                  ? "text-ink-muted hover:text-ink"
                  : "text-trail-muted hover:text-trail-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={APP_URL}
            className={`text-sm transition-colors ${
              onDemo
                ? "text-ink-muted hover:text-ink"
                : "text-trail-muted hover:text-trail-ink"
            }`}
          >
            Log in
          </Link>
          <Link
            href="/demo"
            className={`rounded-full px-5 py-2 text-sm font-bold transition-transform hover:scale-105 ${
              onDemo
                ? "bg-signal-strong text-white"
                : "bg-trail-cyan text-white"
            }`}
          >
            Book a demo
          </Link>
        </div>

        <button
          type="button"
          aria-label="Menu"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-6 ${onDemo ? "bg-ink" : "bg-trail-ink"}`} />
          <span className={`h-0.5 w-4 ${onDemo ? "bg-ink" : "bg-trail-ink"}`} />
        </button>
      </div>

      {open && (
        <div
          className={`absolute inset-x-4 top-[calc(100%+0.5rem)] rounded-3xl p-4 md:hidden ${
            onDemo ? "border border-line bg-surface shadow-lg" : "glass-pill"
          }`}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-3 py-2.5 text-sm ${
                onDemo ? "text-ink hover:bg-paper" : "hover:bg-trail-surface"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
