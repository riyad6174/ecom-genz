import React, { useState } from 'react';
import CustomSection from '../layout/CustomSection';
import { FaStar } from 'react-icons/fa6';
import { BiLike } from 'react-icons/bi';

function ReviewAndDescription() {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <>
      <CustomSection>
        <div className='bg-white p-5 rounded-lg'>
          {/* Tabs */}
          <div className='flex font-mont font-semibold justify-center items-center gap-6'>
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-2 ${
                activeTab === 'description'
                  ? 'border-b-2 border-gray-700 text-gray-800'
                  : 'text-gray-500'
              }`}
            >
              Description
            </button>
            {/* <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-gray-700 text-gray-800'
                  : 'text-gray-500'
              }`}
            >
              Reviews (45)
            </button> */}
          </div>

          {/* Content based on Active Tab */}
          {activeTab === 'description' && (
            <div className='mt-10'>
              <p className='text-gray-600 font-mont text-sm'>
                Introducing Quiet Clicks - get creative and perform with the
                same click feel, but with less noise. Quiet Clicks deliver
                satisfyingly soft visual feedback with 90% less noise. Add this
                feature to MagSpeed's remarkably quiet solenoid coil for a
                distraction-free high-performance experience. The all-new
                MagSpeed solenoid scrolling is precise enough to stop at a pixel
                and fast enough to scroll 1,000 lines per second. And it's
                almost quiet. The wheel's machined steel material is perfectly
                rough and heavy enough to create a dynamic force of inertia that
                you can feel - but not hear.
              </p>
              <p className='py-5 text-gray-600 font-mont text-sm'>
                Key Features:
              </p>
              <ul className='list-disc list-inside text-gray-600 font-mont text-sm'>
                <li>Effective noise reduction</li>
                <li>Smart Bluetooth</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className='mt-10'>
              {/* Single Review */}
              {[1, 2].map((review, index) => (
                <div
                  key={index}
                  className='grid grid-cols-8 gap-4 py-8 border-b'
                >
                  <div className='col-span-1'>
                    <div className='flex flex-col items-start gap-2'>
                      <img
                        src='/assets/product/product2.png'
                        alt='Product'
                        className='w-20 h-20 rounded-md object-cover'
                      />
                      <div className='font-mont'>
                        <h4 className='font-semibold text-gray-800 text-sm'>
                          Esther Howard
                        </h4>
                        <div className='flex pt-2'>
                          {[1, 2, 3, 4].map((_, idx) => (
                            <FaStar
                              key={idx}
                              className='text-sm text-yellow-500'
                            />
                          ))}
                          <FaStar className='text-sm text-gray-500' />
                        </div>
                        <p className='text-gray-500 text-xs py-2'>
                          2022-12-08 | 13:45
                        </p>
                        <p className='text-xs font-semibold'>25 Likes</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-7'>
                    <p className='text-gray-600 font-mont text-sm'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation.
                    </p>
                    <div className='flex items-center justify-start gap-3 py-5'>
                      {[1, 2, 3].map((_, idx) => (
                        <img
                          key={idx}
                          src='/assets/product/product2.png'
                          alt='Product'
                          className='w-20 h-20 rounded-md object-cover'
                        />
                      ))}
                    </div>
                    <div>
                      <button
                        className={`px-4 py-1 flex items-center gap-2 rounded-lg ${
                          index === 0
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <BiLike
                          className={`${
                            index === 0 ? 'text-white' : 'text-gray-500'
                          } text-lg`}
                        />
                        <span>{index === 0 ? 'Liked' : 'Like'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CustomSection>
    </>
  );
}

export default ReviewAndDescription;
