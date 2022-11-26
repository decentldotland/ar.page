// import { Layout } from '../components/layout'
import { Layout } from '../components_new/layout'

import '../styles/globals.css'
import '../styles/tippy.css'
import '../styles/daisyUI.css'
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { AnimatePresence } from "framer-motion";
import { AnsProvider } from 'ans-for-all';
// import { useUpdateChecker } from '../src/useUpdateChecker';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet], // [, chain.polygon, chain.optimism, chain.arbitrum]
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})



function MyApp({ Component, pageProps }) {
  // useUpdateChecker();
  return (
    <RecoilRoot> 
      <AnimatePresence exitBeforeEnter>
        <AnsProvider>
          <Head>
            <title>ar.page</title>
            <meta name="description" content="test 1 | Home" /> {/*titling part where user name goes*/}
            <link rel="icon" href="/favicon.png" />
            <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1"  />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:image" content="https://ar.page/favicon.png" /> {/*titling part where user name goes*/}
            <meta name="twitter:site" content="@decentdotland" />
            <meta name="twitter:title" content="test 2 | Home" /> {/*titling part where user name goes*/}
            <meta name="twitter:description" content="All your Web3 content, finally stored in one place." /> {/*Discord description*/}
            <meta name="twitter:url" content="https://ar.page"></meta>
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

export default MyApp

