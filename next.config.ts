import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local images, including cache-busting query strings (e.g. logo ?v=).
    localPatterns: [{ pathname: "/**", search: "" }, { pathname: "/**", search: "?v=2" }],
  },
};

export default nextConfig;
