import React, { useState } from 'react';
import { BsGiftFill } from 'react-icons/bs';

function ReferAndEarn() {
  const [activeTab, setActiveTab] = useState('referrals');

  return (
    <div>
      <span className='font-bold'>Refer And Earn</span>
      <div className='flex items-center justify-start gap-3 py-5'>
        <button
          className={`px-5 text-sm py-2 border font-semibold rounded-lg ${
            activeTab === 'referrals'
              ? 'bg-blue-50 text-primary border-primary'
              : 'bg-white text-gray-500 border-gray-500'
          }`}
          onClick={() => setActiveTab('referrals')}
        >
          Referrals
        </button>
        <button
          className={`px-5 text-sm py-2 border font-semibold rounded-lg ${
            activeTab === 'history'
              ? 'bg-blue-50 text-primary border-primary'
              : 'bg-white text-gray-500 border-gray-500'
          }`}
          onClick={() => setActiveTab('history')}
        >
          Referrals History
        </button>
      </div>
      {/* Show content based on active tab */}
      {activeTab === 'referrals' && (
        <div className='bg-white rounded-lg p-4'>
          <div className='flex items-center justify-between gap-4 border rounded-lg p-2'>
            <div className='flex items-center justify-start gap-4'>
              <div className='w-10 h-10'>
                <img
                  src='/assets/order/user.png'
                  alt='User Avatar'
                  className='object-cover'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-semibold'>Hasan Mahmud</span>
                <span className='text-xs text-gray-500'>
                  +8801***323 | 10, Oct 2024
                </span>
              </div>
            </div>
            <div>
              <button className='bg-[#DBA32A] text-xs px-4 py-2 text-white rounded-lg'>
                Pending
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'history' && (
        <div className='bg-white rounded-lg p-4'>
          <div className='flex items-center justify-between gap-4 border rounded-lg p-2'>
            <div className='flex items-center justify-start gap-3'>
              <div className='p-2 bg-red-100 rounded-lg'>
                <BsGiftFill className='text-xl text-red-600' />
              </div>
              <span className='text-xs text-gray-500'>
                You earned 100 for referring +8801***323
              </span>
            </div>
            <div className='flex flex-col items-end'>
              <div>
                <span className='bg-[#FF4423] text-xs px-2 text-white rounded-sm'>
                  100
                </span>
              </div>
              <span className='text-xs text-gray-500'>10, Oct 2024</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReferAndEarn;
