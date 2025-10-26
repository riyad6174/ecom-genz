import React from 'react';
import CustomSection from '../layout/CustomSection';
import { FaChevronRight } from 'react-icons/fa6';
import Link from 'next/link';

function Refer() {
  return (
    <div className='px-6 md:px-0 py-4 md:py-0'>
      <CustomSection>
        <Link
          href='/contact-us'
          className='px-3 md:px-10 rounded-md flex items-center justify-between bg-white py-6'
        >
          <div>
            <p className='font-bold text-black text-sm md:text-lg'>
              Have a Question?
            </p>
            <p className='text-xs md:tex-sm text-gray-500'>
              Feel Free to reach out to us for any queries or assistance. We are
              here to help you.
            </p>
          </div>
          <FaChevronRight className='text-gray-4  00' />
        </Link>
      </CustomSection>
    </div>
  );
}

export default Refer;
