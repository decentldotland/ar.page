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

      <meta name="twitter:card" content="summary"></meta>
      <meta name="twitter:site" content="@decentdotland" />
      <meta name="twitter:title" content="ar.page" />
      <meta name="twitter:description" content="ar.page | faq" />
  </Head>
  <Layout>
    <Component {...pageProps} />
  </Layout>
  </RecoilRoot>
}

export default MyApp

