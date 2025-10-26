import React from 'react';
import { HiOutlineTrash } from 'react-icons/hi2';

function CheckoutCard() {
  return (
    <div className='border-b'>
      <div className='w-full  flex  items-center justify-between gap-4 pt-4 '>
        <div className='flex items-center gap-5'>
          <img
            className='h-[80px] w-[80px] object-cover rounded-lg'
            src='/assets/product/product2.png'
            alt='Product image'
          />
          <div className='flex flex-col gap-2'>
            <span className='font-semibold text-sm'>
              Logitech G435 Gaming Headset
            </span>
            <span className='text-gray-500 text-[10px] font-medium'>
              Size : L
            </span>
            <span className=' font-bold text-sm'>$100.00 x 1</span>
          </div>
        </div>
      </div>
      <div className='py-2 flex gap-2 items-center'>
        <div className='w-6 h-6 bg-gray-100 rounded-sm flex items-center justify-center '>
          <img src='/assets/brands/adidas.png ' className=' bg-gray-100 p-1' />
        </div>
        <p className='text-xs text-gray-600'>Lacoste (Shop Name)</p>
      </div>
    </div>
  );
}

export default CheckoutCard;
