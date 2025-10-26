import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const HeroSlider = () => {
  return (
    <>
      {/* Mobile View - Image Slider */}
      <div className='px-6 pt-6  md:hidden'>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, el: '.hero-pagination' }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={1000}
          className='h-[183px] w-full rounded-xl overflow-hidden'
        >
          <SwiperSlide>
            <img
              src='/assets/banner/image1.png'
              alt='Winter Collection'
              className='h-full w-full object-cover rounded-xl'
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src='/assets/banner/image2.png'
              alt='Winter Collection Slide 2'
              className='h-full w-full object-cover rounded-xl'
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src='/assets/banner/image3.png'
              alt='Winter Collection Slide 3'
              className='h-full w-full object-cover rounded-xl'
            />
          </SwiperSlide>
        </Swiper>

        {/* Custom Pagination */}
        <div className='hero-pagination flex items-center justify-center py-3 gap-[5px]'></div>
      </div>

      {/* Custom Pagination Styling (ONLY for this section) */}
      <style jsx>{`
        .hero-pagination :global(.swiper-pagination-bullet) {
          width: 10px;
          padding: 3px;
          height: 10px;
          background: #aaa;
          opacity: 1;
          border-radius: 50%;
          transition: all 0.3s ease-in-out;
        }

        .hero-pagination :global(.swiper-pagination-bullet-active) {
          width: 30px;
          height: 10px;
          border-radius: 5px;
          background: #4169e1;
        }
      `}</style>
    </>
  );
};

export default HeroSlider;
