import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a self-contained Node.js runtime in `.next/standalone` for CI/CD.
  output: "standalone",
  experimental: {
    // TypeScript's API avoids the CLI parsing issue encountered during CI builds.
    useTypeScriptCli: false,
    // Keep compiler diagnostics in the main build process.
    webpackBuildWorker: false,
  },
};

export default nextConfig;
