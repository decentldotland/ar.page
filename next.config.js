module.exports = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: [
    'assets.poap.xyz',
    'pz-prepnb.meson.network', 
    'arweave.net'
  ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
  
    return config;
  }
}
