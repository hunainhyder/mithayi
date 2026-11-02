import type { NextConfig } from "next";

// Product and category images are served from the CMS API's storage path.
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const api = apiUrl ? new URL(apiUrl) : null;
const isLocalApi =
  api !== null && ["localhost", "127.0.0.1", "[::1]"].includes(api.hostname);

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: api
      ? [
          {
            protocol: api.protocol.replace(":", "") as "http" | "https",
            hostname: api.hostname,
            port: api.port,
            pathname: "/storage/**",
          },
        ]
      : [],
    // Lets the image optimizer reach a CMS running on this machine during development
    dangerouslyAllowLocalIP: isLocalApi,
  },
};

export default nextConfig;
