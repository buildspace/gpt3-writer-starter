import './styles.css';
import { useRouter } from 'next/router';  
import { usePostHog } from 'next-use-posthog';


function App({ Component, pageProps }) {
  usePostHog('phc_orRjN4marLj8TAX5Ryg6e0KuiVsdNZ8J7vEWbSQVOob', {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
    },
  })  

  const router = useRouter();

  return <Component {...pageProps} />

}
export default App;
