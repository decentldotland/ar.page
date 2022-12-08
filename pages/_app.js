import { Layout } from '../components_new/layout'
import '../styles/globals.css'
import '../styles/tippy.css'
import '../styles/daisyUI.css'
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { AnimatePresence } from "framer-motion";
import { AnsProvider } from 'ans-for-all';
<<<<<<< HEAD
=======
import axios from 'axios';
import '@rainbow-me/rainbowkit/styles.css';
>>>>>>> 4b0d0079027f317b8098a6cab83b53a26b085f95

import '@rainbow-me/rainbowkit/styles.css';
//import {WalletSelectorContextProvider } from '../src/contexts/WalletSelectorContext'
import { getDefaultWallets, RainbowKitProvider, apiProvider, connectorsForWallets, getWalletConnectConnector } from '@rainbow-me/rainbowkit';
import {
<<<<<<< HEAD
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { alchemyProvider } from 'wagmi/providers/alchemy';
=======
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
>>>>>>> 4b0d0079027f317b8098a6cab83b53a26b085f95
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
<<<<<<< HEAD
});

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
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:image" content="https://ar.page/favicon.png" />
            <meta name="twitter:site" content="@decentdotland" />
            <meta name="twitter:title" content="ar.page | Home" />
            <meta name="twitter:description" content="All your Web3 content, finally stored in one place." />
            <meta name="twitter:url" content="https://ar.page"></meta>
          </Head>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              {/*<WalletSelectorContextProvider>*/}
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              {/*</WalletSelectorContextProvider>*/}
            </RainbowKitProvider>
          </WagmiConfig>
        </AnsProvider>
      </AnimatePresence>
=======
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
>>>>>>> 4b0d0079027f317b8098a6cab83b53a26b085f95
    </RecoilRoot>
  )
}

export default MyApp;
