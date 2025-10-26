import React from 'react';

function CartBrandCard() {
  return (
    <div className='w-full flex flex-col gap-4  py-4'>
      <div className='flex items-center gap-5'>
        <input id='product1' type='checkbox' className='w-5 h-5 rounded-lg' />
        <img
          className='h-9 w-9 md:h-[48px] md:w-[48px] object-cover rounded-lg'
          src='/assets/product/product2.png'
          alt='Product image'
        />
        <div className='flex flex-col gap-1'>
          <span className='font-bold text-md '>Logitech Indonesia</span>
          <span className='text-gray-400 text-sm hidden md:block'>
            Central Jakarta
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartBrandCard;
