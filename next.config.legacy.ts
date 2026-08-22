import type { NextConfig } from "next";

export default {
  output: "standalone",
  typedRoutes: true,
  reactStrictMode: true,
  reactCompiler: true,
} satisfies NextConfig;
