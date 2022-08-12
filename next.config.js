module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['pz-prepnb.meson.network']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
  
    return config;
  }
}
