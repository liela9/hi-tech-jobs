/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Only attempt to resolve fs module on the server side
        if (!isServer) {
          config.resolve.fallback = {
            fs: false,
            dns: false,
            net: false,
            tls: false,
          };
        }
        return config;
    },
    serverExternalPackages: ['pg'],
};

export default nextConfig;
