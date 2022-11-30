import './styles.css';
import { useRouter } from 'next/router';
import {Analytics} from '@vercel/analytics';

function App({ Component, pageProps }) {
  const router = useRouter();
  <Analytics  />
  return <Component {...pageProps} />


}
export default App;
