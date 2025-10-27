import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pub-8645696b761c495498795a6b2b48c318.r2.dev",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
