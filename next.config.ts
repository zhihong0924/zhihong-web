import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/chat": ["./content/portfolio-context.md"],
  },
};

export default nextConfig;
