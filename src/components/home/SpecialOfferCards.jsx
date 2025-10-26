import React from 'react';

function SpecialOfferCard() {
  return (
    <div className='overflow-x-auto whitespace-nowrap py-4 md:hidden flex items-center gap-5 scrollbar-hide'>
      <div className='min-w-[220px] w-56 rounded-lg flex-shrink-0'>
        <img
          src='/assets/shopDetails/special-offer.png'
          className='w-full h-full object-cover rounded-lg'
        />
      </div>
      <div className='min-w-[220px] w-56 rounded-lg flex-shrink-0'>
        <img
          src='/assets/shopDetails/special-offer.png'
          className='w-full h-full object-cover rounded-lg'
        />
      </div>
      <div className='min-w-[220px] w-56 rounded-lg flex-shrink-0'>
        <img
          src='/assets/shopDetails/special-offer.png'
          className='w-full h-full object-cover rounded-lg'
        />
      </div>
    </div>
  );
}

export default SpecialOfferCard;
