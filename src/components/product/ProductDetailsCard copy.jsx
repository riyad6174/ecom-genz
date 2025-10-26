import React from 'react';
import { CiShop } from 'react-icons/ci';
import { FaRegStarHalfStroke } from 'react-icons/fa6';
import { TbShoppingCartPlus } from 'react-icons/tb';
import { RiPokerHeartsLine } from 'react-icons/ri';
import { GoShareAndroid } from 'react-icons/go';
function ProductDetailsCard() {
  return (
    <div>
      {' '}
      <div className=' py-8 container'>
        <div className=' mx-auto px-4 sm:px-6 lg:px-8 bg-white py-6 rounded-xl'>
          <div className='flex flex-col md:flex-row gap-5 -mx-4'>
            <div className='w-3/4 '>
              <div className=' grid grid-cols-4 gap-4'>
                <div className='col-span-1'>
                  <div className='flex items-center justify-center flex-col gap-4'>
                    <img
                      className='w-full h-[167px] object-cover rounded-2xl'
                      src='/assets/product/product2.png'
                      alt='Product'
                    />
                    <img
                      className='w-full h-[167px] object-cover rounded-2xl'
                      src='/assets/product/product2.png'
                      alt='Product'
                    />
                    <img
                      className='w-full h-[167px] object-cover rounded-2xl'
                      src='/assets/product/product2.png'
                      alt='Product'
                    />
                  </div>
                </div>
                <div className='col-span-3'>
                  <img
                    className='w-full h-[535px] object-cover rounded-2xl '
                    src='/assets/product/product2.png'
                    alt='Product'
                  />
                </div>
              </div>
            </div>
            <div className='w-1/2 px-4'>
              <h2 className='text-2xl  font-semibold font-mont text-gray-800 mb-4'>
                Men’s Artificial leather Jacket
              </h2>
              <p className='text-gray-600 text-sm mb-4 font-mont'>
                Feel every moment of your workflow with precision,
                visualization, and performance
              </p>
              {/* <div className='flex mb-4'>
              <div className='mr-4'>
                <span className='font-bold text-gray-700'>Price:</span>
                <span className='text-gray-600'> $29.99</span>
              </div>
              <div>
                <span className='font-bold text-gray-700'>Availability:</span>
                <span className='text-gray-600'> In Stock</span>
              </div>
            </div> */}

              <div className='mb-6'>
                <span className='font-semibold text-gray-700'> Size</span>
                <div className='flex items-center mt-4 '>
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      className=' text-gray-400 text-sm border-2 py-2 px-5 rounded-full  mr-2 hover:bg-gray-100'
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className='mb-6'>
                <span className='font-semibold text-gray-700'> Color</span>
                <div className='flex items-center gap-3 mt-4'>
                  <div className='border-2 flex items-center justify-center rounded-full p-1'>
                    <button className='w-[30px] h-[30px]    rounded-full bg-gray-800 '></button>
                  </div>
                  <div className='border-2 flex items-center justify-center rounded-full p-1'>
                    <button className='w-[30px] h-[30px]    rounded-full bg-orange-500 '></button>
                  </div>
                  <div className='border-2 flex items-center justify-center rounded-full p-1'>
                    <button className='w-[30px] h-[30px]    rounded-full bg-gray-300 '></button>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-start gap-4 text-md mb-6'>
                <div className='flex text-sm items-center justify-between gap-2 text-blue-600  bg-gray-200 px-3 py-2 rounded-md'>
                  <CiShop className='text-2xl ' />
                  <span className='font-semibold'>Adidas</span>
                </div>
                <div className='w-[2px] h-3 bg-gray-400'></div>

                <div className='flex text-sm items-center justify-between gap-2 font-mont font-medium'>
                  <FaRegStarHalfStroke className='text-yellow-500' />
                  <span>45 Reviews</span>
                </div>
                <div className='w-[2px] h-3 bg-gray-400'></div>

                <div className='flex text-sm items-center justify-between gap-2 bg-gray-200 px-3 py-1 rounded-md'>
                  <span>482 </span>
                  <span>Sold</span>
                </div>
              </div>
              {/* price */}

              <div className='flex items-center justify-start gap-2 text-md mb-6'>
                <span className='text-accent font-bold text-xl'>$385.00</span>
                <span className='text-gray-500 font-normal text-lg line-through'>
                  $485.00
                </span>
              </div>
              {/* qunatity */}
              <div className='flex items-center justify-start gap-4 mb-6'>
                <form class=' '>
                  <div class='relative flex items-center max-w-[8rem] border border-gray-400 rounded-lg bg-white'>
                    <button
                      type='button'
                      id='decrement-button'
                      data-input-counter-decrement='quantity-input'
                      class='  hover:bg-gray-200  rounded-s-lg py-3 px-4 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none'
                    >
                      <svg
                        class='w-2 h-2 text-gray-900 '
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 18 2'
                      >
                        <path
                          stroke='currentColor'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M1 1h16'
                        />
                      </svg>
                    </button>
                    <input
                      type='text'
                      id='quantity-input'
                      data-input-counter
                      aria-describedby='helper-text-explanation'
                      class='  h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5'
                      placeholder='999'
                      required
                      value={1}
                    />
                    <button
                      type='button'
                      id='increment-button'
                      data-input-counter-increment='quantity-input'
                      class='  hover:bg-gray-200  rounded-e-lg py-3 px-4 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none'
                    >
                      <svg
                        class='w-2 h-2 text-gray-900 '
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 18 18'
                      >
                        <path
                          stroke='currentColor'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M9 1v16M1 9h16'
                        />
                      </svg>
                    </button>
                  </div>
                </form>
                <div className='flex items-center justify-center gap-2 border border-gray-600 px-6 py-[12px] rounded-md font-mont font-semibold text-sm'>
                  <span>
                    <TbShoppingCartPlus />
                  </span>
                  <span>Add to Cart</span>
                </div>
                <div className='flex items-center bg-primary text-white justify-center gap-2 border border-primary px-6 py-[12px] rounded-md font-mont font-semibold text-sm'>
                  <span>Buy Now</span>
                </div>
              </div>
              {/* share */}
              <div className='flex items-center justify-start gap-4'>
                <div className=' border border-gray-300 p-1 rounded-lg'>
                  <RiPokerHeartsLine className='text-2xl ' />
                </div>
                <div className=' border border-gray-300 p-1 rounded-lg'>
                  <GoShareAndroid className='text-2xl ' />
                </div>
                <span className='font-mont text-xs font-medium pl-6'>
                  (There are 24 products left)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
