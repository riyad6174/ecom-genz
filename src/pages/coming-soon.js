import Navbar from '@/components/common/Navbar';
import Link from 'next/link';
import React from 'react';

function coming_soon() {
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
            {/* <span class='text-gray-500 border-b-2 border-indigo-600 uppercase'>
              Coming Soon
            </span> */}
            <h2 class='my-4 font-bold text-3xl  sm:text-4xl '>
              Coming <span class='text-primary'>Soon!</span>
            </h2>
            <p class='text-gray-700'>
              We are working on something amazing. Stay tuned!
            </p>
            <Link href='/'>
              <button className='px-4 my-6 py-2 rounded-md bg-primary text-white text-sm'>
                Home{' '}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default coming_soon;
