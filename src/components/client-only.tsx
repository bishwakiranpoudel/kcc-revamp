"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only after mount. Used to wrap Recharts ResponsiveContainer
 * so it never measures a zero-size box during static prerender (which logs
 * "width(-1)/height(-1)" warnings). The parent keeps a fixed height, so there's
 * no layout shift.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}
