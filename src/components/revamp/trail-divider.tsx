import Image from "next/image";

/** Subtle paw-trail strip between trail sections. */
export function TrailDivider() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-[1] -my-1 py-3 opacity-40 sm:py-4 sm:opacity-50"
    >
      <div className="page-container">
        <Image
          src="/graphics/paw-trail.png"
          alt=""
          width={1400}
          height={350}
          className="mx-auto h-10 w-full max-w-3xl object-contain sm:h-12"
        />
      </div>
    </div>
  );
}
