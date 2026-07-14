import { FiShoppingCart } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useCartDialog } from '@/context/CartDialogContext';

const FloatingCartMenu = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { openDialog, isOpen } = useCartDialog();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return null;

  return (
    <div className='fixed bottom-4 left-0 right-0 z-50 md:hidden'>
      <button
        onClick={openDialog}
        className='mx-4 bg-primary border rounded-full shadow-xl p-3 flex items-center justify-between hover:bg-orange-700 transition-colors w-[calc(100%-2rem)]'
      >
        <div className='flex items-center'>
          <FiShoppingCart className='text-xl mr-2' />
          <span className='text-sm font-semibold'>
            {totalItems} {totalItems === 1 ? 'Item' : 'Items'} Added | ৳{totalPrice.toFixed(2)}
          </span>
        </div>
        <span className='text-xs font-medium bg-white text-black px-2 py-1 rounded-full'>
          View Cart
        </span>
      </button>
    </div>
  );
};

export default FloatingCartMenu;
