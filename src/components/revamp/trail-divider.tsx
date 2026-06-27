/** Thin connector between chaos and summit — same valley surface, no extra black slab. */
export function TrailDivider() {
  return (
    <div
      aria-hidden
      className="trail-dark relative z-[1] -my-px bg-trail-bg-deep py-4 sm:py-5"
    >
      <div className="page-container flex justify-center">
        <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
}
