import '../styles/globals.css';
import Layout from '../components/Layout';
import { AuthContextProvider } from '../context/AuthContext';
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-X6HSXTGLX8'
        strategy='afterInteractive'
      ></Script>

      <Script id='google-analytics' strategy='afterInteractive'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-X6HSXTGLX8');
          `}
      </Script>

      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content='Debatts is a platform that connects you with other individuals and invites you to an enriching exchange of views with inspiring people. You need someone’s opinion or want to share your own? Post questions and thoughts and find out how other users react. '
        />
        <meta
          name='keywords'
          content='debatts, debate, discover, social platform, argue, conversation, forum'
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
