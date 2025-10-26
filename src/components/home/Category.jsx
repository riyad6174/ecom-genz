import React from 'react';
import CustomSection from '../layout/CustomSection';
import SectionTitle from '../common/SectionTitle';
import { FaArrowRight } from 'react-icons/fa6';

function Category() {
  return (
    <div className='px-6 md:px-0 py-2 md:py-0'>
      <CustomSection>
        <div className='flex items-center justify-between md:py-8'>
          <div className='flex items-center justify-start gap-4'>
            <h2 className='text-lg md:text-2xl py-2 md:py-0 font-semibold text-[#212B36]'>
              Category
            </h2>
          </div>
          <div className='flex items-center justify-center gap-3 text-xs font-semibold'>
            <span>More</span>
            <span>
              <FaArrowRight />
            </span>
          </div>
        </div>
        <div className='flex overflow-x-auto md:overflow-x-hidden md:grid md:grid-cols-7 gap-8'>
          {/* brand card */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-[70px] p-2 h-[70px] md:w-[160px] md:h-[160px] flex items-center justify-center   bg-white rounded-xl'>
              <img src='/assets/category/tshirt.png' alt='' />
            </div>
            <p className='py-2'>T Shirt</p>
          </div>
          {/* brand card */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-[70px] p-2 h-[70px] md:w-[160px] md:h-[160px] flex items-center justify-center   bg-white rounded-xl'>
              <img src='/assets/category/shorts.png' alt='' />
            </div>
            <p className='py-2'>Shorts</p>
          </div>
          {/* brand card */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-[70px] p-2 h-[70px] md:w-[160px] md:h-[160px] flex items-center justify-center   bg-white rounded-xl'>
              <img src='/assets/category/dress.png' alt='' />
            </div>
            <p className='py-2'>Dress</p>
          </div>
          {/* brand card */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-[70px] p-2 h-[70px] md:w-[160px] md:h-[160px] flex items-center justify-center   bg-white rounded-xl'>
              <img src='/assets/category/cap.png' alt='' />
            </div>
            <p className='py-2'>Cap</p>
          </div>
          {/* brand card */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-[70px] p-2 h-[70px] md:w-[160px] md:h-[160px] flex items-center justify-center   bg-white rounded-xl'>
              <img src='/assets/category/tshirt.png' alt='' />
            </div>
            <p className='py-2'>Shirt</p>
          </div>
          {/* brand card */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-[70px] p-2 h-[70px] md:w-[160px] md:h-[160px] flex items-center justify-center   bg-white rounded-xl'>
              <img src='/assets/category/hat.png' alt='' />
            </div>
            <p className='py-2'>Hat</p>
          </div>
          {/* brand card */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-[70px] p-2 h-[70px] md:w-[160px] md:h-[160px] flex items-center justify-center   bg-white rounded-xl'>
              <img src='/assets/category/tie.png' alt='' />
            </div>
            <p className='py-2'>Tie</p>
          </div>
        </div>
      </CustomSection>
    </div>
  );
}

export default Category;
