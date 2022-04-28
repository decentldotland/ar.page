import { Layout } from '../components/layout'
import '../styles/globals.css'
import '../styles/tippy.css'
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  return <RecoilRoot> <Head>
      <title>ar.page</title>
      <meta name="description" content="ar.page | faq" />
      <link rel="icon" href="/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes" />
  </Head>
  <Layout>
    <Component {...pageProps} />
  </Layout>
  </RecoilRoot>
}

export default MyApp
