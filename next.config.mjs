/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboards/airway-bills",
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.useparagon.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "onerecord-belli.s3.amazonaws.com",
        port: "",
      },
    ],
    dangerouslyAllowSVG: true,
  },
}

export default nextConfig
