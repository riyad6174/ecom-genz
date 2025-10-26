import React from 'react';
import CustomSection from '../layout/CustomSection';
import { MdArrowDropDown } from 'react-icons/md';
function ReportDashboard() {
  return (
    <CustomSection>
      <div className='bg-white p-4 rounded-lg'>
        {/* title */}
        <div className='flex items-center justify-start gap-5 py-2'>
          <span className='font-bold text-lg'>My Dashboard</span>
          <button className='flex gap-3 px-2 text-sm py-2 border font-semibold rounded-md bg-white text-gray-500 border-gray-500'>
            <span className='text-xs'>Day</span>
            <MdArrowDropDown className='text-gray-600' />
          </button>
        </div>

        <div className='grid grid-cols-2 gap-2 py-3'>
          <div className='bg-green-100 rounded-md py-3 text-greenText flex-col flex items-center justify-center'>
            <span className='text-lg font-bold'>10</span>
            <span className='text-xs  font-bold'>Conversion</span>
          </div>
          <div className='bg-orange-100 rounded-md py-3 text-accent flex-col flex items-center justify-center'>
            <span className='text-lg font-bold'>34</span>
            <span className='text-xs  font-bold'>Total click</span>
          </div>
        </div>
        <hr className='mt-2' />

        <div className='py-4'>
          <span className='font-bold text-lg'>Refer Product</span>
        </div>

        <div>
          <label className='text-sm text-gray-500'>Short Product Link</label>
          <div className='relative'>
            <input
              type='text'
              name=''
              id=''
              placeholder='https://www.example.com'
              className=' border-2 w-full rounded-md py-2 mt-2 px-4 placeholder:text-sm bg-[#fefeff]'
            />
            <button className='absolute right-4 top-[18px] bg-black text-xs text-white px-3 py-1 rounded-xl'>
              Generate Link
            </button>
          </div>
        </div>
        <div className='py-4'>
          <span className='font-bold text-lg'>History</span>
        </div>
        <div className='bg-white rounded-lg p-2'>
          <div className='flex items-center justify-between gap-4 border rounded-lg p-2'>
            <div className='flex items-center justify-start gap-4'>
              <div className='w-10 h-10'>
                <img
                  src='/assets/order/user.png'
                  alt='User Avatar'
                  className='object-cover'
                />
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-sm font-semibold'>Macbook Pro M1</span>
                <span className='text-xs text-gray-500'>
                  https://abc.com/zyz
                </span>
                <span className='text-xs text-gray-500'>
                  Total Earning: <span className='font-bold '>$50</span>
                </span>
              </div>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <button className='bg-greenText text-xs px-4 py-2 text-white rounded-lg'>
                3
              </button>
              <button className='bg-accent text-xs px-4 py-2 text-white rounded-lg'>
                16
              </button>
            </div>
          </div>
        </div>
      </div>
    </CustomSection>
  );
}

export default ReportDashboard;
