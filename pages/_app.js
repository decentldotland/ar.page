import { Layout } from '../components_new/layout'
import '../styles/globals.css'
import '../styles/tippy.css'
import '../styles/daisyUI.css'
import Head from 'next/head';
import Script from 'next/script';
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
import { ConstructionOutlined } from '@mui/icons-material';

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
            <meta name="description" content="Home | ar.page" />
            <meta name="twitter:card" content="summary" />
            <link rel="icon" href={user ? `https://pz-prepnb.meson.network/${user.avatar}` : "https://ar.page/favicon.png"} /> {/* TODO: potential source of vulnerabilities if users somehow upload malicious text or images */}
            <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />
            <meta name="description" content={user ? `${user.bio} | ar.page` : "Home | ar.page"} />
            <meta name="twitter:image" content={(user) ? `https://pz-prepnb.meson.network/${user.avatar}` : "https://ar.page/favicon.png"} />
            <meta name="twitter:title" content={user ? `${user.currentLabel} | ar.page` : "Home | ar.page"} />
            <meta name="twitter:url" content={user ? `https://${user.currentLabel}.ar.page` : "https://ar.page"} />
            <meta name="twitter:description" content={user ? user.bio : "All your Web3 content, finally stored in one place."} />
            <meta name="twitter:site" content="@decentdotland" />

            <meta name="og:card" content="summary" />
            <meta name="description" content={user ? `${user.currentLabel} | ar.page` : "Home | ar.page"} />
            <meta name="og:image" content={user ? `https://pz-prepnb.meson.network/${user.avatar}` : "https://ar.page/favicon.png"} />
            <meta name="og:title" content={user ? `${user.currentLabel} | ar.page` : "Home | ar.page"} />
            <meta name="og:url" content={user ? `https://${user.currentLabel}.ar.page` : "https://ar.page"} />
            <meta name="og:description" content={user ? user.bio : "All your Web3 content, finally stored in one place."} />
          </Head>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-4XDV8F7VJB"
            strategy="afterInteractive" 
          />
          <Script id="gtag-function">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4XDV8F7VJB');
            `}
          </Script>
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


/*





*/