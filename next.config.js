module.exports = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: ['pz-prepnb.meson.network', 
              'arweave.net', 
              'assets.poap.xyz', 
              'cryptologos.cc', 
              'img.arweave.dev',
              'lens.xyz',
              'raw.githubusercontent.com',
              // THIS IS A TEMPORARY FIX
              'w7.pngwing.com'
            ],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    formats: ['image/avif', 'image/webp']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
  
    return config;
  }
}
