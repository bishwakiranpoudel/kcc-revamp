import type { CSSProperties } from "react";

/** Material Symbols Outlined glyph (matches the command-center mockup). */
export function MIcon({
  name,
  className = "",
  filled = false,
  size,
}: {
  name: string;
  className?: string;
  filled?: boolean;
  size?: number;
}) {
  const style: CSSProperties | undefined = size
    ? { fontSize: size }
    : undefined;
  return (
    <span
      aria-hidden
      style={style}
      className={`material-symbols-outlined ${filled ? "ms-fill" : ""} ${className}`}
    >
      {name}
    </span>
  );
}
