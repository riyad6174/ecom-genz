import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { GoChevronDown } from 'react-icons/go';
import { RiArrowRightLine } from 'react-icons/ri';
function ReviewCardTo() {
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
          <p className='text-xs text-gray-900'>Lacoste (Shop Name)</p>
        </div>
      </div>
      <div>
        {/* order cards will be here */}
        <div className='w-full  flex  items-center justify-between gap-4 py-2'>
          <div className='flex items-center gap-5'>
            <img
              className='h-[50px] w-[50px] object-cover rounded-lg'
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
            </div>
          </div>
          <button className='text-primary flex items-center gap-2 font-semibold text-xs border-2 border-primary rounded-md px-4 py-2  '>
            <span>Review</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewCardTo;
