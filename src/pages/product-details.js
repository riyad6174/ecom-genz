import React from 'react';

import Navbar from '@/components/common/Navbar';
import ProductDetailsCard from '@/components/product/ProductDetailsCard';
import ReviewAndDescription from '@/components/product/ReviewAndDescription';
import Related from '@/components/checkout/Related';
import ReviewSm from '@/components/product/ReviewSm';
import DescriptionSm from '@/components/product/DescriptionSm';
const ProductDetails = () => {
  return (
    <>
      <Navbar />
      <ProductDetailsCard />
      <div className='hidden md:block'>
        <ReviewAndDescription />
      </div>
      <div className='block md:hidden'>
        <DescriptionSm />
      </div>

      <Related />
    </>
  );
};

export default ProductDetails;
