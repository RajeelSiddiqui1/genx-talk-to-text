/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '17mb', // apni file ke size ke hisaab se badhao
    },
  },
};

export default nextConfig;
