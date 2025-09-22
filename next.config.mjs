/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_BASE_PATH || ""; // e.g. "/repo-name" for GitHub Pages project sites

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
