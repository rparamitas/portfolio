/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The split hero on /new pulls a photo from a public R2 bucket. Matching
    // the whole *.r2.dev zone keeps the URL in app/new/page.tsx swappable
    // between buckets without touching this file.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
    ],
  },
};

export default nextConfig;
