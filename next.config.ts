import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://chat.oldwei.com/:path*', // 代理目标 API 地址
            },
        ];
    },
};

export default nextConfig;
