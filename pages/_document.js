import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          property="og:title"
          content="Instagram Caption Generator"
          key="title"
        />
        <meta
          property="og:description"
          content="Instagram Caption Generator"
          key="description"
        />
        <meta
          property="og:image"
          content="https://i.seadn.io/gae/ZCl9qtdeOX4MlkdY90xtG0ClLgilX2N-c6oXwwvMnF8YI_Kxk-5xXK76RAv_t06nYfg3bjF4NGbnrm3wl6xlebPme4sqt5wTAT1kVg?auto=format&w=3840"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
