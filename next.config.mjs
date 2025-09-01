/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',      // empaqueta servidor Next en .next/standalone
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
