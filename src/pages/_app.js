import { useRouter } from 'next/router';
import FloatingCartMenu from '@/components/home/FloatingCart';
import OrderDialog from '@/components/checkout/OrderDialog';
import { CartDialogProvider, useCartDialog } from '@/context/CartDialogContext';
import { store } from '@/store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';

function AppContent({ Component, pageProps }) {
  const router = useRouter();
  const { isOpen, closeDialog } = useCartDialog();
  const isAdminRoute = router.pathname.startsWith('/admin');

  return (
    <>
      <Component {...pageProps} />
      {!isAdminRoute && (
        <>
          <FloatingCartMenu />
          <OrderDialog isOpen={isOpen} onClose={closeDialog} />
        </>
      )}
    </>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CartDialogProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </CartDialogProvider>
    </Provider>
  );
}
