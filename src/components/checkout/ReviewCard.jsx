import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { GoChevronDown } from 'react-icons/go';
import { RiArrowRightLine } from 'react-icons/ri';
function ReviewCard({ status }) {
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
        <span className='border-2 border-gray-700 p-1 rounded-full'>
          {' '}
          <RiArrowRightLine />
        </span>
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
        </div>
        <div className='py-2'>
          <div className='flex items-center justify-between py-1'>
            <div className='flex pt-2'>
              <FaStar className='text-sm text-yellow-500' />
              <FaStar className='text-sm text-yellow-500' />
              <FaStar className='text-sm text-yellow-500' />
              <FaStar className='text-sm text-yellow-500' />
              <FaStar className='text-sm text-gray-500' />
            </div>
            <span className='text-xs text-gray-500'>20 Nov 2024</span>
          </div>
          <span className='text-[13px]  text-gray-500'>
            Absolutely love this jacket! Stylish and comfortable. Great
            purchase, highly recommend!
          </span>
        </div>
      </div>

      {/* track order section */}
      <div className='flex items-end justify-between py-4'>
        <div className='flex items-start gap-1 flex-col'>
          <span className='text-sm font-semibold'>Image</span>
          <img
            className='h-[80px] w-[80px] object-cover rounded-lg'
            src='/assets/product/review.png'
            alt='Product image'
          />
        </div>
        <div>
          <button className='text-primary flex items-center gap-2 font-semibold text-xs border-2 border-primary rounded-md px-4 py-2  '>
            <FaPencil />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
