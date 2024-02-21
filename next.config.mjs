/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.builder.io", "images.unsplash.com", "tailwindui.com"],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
