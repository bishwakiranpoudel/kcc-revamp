"use client";

import { useEffect, useRef } from "react";
import { DashboardDemo } from "@/components/demo/dashboard-demo";
import { QuickbooksDemo } from "@/components/demo/quickbooks-demo";
import Link from "next/link";
import { MIcon } from "@/components/m-icon";
import { SectionHeader } from "@/components/revamp/section-ui";

const dashboardHighlights = [
  "Revenue by service line — boarding, daycare, grooming",
  "Payroll as a live % of revenue vs. your target",
  "Occupancy and capacity for every site",
  "Roll-up across all locations or drill into one",
];

export function DemoSections() {
  const zoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.body;

    const observer = new IntersectionObserver(
      ([entry]) => {
        body.classList.toggle("demo-active", entry.isIntersecting);
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.05 },
    );

    if (zoneRef.current) observer.observe(zoneRef.current);

    return () => {
      observer.disconnect();
      body.classList.remove("demo-active");
    };
  }, []);

  return (
    <div ref={zoneRef} className="demo-zone">
      <section id="demo" className="scroll-mt-[var(--header-h)] py-[var(--section-py)]">
        <div className="page-container">
          <SectionHeader
            align="center"
            tone="light"
            eyebrow="Live demo"
            title="Mission Control — the dashboard you'd open every morning"
            description="Not a screenshot. A working build of KennelEyes. Switch locations and date ranges; every chart responds like the real app."
          />

          <ul className="mx-auto mt-8 grid max-w-3xl gap-2.5 sm:grid-cols-2 sm:gap-3">
            {dashboardHighlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-line bg-surface px-4 py-3 text-left text-sm text-ink-muted"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-data-revenue" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="demo-container mt-10 sm:mt-12">
          <DashboardDemo />
        </div>
      </section>

      <section id="financials" className="scroll-mt-[var(--header-h)] py-[var(--section-py)]">
        <div className="page-container">
          <SectionHeader
            align="center"
            tone="light"
            eyebrow="Profit & loss"
            title="Your QuickBooks P&L, already read for you"
            description="Revenue by line, payroll as a share of revenue, operating and net income — the same charts from the app, pulled straight from QuickBooks Online."
          />
        </div>
        <div className="demo-container mt-10 sm:mt-12">
          <QuickbooksDemo />
        </div>

        <div className="page-container mt-10 sm:mt-12">
          <div className="light-card flex flex-col items-center justify-between gap-5 rounded-2xl px-6 py-7 sm:flex-row sm:gap-8 sm:px-8 sm:py-8">
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-ink sm:text-xl">
                That&apos;s your data — not a canned tour.
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                Connect your tools and these screens fill with real numbers in
                under 10 minutes.
              </p>
            </div>
            <Link href="/demo" className="btn-product-primary shrink-0">
              Book a demo
              <MIcon name="arrow_forward" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
