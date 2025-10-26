import React from 'react';
import ProductCard from '../product/ProductCard';
import products from '@/utils/products';

function ProductSection() {
  return (
    <div className='container py-5 grid grid-cols-5 gap-5'>
      {products.map((product) => {
        <ProductCard product={product} />;
      })}
    </div>
  );
}

export default ProductSection;
