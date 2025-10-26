import Navbar from '@/components/common/Navbar';
import React from 'react';

function about_us() {
  return (
    <div>
      <Navbar />
      <div class='sm:flex items-center max-w-screen-xl'>
        <div class='sm:w-1/2 p-10'>
          <div class='image object-center text-center'>
            <img src='https://i.imgur.com/WbQnbas.png' />
          </div>
        </div>
        <div class='sm:w-1/2 p-5'>
          <div class='text'>
            <span class='text-gray-500 border-b-2 border-indigo-600 uppercase'>
              About us
            </span>
            <h2 class='my-4 font-bold text-3xl  sm:text-4xl '>
              About <span class='text-primary'>GenZ Shop</span>
            </h2>
            <p class='text-gray-700'>
              Founded in 2025, GenZ Shop is your go-to destination for stylish,
              high-quality, and innovative products that elevate everyday
              living. Specializing in imported accessories, cutting-edge
              devices, home essentials, and trendy must-haves, we curate a
              collection that blends functionality with flair. <br /> <br /> Our
              mission is simple: to delight our customers with reliable,
              fashionable, and forward-thinking goods that inspire and enhance
              their lifestyle. At GenZ Shop, we’re committed to exceptional
              quality, seamless shopping experiences, and bringing global trends
              right to your doorstep. <br /> Join us on this journey to redefine
              everyday elegance—shop with GenZ, where style meets innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default about_us;
