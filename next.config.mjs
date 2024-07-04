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
    ],
    dangerouslyAllowSVG: true,
  },
}

export default nextConfig
