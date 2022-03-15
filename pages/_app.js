import { Layout } from '../components/layout'
import '../styles/globals.css'
import '../styles/tippy.css'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return <> <Head>
      <title>ANS UI</title>
      <meta name="description" content="ANS User Interface" />
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
