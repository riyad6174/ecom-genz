import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { FiGrid } from 'react-icons/fi';
import { MdFormatListBulleted } from 'react-icons/md';
import { GoChevronDown } from 'react-icons/go';
import Link from 'next/link';
import { addToCart } from '@/store/cartSlice';
import { products as staticProducts } from '@/utils/products';
import { useRouter } from 'next/router';
import Head from 'next/head';

function Products() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [allProducts, setAllProducts] = useState(staticProducts);
  const [filteredProducts, setFilteredProducts] = useState(staticProducts);
  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, Infinity],
    stockStatus: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetch('/api/public/products')
      .then((r) => r.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          setAllProducts(data.products);
          setFilteredProducts(data.products);
        }
      })
      .catch(() => {});
  }, []);

  const priceRanges = [
    { label: 'All Prices', value: [0, Infinity] },
    { label: 'BDT0 - BDT2000', value: [0, 2000] },
    { label: 'BDT2000 - BDT4000', value: [2000, 4000] },
    { label: 'BDT4000+', value: [4000, Infinity] },
  ];

  const stockStatuses = ['In Stock', 'Out of Stock'];

  useEffect(() => {
    let result = [...allProducts];

    if (filters.categories.length > 0) {
      result = result.filter((product) => {
        const category = product.category || (product.title.includes('Smart Watch') ? 'Smart Watches' : 'Smart Rings');
        return filters.categories.includes(category);
      });
    }

    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    if (filters.stockStatus.length > 0) {
      result = result.filter((product) => {
        const stock = product.inStock ? 'In Stock' : 'Out of Stock';
        return filters.stockStatus.includes(stock);
      });
    }

    switch (sortOption) {
      case 'newest':
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      case 'oldest':
        result.sort((a, b) => (a.id || 0) - (b.id || 0));
        break;
      case 'highPrice':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'lowPrice':
        result.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [filters, sortOption, allProducts]);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    setFilters({ ...filters, categories: updatedCategories });
  };

  const handlePriceRangeChange = (range) => {
    setFilters({ ...filters, priceRange: range });
  };

  const handleStockStatusChange = (status) => {
    const updatedStockStatus = filters.stockStatus.includes(status)
      ? filters.stockStatus.filter((s) => s !== status)
      : [...filters.stockStatus, status];
    setFilters({ ...filters, stockStatus: updatedStockStatus });
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const ProductCard = ({ product, viewMode }) => {
    const category = product.category || (product.title.includes('Smart Watch') ? 'Smart Watches' : 'Smart Rings');

    return (
      <>
        <div
          className={`bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg ${
            viewMode === 'list' ? 'flex w-full' : 'flex-col'
          }`}
        >
          {product.inStock ? (
            <Link href={`/product/${product.slug}`}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={`object-cover ${
                  viewMode === 'list'
                    ? 'w-32 h-32 rounded-l-lg'
                    : 'w-full h-48 rounded-t-lg'
                }`}
              />
            </Link>
          ) : (
            <img
              src={product.thumbnail}
              alt={product.title}
              className={`object-cover ${
                viewMode === 'list'
                  ? 'w-32 h-32 rounded-l-lg'
                  : 'w-full h-48 rounded-t-lg'
              }`}
            />
          )}

          <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
            {product.inStock ? (
              <Link href={`/product/${product.slug}`}>
                <h3
                  className={`text-sm font-semibold text-gray-800 line-clamp-1 ${
                    viewMode === 'list' ? 'text-base' : ''
                  }`}
                >
                  {product.title}
                </h3>
              </Link>
            ) : (
              <h3 className='text-sm font-semibold text-gray-800 line-clamp-1'>
                {product.title}
              </h3>
            )}

            <p className='text-xs text-gray-500 mt-1'>
              {category}
            </p>
            <div className='flex items-center gap-2 mt-2'>
              <p className='text-sm font-bold text-accent'>
                BDT{product.price.toFixed(2)}
              </p>
              {product.originalPrice > product.price && (
                <p className='text-xs text-gray-500 line-through'>
                  BDT{product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
            <p
              className={`text-xs ${
                product.inStock ? 'text-green-500' : 'text-red-500'
              } mt-1`}
            >
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            <div className='mt-auto flex items-center justify-center'>
              <Link
                href={`/product/${product.slug}`}
                disabled={!product.inStock}
                className={`mt-3 bg-accent text-center text-white py-2 px-4 rounded-lg text-sm font-semibold w-full ${
                  product.inStock
                    ? 'hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                } transition-colors`}
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <Head>
        <title>All Products | GenZ Shop</title>
        <meta name='description' content='Browse our full collection of products at GenZ Shop.' />
        <meta name='keywords' content='smart watches, smart rings, wearable gadgets, GenZ Shop, fashion tech, affordable electronics' />
        <meta name='robots' content='index, follow' />
        <meta name='author' content='GenZ Shop' />
        <link rel='canonical' href='https://www.genzshop.store/products' />
        <meta property='og:title' content='All Products | GenZ Shop' />
        <meta property='og:description' content='Explore our range of products at GenZ Shop.' />
        <meta property='og:image' content='https://www.genzshop.store/assets/footer-logo.png' />
        <meta property='og:url' content='https://www.genzshop.store/products' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='GenZ Shop' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='All Products | GenZ Shop' />
        <meta name='twitter:description' content='Shop the latest fashion tech at GenZ Shop.' />
        <meta name='twitter:image' content='https://www.genzshop.store/assets/footer-logo.png' />
      </Head>

      <Navbar />
      <div className='container mx-auto py-3 md:py-20 px-4 '>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='md:w-1/4'>
            <button
              onClick={toggleFilter}
              className='md:hidden bg-gray-700 text-white py-2 px-4  w-full text-sm font-semibold md:mb-4'
            >
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            <div
              className={`bg-white rounded-lg shadow-md p-6 ${
                isFilterOpen ? 'block' : 'hidden md:block'
              }`}
            >
              <h3 className='text-lg font-semibold mb-4'>Filters</h3>
              <div className='mb-6'>
                <h4 className='text-sm font-medium text-gray-700 mb-2'>Categories</h4>
                <div className='space-y-2'>
                  {['Smart Watches', 'Smart Rings'].map((category) => (
                    <label key={category} className='flex items-center gap-2 text-sm'>
                      <input
                        type='checkbox'
                        checked={filters.categories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className='h-4 w-4 text-blue-600 focus:ring-blue-500'
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>
              <div className='mb-6'>
                <h4 className='text-sm font-medium text-gray-700 mb-2'>Price Range</h4>
                <div className='space-y-2'>
                  {priceRanges.map((range) => (
                    <label key={range.label} className='flex items-center gap-2 text-sm'>
                      <input
                        type='radio'
                        name='priceRange'
                        checked={
                          filters.priceRange[0] === range.value[0] &&
                          filters.priceRange[1] === range.value[1]
                        }
                        onChange={() => handlePriceRangeChange(range.value)}
                        className='h-4 w-4 text-blue-600 focus:ring-blue-500'
                      />
                      {range.label}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className='text-sm font-medium text-gray-700 mb-2'>Stock Status</h4>
                <div className='space-y-2'>
                  {stockStatuses.map((status) => (
                    <label key={status} className='flex items-center gap-2 text-sm'>
                      <input
                        type='checkbox'
                        checked={filters.stockStatus.includes(status)}
                        onChange={() => handleStockStatusChange(status)}
                        className='h-4 w-4 text-blue-600 focus:ring-blue-500'
                      />
                      {status}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='md:w-3/4'>
            <div className='flex flex-row   items-start sm:items-center justify-between mb-6 gap-4'>
              <div className='flex items-center gap-4'>
                <span className='text-sm font-medium'>Sort by</span>
                <div className='relative'>
                  <select
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className='appearance-none bg-white border rounded-lg px-4 py-2 text-sm pr-8 cursor-pointer focus:ring-2 focus:ring-blue-500'
                  >
                    <option value='newest'>Newest</option>
                    <option value='oldest'>Oldest</option>
                    <option value='highPrice'>High Price</option>
                    <option value='lowPrice'>Low Price</option>
                  </select>
                  <GoChevronDown className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500' />
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-2 rounded-lg border ${
                    viewMode === 'grid'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-white'
                  }`}
                >
                  <FiGrid className='text-xl' />
                </button>
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`p-2 rounded-lg border ${
                    viewMode === 'list'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-white'
                  }`}
                >
                  <MdFormatListBulleted className='text-xl' />
                </button>
              </div>
            </div>
            <div
              className={`${
                viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'
                  : 'flex flex-col gap-4'
              }`}
            >
              {filteredProducts.length === 0 ? (
                <p className='text-gray-500 col-span-full text-center'>
                  No products found.
                </p>
              ) : (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id || product._id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
