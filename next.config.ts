import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	eslint: {
		// Prevent build from failing due to ESLint errors during CI/Docker builds.
		// This keeps the production build resilient; fix lint issues in CI or locally.
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
