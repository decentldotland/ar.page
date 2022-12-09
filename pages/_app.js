import { Layout } from '../components_new/layout';
import '../styles/globals.css';
import '../styles/tippy.css';
import '../styles/daisyUI.css';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { AnimatePresence } from "framer-motion";
import { AnsProvider } from 'ans-for-all';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { publicProvider } from 'wagmi/providers/public';
import { avalancheChain, evmosChain } from '../src/constants';

const { chains, provider } = configureChains(
  [chain.mainnet, avalancheChain, evmosChain],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
      metaMaskWallet({ chains }),
      coinbaseWallet({ chains }),
    ],
  },
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
        <AnimatePresence exitBeforeEnter>
          <AnsProvider>
            <Head>
              <title>ar.page</title>
              <meta name="description" content="ar.page | Home" />
              <link rel="icon" href="/favicon.png" />
              <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1"  />
              <meta name="twitter:card" content="summary" key="cardTwitter" />
              <meta name="twitter:image" content="https://ar.page/favicon.png" key="imageTwitter" /> {/*titling part where user name goes*/}
              <meta name="twitter:site" content="@decentdotland" key="siteTwitter" />
              <meta name="twitter:title" content="ar.page | Home" key="titleTwitter" /> {/*titling part where user name goes*/}
              <meta name="twitter:description" content="All your Web3 content, finally stored in one place." key="descriptionTwitter" /> {/*Discord description*/}
              <meta name="twitter:url" content="https://ar.page" key="urlTwitter" />
            </Head>
            <WagmiConfig client={wagmiClient}>
              <RainbowKitProvider chains={chains}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </RainbowKitProvider>
            </WagmiConfig>
          </AnsProvider>
        </AnimatePresence>
    </RecoilRoot>
  )
}

export default MyApp;
