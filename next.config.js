module.exports = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 100,
  basePath: '/',
  // swcMinify: true,
  images: {
    domains: ['pz-prepnb.meson.network', 
              'arweave.net', 
              'assets.poap.xyz', 
              'cryptologos.cc', 
              'img.arweave.dev',
              'lens.xyz',
              'raw.githubusercontent.com',
              'w7.pngwing.com',
              'nftipfs.link',
              'azimuth.network',
              'metadata.ens.domains',
              'pfp-pl.us',
              'miladyaura.mypinata.cloud',
              'lh3.googleusercontent.com',
              'gateway.pinata.cloud',
              'miladymaker.net',
              'www.miladymaker.net',
              'i.seadn.io',
              'api.tiles.art',
              'image-proxy.svc.prod.covalenthq.com'
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
