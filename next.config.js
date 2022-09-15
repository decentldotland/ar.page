module.exports = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: ['pz-prepnb.meson.network', 'arweave.net', 'assets.poap.xyz', 'cryptologos.cc'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    formats: ['image/avif', 'image/webp'],
    headers: [
      {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, stale-while-revalidate',
      },
  ],


  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
  
    return config;
  }
}
