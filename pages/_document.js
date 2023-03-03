import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="GPT-3 Assistant" key="title" />
        <meta property="og:description" content="I built with buildspace, dare to build too" key="description" />
        <meta
          property="og:image"
          content="https://cdn.buildspace.so/courses/gpt3-writer/project-og.jpg"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="/chat">Products</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </header>
        <Main />
        <NextScript />
        <footer>
          <div class="social-icons">
            <a target="_blank" href="https://www.facebook.com/sydneyisaiah.lukee"><i class="fa fa-facebook"></i></a>
            <a target="_blank" href="https://www.instagr.am/borgsid"><i class="fa fa-instagram"></i></a>
            <a target="_blank" href="https://www.linkedin.com/in/borgsid"><i class="fa fa-linkedin"></i></a>
            <a target="_blank" href="https://www.twitter.com/sydney_lukee"><i class="fa fa-twitter"></i></a>
          </div>
          <div>
            <br />
            <p>&copy; 2023 Minimalist Page. All Rights Reserved.</p>
          </div>
        </footer>
      </body>
    </Html>
  )
}
