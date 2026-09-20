import { useEffect } from 'react';
import { useRouter } from 'next/router';
import FloatingCartMenu from '@/components/home/FloatingCart';
import OrderDialog from '@/components/checkout/OrderDialog';
import { CartDialogProvider, useCartDialog } from '@/context/CartDialogContext';
import { store } from '@/store';
import { captureAttribution } from '@/utils/orderTracking';
import '@/styles/globals.css';
import { Provider } from 'react-redux';

function AppContent({ Component, pageProps }) {
  const router = useRouter();
  const { isOpen, closeDialog } = useCartDialog();
  const isAdminRoute = router.pathname.startsWith('/admin');

  // Store first-touch attribution on landing (idempotent, storage-safe).
  useEffect(() => {
    if (!isAdminRoute) captureAttribution();
  }, [isAdminRoute]);

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
