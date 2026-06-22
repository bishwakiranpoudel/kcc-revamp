import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

/** Keeps blend-mode art contained inside a section/pin target. */
export function ArtIsolate({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 isolate overflow-hidden ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function TopoBackdrop({ opacity = 0.22 }: { opacity?: number }) {
  return (
    <div
      className="topo-wash absolute inset-0"
      style={{ opacity, mixBlendMode: "soft-light" }}
    />
  );
}

export function OrbitBackdrop({ opacity = 0.35 }: { opacity?: number }) {
  return (
    <div
      className="orbit-wash absolute inset-0"
      style={{ opacity, mixBlendMode: "screen" }}
    />
  );
}

export function DataRangeBackdrop({ opacity = 0.42 }: { opacity?: number }) {
  return (
    <div
      className="data-range-wash absolute inset-x-0 bottom-0 h-[min(55%,28rem)]"
      style={{ opacity, mixBlendMode: "soft-light" }}
    />
  );
}

/** CSS-processed PNG pet — lighten blend on dark trail backgrounds only. */
export function TrailPetImage({
  src,
  alt = "",
  width,
  height,
  className = "",
  style,
  priority = false,
}: {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`trail-pet-image select-none ${className}`.trim()}
      style={style}
    />
  );
}

/** Full-bleed cinematic scene PNG (dog + landscape). Dark edges fade into the section. */
export function TrailScene({
  src,
  position = "bottom",
  opacity = 0.5,
  className = "",
  priority = false,
}: {
  src: string;
  position?: "bottom" | "center";
  opacity?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="100vw"
      priority={priority}
      className={`trail-scene ${
        position === "bottom" ? "object-bottom" : "object-center"
      } object-cover ${className}`.trim()}
      style={{ opacity }}
    />
  );
}

/** Coded dog silhouette — no raster, pin-safe. */
export function PetSilhouette({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "chaos" | "summit" | "cta";
  className?: string;
}) {
  const poses: Record<
    typeof variant,
    { viewBox: string; path: string; flip?: boolean; scale?: number }
  > = {
    hero: {
      viewBox: "0 0 120 80",
      path: "M18 58c0-14 8-26 22-30 4-8 12-14 24-14 10 0 18 6 22 14 14 4 22 16 22 30v6H18v-6zm28-38c-6 0-10 4-12 10 8 2 14 8 16 16 6-2 10-8 10-14 0-7-6-12-14-12zm-8 34c4 3 10 5 16 5s12-2 16-5c-2 4-8 7-16 7s-14-3-16-7z",
    },
    chaos: {
      viewBox: "0 0 100 70",
      path: "M12 48c2-12 10-22 22-26 3-7 10-12 20-12 8 0 14 4 18 10 10 4 16 12 18 22l-6 4c-2-8-8-14-16-16-4 6-10 10-18 10-8 0-14-4-18-10-6 2-10 8-12 14l-8-2zm30-30c-5 0-8 3-10 8 6 1 11 5 13 11 5-2 8-6 8-11 0-5-5-8-11-8z",
      flip: true,
    },
    summit: {
      viewBox: "0 0 90 60",
      path: "M10 42c0-10 6-18 16-22 2-6 8-10 16-10 7 0 12 4 15 9 8 4 13 12 13 22v3H10v-3zm22-26c-4 0-7 2-9 6 5 1 9 5 10 10 4-2 7-5 7-9 0-4-4-7-8-7z",
      scale: 0.9,
    },
    cta: {
      viewBox: "0 0 110 75",
      path: "M14 52c0-12 7-22 18-26 3-7 9-12 18-12 9 0 16 5 19 12 11 4 18 14 18 26v5H14v-5zm26-32c-5 0-9 3-11 8 7 2 12 7 14 13 5-2 9-6 9-11 0-6-5-10-12-10z",
    },
  };

  const pose = poses[variant];

  return (
    <svg
      viewBox={pose.viewBox}
      aria-hidden
      className={`pet-silhouette ${className}`.trim()}
      style={pose.flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <defs>
        <linearGradient id={`pet-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--trail-orange)" stopOpacity="0.85" />
          <stop offset="55%" stopColor="var(--trail-cream)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--trail-cyan)" stopOpacity="0.55" />
        </linearGradient>
        <filter id={`pet-glow-${variant}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={pose.path}
        fill={`url(#pet-grad-${variant})`}
        filter={`url(#pet-glow-${variant})`}
      />
    </svg>
  );
}

/** Radial burst when chaos shards converge — pure SVG. */
export function ChaosBurst({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      className={`chaos-burst ${className}`.trim()}
    >
      <defs>
        <radialGradient id="chaos-burst-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--trail-cyan)" stopOpacity="0.35" />
          <stop offset="45%" stopColor="var(--trail-orange)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[0, 45, 90, 135].map((deg) => (
        <line
          key={deg}
          x1="100"
          y1="100"
          x2="100"
          y2="28"
          stroke="var(--trail-cyan)"
          strokeOpacity="0.18"
          strokeWidth="1.5"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="72" fill="url(#chaos-burst-grad)" />
      <circle
        cx="100"
        cy="100"
        r="36"
        fill="none"
        stroke="var(--trail-cyan)"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
    </svg>
  );
}

/** Mountain stack for summit portal — CSS-filtered layers, no layout shift. */
export function SummitMountain({
  onReady,
}: {
  onReady?: () => void;
}) {
  return (
    <div className="relative w-full max-w-6xl">
      <Image
        src="/graphics/transition.png"
        alt=""
        width={1800}
        height={700}
        priority
        className="trail-mountain-main relative w-full object-contain object-bottom"
        onLoad={onReady}
      />
    </div>
  );
}
