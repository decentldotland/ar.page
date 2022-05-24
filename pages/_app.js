import { Layout } from '../components/layout'
import '../styles/globals.css'
import '../styles/tippy.css'
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { useUpdateChecker } from '../src/useUpdateChecker';

function MyApp({ Component, pageProps }) {
  useUpdateChecker();
  return <RecoilRoot> <Head>
      <title>ar.page</title>
      <meta name="description" content="ar.page | faq" />
      <link rel="icon" href="/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content="https://ar.page/favicon.png" />
      <meta name="twitter:site" content="@decentdotland" />
      <meta name="twitter:title" content="ar.page | faq" />
      <meta name="twitter:description" content="The web3 social layer" />
      <meta name="twitter:url" content="https://ar.page"></meta>
  </Head>
  <Layout>
    <Component {...pageProps} />
  </Layout>
  </RecoilRoot>
}

export default MyApp

