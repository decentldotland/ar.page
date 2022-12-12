import { Layout } from '../components_new/layout'
import '../styles/globals.css'
import '../styles/tippy.css'
import '../styles/daisyUI.css'
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { AnimatePresence } from "framer-motion";
import { AnsProvider } from 'ans-for-all';
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

  let user = null;
  // Collect Server Generated Data
  const pathFullInfo = pageProps.pathFullInfo ? pageProps.pathFullInfo : null;
  const userInfo = pageProps.userInfo ? pageProps.userInfo : null;

  // Assign Generated Data For SEO & Dynamic Embeds
  if(pathFullInfo) {
    user = pathFullInfo;
  } else if(userInfo) {
    user = userInfo;
  }

  return (
    <RecoilRoot>
        <AnimatePresence exitBeforeEnter>
          <AnsProvider>
            <Head>
              <title>ar.page</title>
              <meta name="description" content={user ? `${user.currentLabel} | ar.page` : "ar.page | Home"} />
              <link rel="icon" href="/favicon.png" />
              <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1"  />
              <meta name="twitter:card" content="summary" key="cardTwitter" />
              <meta name="twitter:image" content={user ? `https://pz-prepnb.meson.network/${user.avatar}` : "https://ar.page/cutoff-dl.png"} key="imageTwitter" /> {/*titling part where user name goes*/}
              <meta name="twitter:site" content="@decentdotland" key="siteTwitter" />
              <meta name="twitter:title" content={user ? `${user.currentLabel} | ar.page` : "ar.page | Home"} key="titleTwitter" /> {/*titling part where user name goes*/}
              <meta name="twitter:description" content={user ? user.bio : "All your Web3 content, finally stored in one place."} key="descriptionTwitter" /> {/*Discord description*/}
              <meta name="twitter:url" content={user ? `https://${user.currentLabel}.ar.page` : "https://ar.page"} key="urlTwitter" />

              <meta property="og:card" content="summary" />
              <meta property="og:image" content={user ? `https://pz-prepnb.meson.network/${user.avatar}` : "https://ar.page/cutoff-dl.png"} />
              <meta property="og:title" content={user ? `${user.currentLabel} | ar.page` : "ar.page | Home"} />
              <meta property="og:url" content={user ? `https://${user.currentLabel}.ar.page` : "https://ar.page"} /> 
              <meta property="og:description" content={user ? user.bio : "All your Web3 content, finally stored in one place."} />
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
