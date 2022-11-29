import './styles.css';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useEffect } from 'react';

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Init PostHog
    posthog.init('phc_orRjN4marLj8TAX5Ryg6e0KuiVsdNZ8J7vEWbSQVOob', { api_host: 'https://app.posthog.com' });

    // Track page views
    const handleRouteChange = () => posthog.capture('$pageview');
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
  return <Component {...pageProps} />
}
export default App;
