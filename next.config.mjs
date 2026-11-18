/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a fully static site into /out — ideal for Hostinger shared hosting.
  output: 'export',
  // Every route becomes folder/index.html, which Apache serves without rewrites.
  trailingSlash: true,
  // The Next.js image optimiser needs a Node server; static export serves images as-is.
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
