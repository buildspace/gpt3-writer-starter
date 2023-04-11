import {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="JEN" key="title"/>
        <meta property="og:description" content="reinforce ur shit" key="description" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
