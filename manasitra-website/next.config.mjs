/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/:path*", has: [{ type: "host", value: "mansitra.in" }], destination: "https://www.mansitra.in/:path*", permanent: true }];
  },
  // Also set mansitra.in to redirect to www in Vercel Domains settings.
};

export default nextConfig;
