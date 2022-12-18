import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="A.I. Lesson Planner" key="title"/>
        <meta property="og:description" content="A GiantKelp Prototype" key="description"/>
        <meta
          property="og:image"
          content="https://www.giantkelp.com/content/images/size/w1200/2022/09/DALL-E-2022-09-12-21.44.53---triangles--circles-and-lines-.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
