import './styles.css';
import { useRouter } from 'next/router';  
import posthog from 'posthog-js';
import { useEffect } from 'react';


function App({ Component, pageProps }) 
{
  useEffect(() => {
    posthog.init('phc_md48ciqZ581q2Fbsji2cbGP9okTrJW9ESQ1icSysvZK', { api_host: 'https://app.posthog.com' });
  
    const handleRouteChange = () => posthog.capture('$pageview');
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  
  }, [])
  
  const router = useRouter();

  return <Component {...pageProps} />;

}
export default App;
