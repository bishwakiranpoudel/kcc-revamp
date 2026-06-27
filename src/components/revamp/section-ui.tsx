import type { ReactNode } from "react";
import Image from "next/image";
import { INTEGRATION_LOGOS, type SoftwareItem } from "@/lib/site";

const ACCENT_CLASS: Record<SoftwareItem["accent"], string> = {
  orange: "bg-trail-orange/12 text-trail-orange",
  cyan: "bg-trail-cyan/12 text-trail-cyan",
  green: "bg-trail-green/12 text-trail-green",
};

/**
 * Generic software category badge (kennel / scheduling / financial).
 * Optional QuickBooks logo when `logoKey` is set (financial software only).
 */
export function SoftwareBadge({
  item,
  size = 36,
  className = "",
  showLabel = false,
}: {
  item: SoftwareItem;
  size?: number;
  className?: string;
  showLabel?: boolean;
}) {
  const logoSrc = item.id === "financial" ? INTEGRATION_LOGOS.QuickBooks : undefined;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <span
        className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl font-display text-sm font-extrabold ${ACCENT_CLASS[item.accent]}`}
        style={{ width: size, height: size }}
      >
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt=""
            width={size}
            height={size}
            className="h-[70%] w-[70%] object-contain"
          />
        ) : (
          item.abbr
        )}
      </span>
      {showLabel ? (
        <span className="min-w-0 text-left">
          <span className="font-display block text-sm font-bold text-trail-ink">
            {item.label}
          </span>
          {"note" in item && item.note ? (
            <span className="eyebrow block !text-[0.5rem] text-trail-faint">
              {item.note}
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}

/** @deprecated Prefer SoftwareBadge for marketing surfaces. */
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
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ${className}`.trim()}
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
      <h2 className={`display-lg mt-3.5 ${titleColor}`}>{title}</h2>
      {description ? (
        <p className={`lead mt-5 max-w-2xl ${descColor} ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
