import React from 'react';

import { HiHeart } from 'react-icons/hi2';
import { TbShoppingCartHeart } from 'react-icons/tb';
import { FaStarHalfStroke } from 'react-icons/fa6';
import Link from 'next/link';
import { BsShare } from 'react-icons/bs';
const AffiliateProductCard = () => {
  return (
    <div className='bg-white  rounded-xl p-3 w-50'>
      {/* Product Image Section */}
      <div className='relative'>
        <img
          src='/assets/product/product1.png' // Replace with actual image
          alt='Puff-Sleeved Cotton Satin Kurti'
          className='w-full h-40 object-cover rounded-lg'
        />
        {/* Wishlist & Cart Icons */}
        <button className='absolute top-2 left-2   p-2  '>
          <HiHeart className='text-accent text-xl ' />
        </button>
        <button className='absolute top-2 right-2 bg-white p-2 rounded-md '>
          <BsShare className='text-gray-600 text-sm' />
        </button>
      </div>

      {/* Product Details */}
      <Link href={'#'} className='text-gray-900 font-semibold text-sm mt-2'>
        Puff-Sleeved Cotton Satin Kurti
      </Link>

      {/* Ratings & Sales */}
      <div className='flex items-center gap-1 text-sm text-gray-600 mt-1'>
        <FaStarHalfStroke className='text-gray-700 mr-1' />
        <span>4.7</span>
        <span className='mx-2'>|</span>
        <span className='bg-gray-100 px-2 py-1 font-semibold rounded text-xs'>
          482 sold
        </span>
      </div>

      {/* Pricing */}
      <div className='mt-2 flex items-center space-x-2'>
        <span className='text-accent text-lg font-bold'>$385.00</span>
        <span className='text-gray-500 line-through text-sm'>$485.00</span>
      </div>
      <div className='mt-2 flex items-center font-semibold space-x-2 bg-green-100 px-2 py-1'>
        <span className='text-greenText text-xs  '>3% Commission</span>
        <span className='text-gray-500  text-xs'>
          Earn: <span className='text-greenText'>$3</span>
        </span>
      </div>
    </div>
  );
};

export default AffiliateProductCard;
