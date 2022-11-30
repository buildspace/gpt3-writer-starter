import './styles.css';
import { useRouter } from 'next/router';  
import posthog from 'posthog-js';
import { useEffect } from 'react';


function App({ Component, pageProps }) 
{
  useEffect(() => {
    posthog.init('phc_orRjN4marLj8TAX5Ryg6e0KuiVsdNZ8J7vEWbSQVOob', { api_host: 'https://app.posthog.com' })
  }, [])
  
  const router = useRouter();

  return <Component {...pageProps} />

}
export default App;
