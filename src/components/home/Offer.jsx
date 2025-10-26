import React from 'react';
import CustomSection from '../layout/CustomSection';
import Link from 'next/link';

function Offer() {
  return (
    <CustomSection>
      <div className='hidden md:grid grid-cols-2 gap-6 font-mont'>
        <div className='bg-white px-10 py-10 flex flex-col gap-3 rounded-lg'>
          <span className='font-semibold text-gray-500'>Portable Fan</span>
          <span className='text-2xl font-bold'>Sale 600 TAKA off</span>
          <div className='flex'>
            <Link
              href={'/product/portable-high-speed-cooling-fan'}
              className='bg-dark text-white px-3 py-2 text-xs rounded-lg'
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className='bg-white px-10 py-10 flex flex-col gap-3 rounded-lg'>
          <span className='font-semibold text-gray-500'>
            Anti Lost Tracking Device
          </span>
          <span className='text-2xl font-bold'>Sale 250 TAKA off</span>
          <div className='flex'>
            <Link
              href={'/product/anti-lost-tracker'}
              className='bg-dark text-white px-3 py-2 text-xs rounded-lg'
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </CustomSection>
  );
}

export default Offer;
