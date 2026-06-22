/**
 * Jagged "ridge" seam for a light → dark section boundary.
 *
 * Renders inside the top of the DARK section. The sky-colored ridge continues
 * the light section above, then breaks into angular peaks that drop into the
 * dark valley below — with a glowing cyan crest, a parallax back ridge, and a
 * few floating shards. Drift parallax is driven by the host section's GSAP
 * context (selectors `.valley-seam-back` / `.valley-seam-front-group`).
 */
export function SectionSeam({
  skyColor = "#f3ede2",
  midColor = "#e7dcc9",
  className = "",
}: {
  skyColor?: string;
  midColor?: string;
  className?: string;
}) {
  // Front ridge crest vertices (shared by the fill path and the glow line).
  const crest =
    "0,72 120,34 250,98 380,48 520,112 660,58 800,104 940,40 1070,96 1210,52 1340,104 1440,58";

  return (
    <div
      aria-hidden
      className={`valley-seam pointer-events-none absolute inset-x-0 top-0 z-[6] h-[clamp(58px,9vw,128px)] ${className}`.trim()}
    >
      {/* Back ridge — distant, drifts more for depth */}
      <svg
        className="valley-seam-back absolute inset-0 -left-[10%] h-full w-[120%]"
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 H1440 V70 L1320,40 L1180,86 L1020,30 L870,80 L720,44 L560,92 L400,38 L250,78 L120,46 L0,84 Z"
          fill={midColor}
        />
      </svg>

      {/* Front ridge + glowing crest — drifts the opposite way */}
      <div className="valley-seam-front-group absolute inset-0">
        <svg
          className="absolute inset-0 -left-[7%] h-full w-[114%]"
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
        >
          <path
            d={`M0,0 H1440 V58 L1340,104 L1210,52 L1070,96 L940,40 L800,104 L660,58 L520,112 L380,48 L250,98 L120,34 L0,72 Z`}
            fill={skyColor}
          />
        </svg>
        <svg
          className="valley-seam-crest absolute inset-0 -left-[7%] h-full w-[114%]"
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
        >
          <polyline
            points={crest}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Floating shards — tie into the chaos shards below */}
      <span
        className="valley-seam-shard absolute left-[18%] top-[6%] block size-2.5 rotate-12 bg-trail-cyan/70"
        style={{ ["--r" as string]: "12deg" }}
      />
      <span
        className="valley-seam-shard absolute left-[62%] top-[10%] block size-2 rotate-45 bg-trail-orange/70"
        style={{ ["--r" as string]: "45deg", animationDelay: "1.1s" }}
      />
      <span
        className="valley-seam-shard absolute left-[84%] top-[4%] block size-1.5 rotate-12 bg-trail-cyan/60"
        style={{ ["--r" as string]: "12deg", animationDelay: "2.2s" }}
      />
    </div>
  );
}
