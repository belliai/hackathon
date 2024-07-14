/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects(){
    return [
      {
        source: '/',
        destination: '/belli/airway-bill-dashboard',
        permanent: true,
      }
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
      }
    ],
    dangerouslyAllowSVG: true,
  },
}

export default nextConfig
