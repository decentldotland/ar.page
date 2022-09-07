module.exports = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: ['pz-prepnb.meson.network', 'arweave.net', 'assets.poap.xyz']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
  
    return config;
  }
}
