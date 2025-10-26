import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const FloatingCartMenu = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total items and total price
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className='fixed bottom-4 left-0 right-0 z-50 md:hidden'>
      {totalItems > 0 && (
        <Link href='/order'>
          <div className='mx-4 bg-primary border  rounded-full shadow-xl p-3 flex items-center justify-between hover:bg-orange-700 transition-colors'>
            <div className='flex items-center'>
              <FiShoppingCart className='text-xl mr-2' />
              <span className='text-sm font-semibold'>
                {totalItems} {totalItems === 1 ? 'Item' : 'Items'} Added | ৳
                {totalPrice.toFixed(2)}
              </span>
            </div>
            <span className='text-xs font-medium bg-white text-black px-2 py-1 rounded-full'>
              View Cart
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default FloatingCartMenu;
