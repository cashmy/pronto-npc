import getConfig from 'next/config';
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps };
  }

  render() {
      const contextPath = getConfig().publicRuntimeConfig.contextPath;

      return (
          <Html lang="en">
              <Head>
                  <link id="theme-css" href={`${contextPath}/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
                  <link rel="preload" href="/fonts/aniron-bold.ttf" as="font" crossOrigin="anonymous" />
                  <link rel="preload" href="/fonts/aniron-regular.ttf" as="font" crossOrigin="anonymous" />
              </Head>
              <body>
                  <Main />
                  <NextScript />
              </body>
          </Html>
      );
  }
}

export default MyDocument;
