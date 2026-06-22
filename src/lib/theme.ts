/**
 * Design tokens — single source of truth for JS/TS consumers.
 * CSS variables in globals.css mirror these values.
 */
export const theme = {
  trail: {
    bg: "#050505",
    bgDeep: "#030712",
    bgRace: "#0a1628",
    bgOrbit: "#070707",
    ink: "#f5f0e6",
    muted: "#a89f8f",
    orange: "#f97316",
    green: "#4ade80",
    cream: "#f5e6c8",
    cyan: "#22d3ee",
    purple: "#c084fc",
  },
  product: {
    paper: "#f4f6f9",
    surface: "#ffffff",
    ink: "#0f172a",
    inkMuted: "#475569",
    signal: "#00a3ff",
  },
  analytics: {
    revenue: "#059669",
    boarding: "#9333ea",
    daycare: "#2563eb",
    labor: "#d97706",
    scheduled: "#0e7490",
    danger: "#e11d48",
  },
} as const;

export type Theme = typeof theme;
