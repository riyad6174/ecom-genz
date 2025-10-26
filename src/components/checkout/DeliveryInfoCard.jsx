import React from 'react';
import { IoLocation } from 'react-icons/io5';
import { HiOutlinePlus } from 'react-icons/hi2';
function DeliveryInfoCard() {
  return (
    <div>
      <div className='flex items-start justify-start gap-2'>
        <IoLocation className='text-primary text-xl' />
        <span className='text-xs font-semibold text-gray-600'>Home</span>
      </div>
      <span className='px-7 text-gray-500 text-xs'>
        House no-L36,Road no- S/1,Eastarn Housing, Pallabi 2nd phase, Mirpur,
        Dhaka
      </span>
      <img src='/assets/checkout/map.png' className='py-3' />
      <div className='py-1 flex items-center gap-2'>
        <HiOutlinePlus className='text-primary' />
        <span className='text-xs text-primary'>Add delivery instruction</span>
      </div>
    </div>
  );
}

export default DeliveryInfoCard;
