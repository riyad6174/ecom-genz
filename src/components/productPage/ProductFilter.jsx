import React from 'react';
import { GoChevronDown } from 'react-icons/go';
import { FiGrid } from 'react-icons/fi';
import { MdFormatListBulleted } from 'react-icons/md';
function ProductFilter() {
  return (
    <div className='container'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-between gap-4'>
          <span className='text-sm'>Sort by</span>
          <span className='flex items-center text-sm justify-between gap-2 bg-white px-4 py-2 rounded-lg border'>
            <span>Newest</span>
            <span>
              <GoChevronDown />
            </span>
          </span>
        </div>
        <div className='flex items-center justify-between gap-3'>
          <span className='flex items-center text-sm justify-between gap-2 bg-white px-4 py-2 rounded-lg border'>
            <span> High Price</span>
            <span>
              <GoChevronDown className='fw-bold text-lg' />
            </span>
          </span>
          <div className='flex items-center justify-between gap-1'>
            <span className='bg-white p-2 rounded-lg border'>
              <FiGrid className='text-xl' />
            </span>
            <span className='bg-white p-2 rounded-lg border'>
              <MdFormatListBulleted className='text-xl' />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
