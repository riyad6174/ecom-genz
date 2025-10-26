import React from 'react';
import CustomSection from '../layout/CustomSection';
import { FaArrowRight } from 'react-icons/fa6';
import ProductCard from '../product/ProductCard';
import products from '@/utils/products';

function Related() {
  return (
    <CustomSection>
      <div className='md:bg-[#FAFAFA] px-6 md:px-10 md:py-6 rounded-2xl pb-32 md:pb-0'>
        <div className='flex items-center justify-between py-3 md:py-8'>
          <div className='flex items-center justify-start gap-4'>
            <h2 className='text-lg md:text-2xl font-semibold md:text-[#637381]'>
              Related Products
            </h2>
          </div>
          <div className='flex items-center justify-center gap-3 text-xs font-semibold'>
            <span>More</span>
            <span>
              <FaArrowRight />
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
          {products.map((product) => {
            <ProductCard product={product} />;
          })}
        </div>
      </div>
    </CustomSection>
  );
}

export default Related;
