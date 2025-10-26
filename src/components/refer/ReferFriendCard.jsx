import React from 'react';
import { FaInfo } from 'react-icons/fa';
import { MdInfo } from 'react-icons/md';
function ReferFriendCard() {
  return (
    <div className='p-4 bg-white rounded-lg shadow-sm border'>
      <div className='flex flex-col items-start justify-start gap-2'>
        <div className='flex items-center justify-start gap-2'>
          <span className='text-sm font-semibold'>Refer a Friend</span>
          <MdInfo className='text-xl text-primary' />
        </div>
        <p className='text-gray-500 text-sm'>
          One Successful Refer get 💎 100 points
        </p>
      </div>
      <div className='hidden md:flex items-center justify-between gap-2 py-5'>
        <div className='flex items-start justify-start gap-2'>
          <div className=' border font-semibold rounded-full w-9 h-9 text-xs flex items-center justify-center'>
            1
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm font-semibold'>Refer a Friend</span>
            <span className='text-sm text-gray-500'>
              Just share link or invite by email
            </span>
          </div>
        </div>
        <div className='flex items-start justify-start gap-2'>
          <div className='font-semibold border rounded-full w-9 h-9 text-xs flex items-center justify-center'>
            2
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm font-semibold'>Your Friend signs up</span>
            <span className='text-sm text-gray-500'>
              Just share link or invite by email
            </span>
          </div>
        </div>
        <div className='flex items-start justify-start gap-2'>
          <div className='font-semibold border rounded-full w-9 h-9 text-xs flex items-center justify-center'>
            3
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm font-semibold'>
              Your Friend Completes first order
            </span>
            <span className='text-sm text-gray-500'>
              Just share link or invite by email
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferFriendCard;
