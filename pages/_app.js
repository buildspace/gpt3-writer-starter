import './styles.css';
import { useRouter } from 'next/router';


function App({ Component, pageProps }) {
  const router = useRouter();
  return <Component {...pageProps} />
}
export default App;
