import type { NextConfig } from 'next'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const projectRoot = dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
    compress: true,
    turbopack: {
        root: projectRoot,
    },

    async redirects() {
        return [
            {
                source: '/',
                destination: '/leads',
                permanent: true,
            },
        ]
    },

    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.BACKEND_URL}/api/:path*`,
            },
        ]
    },
}

export default nextConfig
