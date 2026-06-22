import Image from "next/image";

/** Subtle paw-trail strip between trail sections. */
export function TrailDivider() {
  return (
    <div
      aria-hidden
      className="trail-dark pointer-events-none relative z-[1] -my-px bg-trail-bg py-6 sm:py-8"
    >
      <div className="page-container">
        <Image
          src="/graphics/paw-trail.png"
          alt=""
          width={1400}
          height={350}
          className="mx-auto h-10 w-full max-w-3xl object-contain opacity-70 mix-blend-screen sm:h-12"
        />
      </div>
    </div>
  );
}
