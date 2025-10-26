import React from 'react';
import { FaInfo } from 'react-icons/fa';
import { MdInfo } from 'react-icons/md';
function RewardPointCard() {
  return (
    <div className='p-4 bg-white rounded-lg shadow-sm border'>
      <div className='flex items-start justify-start gap-2'>
        <div className=' border font-semibold rounded-full w-9 h-9 text-xs flex items-center justify-center'>
          <img src='/assets/icon/reward.png' alt='' />
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-sm text-gray-500 '>Reward Points</span>
          <span className='text-sm text-gray-700 font-bold'>120/500</span>
        </div>
      </div>

      <div className='py-4'>
        <div class='w-full bg-gray-200 rounded-full h-2 '>
          <div
            class='bg-primary h-2 rounded-full'
            style={{ width: '25%' }}
          ></div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <div className='bg-green-100 rounded-md py-3 text-greenText flex-col flex items-center justify-center'>
          <span className='text-lg font-bold'>10</span>
          <span className='text-xs  font-bold'>Total Referrals</span>
        </div>
        <div className='bg-orange-100 rounded-md py-3 text-accent flex-col flex items-center justify-center'>
          <span className='text-lg font-bold'>34</span>
          <span className='text-xs  font-bold'>Total Referrals</span>
        </div>
      </div>
    </div>
  );
}

export default RewardPointCard;
