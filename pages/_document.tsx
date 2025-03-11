import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import { HOST, TITLE, DESC, FAVICON, OG_IMAGE } from 'config'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="referrer" content="always" />
          <meta
            name="keywords"
            content="eddie tindame eddietindame software engineer web dev webdev full stack fullstack developer design freelance contract london uk united kingdom unitedkingdom england eu europe react js reactjs javascript next nextjs next.js wordpress php go html css seo mongodb database sql browser responsive blog resume cv"
          />
          <meta name="description" content={DESC} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_gb" />
          <meta property="og:url" content={HOST} />
          <meta property="og:title" content={TITLE} />
          <meta property="og:description" content={DESC} />
          <meta property="og:image" content={OG_IMAGE} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:site_name" content={TITLE} />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="shortcut icon" href={FAVICON} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

// TODO: Optimise font loading
