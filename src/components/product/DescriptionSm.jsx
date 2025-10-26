import React, { useState } from 'react';
import CustomSection from '../layout/CustomSection';
import { FaStar } from 'react-icons/fa6';
import { BiLike } from 'react-icons/bi';

function DescriptionSm() {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <>
      <CustomSection>
        <div className='px-3 '>
          <div className='bg-white p-5  rounded-lg'>
            {/* Tabs */}
            <div className='flex justify-between items-center mb-3'>
              <h2 className='text-lg font-semibold'>Description</h2>
            </div>
            {/* Content based on Active Tab */}

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
          </div>
        </div>
      </CustomSection>
    </>
  );
}

export default DescriptionSm;
