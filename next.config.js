/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  async redirects() {
    return [
      {
        source: '/suporte',
        destination: 'https://discord.gg/eMzpeyxtHf',
        permanent: true,
      },
    ]
  },
}


module.exports = nextConfig
