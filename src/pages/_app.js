import { useRouter } from 'next/router';
import FloatingCartMenu from '@/components/home/FloatingCart';
import { store } from '@/store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      {router.pathname !== '/order' && <FloatingCartMenu />}
    </Provider>
  );
}
