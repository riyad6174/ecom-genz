import Link from 'next/link';
import React from 'react';
import { GoChevronDown } from 'react-icons/go';

function OrderCard({ status }) {
  return (
    <div className='bg-white px-4 py-4 rounded-lg'>
      <div className='py-1 flex  items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <div className='w-6 h-6 bg-gray-100 rounded-sm flex items-center justify-center '>
            <img
              src='/assets/brands/adidas.png '
              className=' bg-gray-100 p-1'
            />
          </div>
          <p className='text-sm md:text-xs text-gray-900'>
            Lacoste (Shop Name)
          </p>
        </div>
        <span
          className={`px-3 py-1 text-xs rounded-xl ${
            status === 'inProgress'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-green-100 text-green-500 font-semibold'
          }`}
        >
          {status === 'inProgress' ? 'In Progress' : 'Completed'}
        </span>
      </div>
      <div>
        {/* order cards will be here */}
        <div className='w-full  flex  items-center justify-between gap-4 py-2'>
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
        <div className='w-full  flex  items-center justify-between gap-4 py-2'>
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
      </div>
      {/* view more section */}
      <div className='text-primary mb-2 font-semibold py-2 text-xs flex items-center justify-start gap-2'>
        <span>View More (2)</span>
        <GoChevronDown />
      </div>
      <hr className='hidden md:block' />
      {/* track order section */}
      <div className='flex items-center justify-between'>
        <div className='py-1'>
          <span className='text-xs  text-gray-500'>Item : 03</span>
          <div>
            <span className='text-xs  text-gray-500'>Total :</span>
            <span className='text-sm  text-green-500 font-semibold'>
              {' '}
              $43677
            </span>
          </div>
        </div>
        <div>
          <Link href={status === 'inProgress' ? '/track-order' : '/review'}>
            <button className='text-primary font-semibold text-xs border-2 border-primary rounded-md px-6 md:px-12 py-2 md:py-2  '>
              {status === 'inProgress' ? 'Track Order' : 'Add Review'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
