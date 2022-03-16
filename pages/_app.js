import { Layout } from '../components/layout'
import '../styles/globals.css'
import '../styles/tippy.css'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return <> <Head>
      <title>ar.page</title>
      <meta name="description" content="ar.page | faq" />
      <link rel="icon" href="/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes" />
      {/* <meta name="viewport" content="viewport-fit=cover" /> */}
  </Head>
  <Layout>
    <Component {...pageProps} />
  </Layout>
  </>
}

export default MyApp
