import { Chain  } from '@rainbow-me/rainbowkit';

export const AVAX_LOGO = 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=023';
export const ANS_CONTRACT = 'HrPi8hFc7M5dbrtlELfTKwPr53RRrDBgXGdDkp0h-j4';
export const ARWEAVE_URL = 'https://arweave.net/';
export const ARWEAVE_OBJECT = {
  host: "arweave.net",
  port: 443,
  protocol: "https",
};
export const ARWEAVE_EXPLORER = "https://v2.viewblock.io/";
export const ARWEAVE_EXPLORER_TX = "https://v2.viewblock.io/arweave/tx/";
export const MESON_URL = 'https://pz-prepnb.meson.network/';

// img.arweave.dev
export const ARWEAVE_IMG = "https://img.arweave.dev/";

//Based off https://github.com/decentldotland/ark-protocol/blob/84c850604ea6623407df6a781afb7812371273f4/README.md
//. TESTNET
export const NEAR_CONTRACT = "dev-1660516310576-97373428914255";

// Add-On Chains for Rainbow Kit
export const avalancheChain: Chain = {
  id: 43_114,
  name: 'Avalanche',
  network: 'avalanche',
  iconUrl: AVAX_LOGO,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: 'https://api.avax.network/ext/bc/C/rpc',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
};

export const evmosChain: Chain = {
  id: 9_001,
  name: 'Evmos',
  network: 'Evmos Mainnet',
  iconUrl: AVAX_LOGO,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Evmos',
    symbol: 'EVMOS',
  },
  rpcUrls: {
    default: 'https://eth.bd.evmos.org:8545',
  },
  blockExplorers: {
    default: { name: 'Evmos', url: 'https://evm.evmos.org' },
    etherscan: { name: 'Evmos', url: 'https://evm.evmos.org' },
  },
  testnet: false,
};

export const NEAR_ORACLE = "ark_station_1.near";

export const ARK_V2 = "https://ark-core.decent.land/v2/";

export const EVM_ORACLES: Record<number, string> = {
  1: "0xdE44d3fB118E0f007f2C0D8fFFE98b994383949A",
  56: "0xdE44d3fB118E0f007f2C0D8fFFE98b994383949A",
  250: "0xdE44d3fB118E0f007f2C0D8fFFE98b994383949A",
  43114: "0xE5E0A3380811aD9380F91a6996529da0a262EcD1",
  10: "0xdE44d3fB118E0f007f2C0D8fFFE98b994383949A",
  42161: "0xdE44d3fB118E0f007f2C0D8fFFE98b994383949A",
  137: "0xdE44d3fB118E0f007f2C0D8fFFE98b994383949A",
  // 245022926: "",
  1313161555: "0xfb0200C27185185D7DEe0403D5f102ADb59B7c34",
  9001: "0xdE44d3fB118E0f007f2C0D8fFFE98b994383949A"
};

export const NETWORKS: Record<number, {
  name: string;
  urls: string[];
  theme: string;
  networkKey: string; // Ark Protocol identifier for network
  nativeCurrency?: any;
}> = {
  1: {
    name: "Ethereum Mainnet",
    networkKey: "ETH-MAINNET",
    urls: ["https://cloudflare-eth.com/"],
    theme: "73, 71, 178"
  },
  56: {
    name: "BNB Chain",
    networkKey: "BSC-MAINNET",
    urls: ["https://bscrpc.com"],
    theme: "243, 186, 47"
  },
  43114: {
    name: "Avalanche C-Chain",
    networkKey: "AVALANCHE-MAINNET",
    urls: ["https://api.avax.network/ext/bc/C/rpc"],
    theme: "255, 0, 0"
  },
  10: {
    name: "Optimism",
    networkKey: "OPTIMISM-MAINNET",
    urls: ["https://optimism-mainnet.public.blastapi.io"],
    theme: "255, 0, 0"
  },
  42161: {
    name: "Arbitrum One",
    networkKey: "ARBITRUM-MAINNET",
    urls: ["https://arb1.arbitrum.io/rpc"],
    theme: "40, 160, 240"
  },
  250: {
    name: "Fantom",
    networkKey: "FTM-MAINNET",
    urls: ["https://rpc.ftm.tools"],
    theme: "9, 39, 255"
  },
  137: {
    name: "Polygon",
    networkKey: "POLYGON-MAINNET",
    urls: ["https://polygon-rpc.com"],
    theme: "130, 71, 229"
  },
  9001: {
    name: "Evmos Mainnet",
    networkKey: "EVMOS-MAINNET",
    urls: ["https://eth.bd.evmos.org:8545"],
    theme: "228, 65, 26",
    nativeCurrency: {
      name: "Evmos",
      symbol: "EVMOS",
      decimals: 18  
    }
  }
};

export const ONBOARDING_TIMEOUT = 1300;

// Accomodates NEXT Image allowing us to feed various domains
export const IMAGE_PROXY = "https://image-proxy.svc.prod.covalenthq.com/cdn-cgi/image/width=512,fit/";
export const IPFS_PROXY = "https://cloudflare-ipfs.com/ipfs/";
export const ONBOARDING_LOCAL = "onboarding";

export const DECENT_LORE_NAMES = [
  "cryptochambers",
  "neighbourhood_watch",
  "immaculate_laboratory",
  "crimson_castle",
  "barracks",
  "diseased_metropolis",
  "biology",
  "main_engineering",
  "diseased_cargo_hold",
  "devastated_engineering",
  "greenbelt_citadel",
  "diseased_arboretum",
  "coliseum",
  "aquatic_biology",
  "house_of_the_eye",
  "gallery",
  "arkade",
  "island_of_pleasure",
  "emwebbed_scooper",
  "parliament",
  "diseased_and_cured",
  "terraforming",
  "stellar_cartography",
  "cartographers gondola",
  "alternative propulsions",
  "foundry",
  "aquatic_analysis",
  "hangtime",
  "emergency_services",
  "dust_scooper"
];

