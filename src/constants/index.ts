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

export const NEAR_ORACLE = "ark_station_1.near";