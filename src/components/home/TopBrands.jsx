import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import CustomSection from '../layout/CustomSection';
import SectionTitle from '../common/SectionTitle';
import { Autoplay } from 'swiper/modules';
import { FaArrowRight } from 'react-icons/fa6';
function TopBrands() {
  return (
    <div className='px-6 md:px-0'>
      <CustomSection>
        <div className='flex items-center justify-between  md:py-8'>
          <div className='flex items-center justify-start gap-4'>
            <h2 className='text-lg md:text-2xl py-2 md:py-0 font-semibold text-[#212B36]'>
              Top Brands
            </h2>
          </div>
          <div className='flex items-center justify-center gap-3 text-xs font-semibold'>
            <span>More</span>
            <span>
              <FaArrowRight />
            </span>
          </div>
        </div>

        <div className='relative'>
          <Swiper
            modules={[Autoplay]} // Use Autoplay module correctly
            spaceBetween={16}
            slidesPerView={7} // Adjust the number of slides per view
            loop={true} // Infinite loop
            autoplay={{
              delay: 3000, // Slide every 3 seconds
              disableOnInteraction: false, // Keep autoplay going even after interaction
            }}
            breakpoints={{
              320: { slidesPerView: 5 }, // Mobile
              480: { slidesPerView: 5 }, // Small devices
              768: { slidesPerView: 5 }, // Tablets
              1024: { slidesPerView: 5 }, // Small desktops
              1280: { slidesPerView: 7 }, // Large screens
            }}
            className='w-full'
          >
            {/* Brand Cards */}
            <SwiperSlide>
              <div className='flex flex-col justify-center items-center'>
                <div className=' w-[65px] p-2 h-[65px] md:w-[160px] md:h-[160px] flex items-center justify-center bg-white rounded-xl'>
                  <img src='/assets/brands/adidas.png' alt='' />
                </div>
                <p className='py-1 md:py-2 text-xs md:text-sm'>Adidas</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='flex flex-col justify-center items-center'>
                <div className=' w-[65px] p-2 h-[65px] md:w-[160px] md:h-[160px] flex items-center justify-center bg-white rounded-xl'>
                  <img src='/assets/brands/nike.png' alt='' />
                </div>
                <p className='py-1 md:py-2 text-xs md:text-sm'>Nike</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='flex flex-col justify-center items-center'>
                <div className=' w-[65px] p-2 h-[65px] md:w-[160px] md:h-[160px] flex items-center justify-center bg-white rounded-xl'>
                  <img src='/assets/brands/puma.png' alt='' />
                </div>
                <p className='py-1 md:py-2 text-xs md:text-sm'>Puma</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='flex flex-col justify-center items-center'>
                <div className=' w-[65px] p-2 h-[65px] md:w-[160px] md:h-[160px] flex items-center justify-center bg-white rounded-xl'>
                  <img src='/assets/brands/asos.png' alt='' />
                </div>
                <p className='py-1 md:py-2 text-xs md:text-sm'>Xiaomi </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='flex flex-col justify-center items-center'>
                <div className=' w-[65px] p-2 h-[65px] md:w-[160px] md:h-[160px] flex items-center justify-center bg-white rounded-xl'>
                  <img src='/assets/brands/spalding.png' alt='' />
                </div>
                <p className='py-1 md:py-2 text-xs md:text-sm'>Spalding</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='flex flex-col justify-center items-center'>
                <div className=' w-[65px] p-2 h-[65px] md:w-[160px] md:h-[160px] flex items-center justify-center bg-white rounded-xl'>
                  <img src='/assets/brands/puma.png' alt='' />
                </div>
                <p className='py-1 md:py-2 text-xs md:text-sm'>Puma</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='flex flex-col justify-center items-center'>
                <div className=' w-[65px] p-2 h-[65px] md:w-[160px] md:h-[160px] flex items-center justify-center bg-white rounded-xl'>
                  <img src='/assets/brands/nike.png' alt='' />
                </div>
                <p className='py-1 md:py-2 text-xs md:text-sm'>Nike</p>
              </div>
            </SwiperSlide>
            {/* Repeat the brands to create a seamless loop */}
            <SwiperSlide>
              <div className='flex flex-col justify-center items-center'>
                <div className=' w-[65px] p-2 h-[65px] md:w-[160px] md:h-[160px] flex items-center justify-center bg-white rounded-xl'>
                  <img src='/assets/brands/adidas.png' alt='' />
                </div>
                <p className='py-1 md:py-2 text-xs md:text-sm'>Adidas</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='flex flex-col justify-center items-center'>
                <div className=' w-[65px] p-2 h-[65px] md:w-[160px] md:h-[160px] flex items-center justify-center bg-white rounded-xl'>
                  <img src='/assets/brands/nike.png' alt='' />
                </div>
                <p className='py-1 md:py-2 text-xs md:text-sm'>Nike</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='flex flex-col justify-center items-center'>
                <div className=' w-[65px] p-2 h-[65px] md:w-[160px] md:h-[160px] flex items-center justify-center bg-white rounded-xl'>
                  <img src='/assets/brands/puma.png' alt='' />
                </div>
                <p className='py-1 md:py-2 text-xs md:text-sm'>Puma</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </CustomSection>
    </div>
  );
}

export default TopBrands;
