import React from 'react';
import { FaInfo } from 'react-icons/fa';
import { MdInfo } from 'react-icons/md';
function HowItWorks() {
  return (
    <div className='p-4 bg-white  rounded-lg shadow-sm border border-primary'>
      <div className='flex flex-col items-start justify-start gap-2'>
        <div className='flex items-center justify-start gap-2'>
          <span className='text-sm font-semibold'>How it works?</span>
          <MdInfo className='text-xl text-primary' />
        </div>
      </div>
      <div className='flex items-center justify-between gap-2 py-5'>
        <div className='flex items-start justify-start gap-3'>
          <div className='  flex items-center justify-center '>
            <img src='/assets/icon/signup.png' alt='' />
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm font-semibold'>Sign up</span>
            <span className='text-sm text-gray-500'>
              Start by sign up the form
            </span>
          </div>
        </div>
        <div className='flex items-start justify-start gap-3'>
          <div className='  flex items-center justify-center '>
            <img src='/assets/icon/recommend.png' alt='' />
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm font-semibold'>Recommend Product</span>
            <span className='text-sm text-gray-500'>
              Share affiliate product link
            </span>
          </div>
        </div>
        <div className='flex items-start justify-start gap-3'>
          <div className='  flex items-center justify-center '>
            <img src='/assets/icon/earn.png' alt='' />
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm font-semibold'>Earn money</span>
            <span className='text-sm text-gray-500'>
              After successful purchase you <br /> get the incentive
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
