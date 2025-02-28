import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: 'https://chat.oldwei.com/:path*',// The external API URL
            },
        ];
    },
};

export default nextConfig;
