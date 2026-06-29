"use client";

import Link from "next/link";
import Image from "next/image";
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

  // Top of the hero = normal full-width navbar; once scrolled (or over the
  // demo zone) it condenses into a floating bar with a medium radius.
  const floating = scrolled || onDemo;

  const inner = (
    <>
      <Link href="/" aria-label="KennelEyes home" className="flex items-center gap-2">
        <Image
          src="/logo/logo_eye.png?v=2"
          alt=""
          width={48}
          height={27}
          priority
          className="h-7 w-auto"
        />
        <span
          className={`font-display text-lg font-extrabold tracking-tight ${
            onDemo ? "text-ink" : "text-trail-ink"
          }`}
        >
          Kennel<span className="text-trail-cyan">Eyes</span>
        </span>
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
          className={`rounded-md px-5 py-2 text-sm font-bold transition-colors ${
            onDemo
              ? "bg-trail-cyan text-white hover:bg-[color:var(--accent-strong)]"
              : "bg-trail-cyan text-white hover:bg-[color:var(--accent-strong)]"
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
    </>
  );

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-300 ${
        floating ? "top-3 px-[var(--page-px)]" : "top-0"
      }`}
    >
      {floating ? (
        <div className="mx-auto flex w-full max-w-[var(--page-max)] items-center justify-between rounded-md bg-surface/95 px-4 py-2.5 shadow-[var(--shadow-md)] backdrop-blur-md sm:px-5 sm:py-3">
          {inner}
        </div>
      ) : (
        <div className="w-full border-b border-[color:var(--border-hairline)] bg-surface">
          <div className="mx-auto flex w-full max-w-[var(--page-max)] items-center justify-between px-[var(--page-px)] py-3.5">
            {inner}
          </div>
        </div>
      )}

      {open && (
        <div
          className={`absolute inset-x-4 top-[calc(100%+0.5rem)] rounded-3xl p-4 md:hidden ${
            onDemo ? "bg-surface" : "glass-pill"
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
