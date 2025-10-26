import React from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

function AffitialeCategoryTop() {
  return (
    <div className='container pt-4 pb-10'>
      <div className='flex items-center justify-between'>
        <span className='bg-white p-3 rounded-lg'>
          <GoChevronLeft />
        </span>
        <div className='flex items-center justify-center gap-5'>
          <span className='border border-primary bg-blue-50 rounded-lg px-4 py-2 text-sm'>
            All Store
          </span>
          <span className='border border-gray-400 rounded-lg px-4 py-2 text-sm'>
            Winter 24-25
          </span>
          <span className='border border-gray-400 rounded-lg px-4 py-2 text-sm'>
            New In Men
          </span>
          <span className='border border-gray-400 rounded-lg px-4 py-2 text-sm'>
            Women
          </span>
          <span className='border border-gray-400 rounded-lg px-4 py-2 text-sm'>
            Customized Shirts
          </span>
          <span className='border border-gray-400 rounded-lg px-4 py-2 text-sm'>
            Child
          </span>
        </div>
        <span className='bg-white p-3 rounded-lg'>
          <GoChevronRight />
        </span>
      </div>
    </div>
  );
}

export default AffitialeCategoryTop;
