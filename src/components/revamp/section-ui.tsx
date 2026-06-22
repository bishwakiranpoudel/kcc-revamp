import type { ReactNode } from "react";
import Image from "next/image";
import { INTEGRATION_LOGOS } from "@/lib/site";

/**
 * Brand logo rendered as a consistent white "app icon" badge so the differing
 * source backgrounds (white / green / transparent) read uniformly on dark UI.
 */
export function BrandLogo({
  name,
  size = 36,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const src = INTEGRATION_LOGOS[name];
  if (!src) return null;
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={`${name} logo`}
        width={size * 2}
        height={size * 2}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

export function PageContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`page-container ${className}`.trim()}>{children}</div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  const titleColor = tone === "light" ? "text-ink" : "text-trail-ink";
  const descColor =
    tone === "light" ? "text-ink-muted" : "text-trail-muted";

  const eyebrowColor =
    tone === "light" ? "text-data-scheduled" : "text-trail-cyan";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      <p className={`eyebrow ${eyebrowColor}`}>{eyebrow}</p>
      <h2 className={`display-lg mt-4 ${titleColor}`}>{title}</h2>
      {description ? (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${descColor} ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
