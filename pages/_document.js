import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Rumi Writer" key="title"/>
        <meta property="og:description" content="Write an AI generated poem in the style of Rumi about anything " key="description"/>
        <meta
          property="og:image"
          content="/favicon.ico"
        />
        <meta name="twitter:card" content="/favicon.ico"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
