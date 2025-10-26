import Link from 'next/link';
import React from 'react';
import { HiArrowRight } from 'react-icons/hi2';

function SectionTitle({
  title = 'Section Title',
  showbtn = true,
  btnName = 'More',
  link = '/',
}) {
  return (
    <div className='py-5 flex itemes-center justify-between'>
      <h2 className=' text-3xl text-sectionText font-bold'>{title}</h2>
      {showbtn && (
        <Link
          href={link}
          className='flex items-center gap-2 text-xs font-semibold'
        >
          <span>{btnName}</span>
          <span>
            <HiArrowRight />
          </span>
        </Link>
      )}
    </div>
  );
}

export default SectionTitle;
