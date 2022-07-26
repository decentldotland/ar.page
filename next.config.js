module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['arweave.net']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
  
    return config;
  }
}
