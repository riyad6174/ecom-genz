import React, { useState } from 'react';

const ProductFilter = ({
  categories,
  priceRanges,
  onFilterChange,
  currentFilters,
}) => {
  const [selectedCategories, setSelectedCategories] = useState(
    currentFilters.categories
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState(
    currentFilters.priceRange
  );

  // Handle category checkbox changes
  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    onFilterChange({
      categories: updatedCategories,
      priceRange: selectedPriceRange,
    });
  };

  // Handle price range selection
  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
    onFilterChange({
      categories: selectedCategories,
      priceRange: range,
    });
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h3 className='text-lg font-semibold mb-4'>Filters</h3>
      {/* Categories */}
      <div className='mb-6'>
        <h4 className='text-sm font-medium text-gray-700 mb-2'>Categories</h4>
        <div className='space-y-2'>
          {categories.map((category) => (
            <label key={category} className='flex items-center gap-2 text-sm'>
              <input
                type='checkbox'
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500'
              />
              {category}
            </label>
          ))}
        </div>
      </div>
      {/* Price Range */}
      <div>
        <h4 className='text-sm font-medium text-gray-700 mb-2'>Price Range</h4>
        <div className='space-y-2'>
          {priceRanges.map((range) => (
            <label
              key={range.label}
              className='flex items-center gap-2 text-sm'
            >
              <input
                type='radio'
                name='priceRange'
                checked={
                  selectedPriceRange[0] === range.value[0] &&
                  selectedPriceRange[1] === range.value[1]
                }
                onChange={() => handlePriceRangeChange(range.value)}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500'
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
