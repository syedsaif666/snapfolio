import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Generate your next Case Study in seconds."
          />
          <meta property="og:site_name" content="snapfolio" />
          <meta
            property="og:description"
            content="Generate your next Case Study in seconds."
          />
          <meta property="og:title" content="Case Study Generator" />

      

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
