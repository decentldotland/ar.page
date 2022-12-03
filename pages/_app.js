import { Layout } from '../components_new/layout'
import '../styles/globals.css'
import '../styles/tippy.css'
import '../styles/daisyUI.css'
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { AnimatePresence } from "framer-motion";
import { AnsProvider } from 'ans-for-all';

import '@rainbow-me/rainbowkit/styles.css';
import {WalletSelectorContextProvider } from '../src/contexts/WalletSelectorContext'
import { getDefaultWallets, RainbowKitProvider, apiProvider, connectorsForWallets, getWalletConnectConnector } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { avalancheChain } from '../src/constants';

const { chains, provider } = configureChains(
  [chain.mainnet, avalancheChain],
  [publicProvider()]
);

//jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) }), 
/*
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
*/

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
              <WalletSelectorContextProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </WalletSelectorContextProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </AnsProvider>
      </AnimatePresence>
    </RecoilRoot>
  )
}

export default MyApp

