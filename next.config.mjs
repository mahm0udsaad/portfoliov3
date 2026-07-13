/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during builds
  },
  async redirects() {
    return [
      // Consolidate the old Vercel subdomain onto the canonical domain
      {
        source: "/:path*",
        has: [{ type: "host", value: "mahm0udsaad.vercel.app" }],
        destination: "https://www.mahmoudsaad.art/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
