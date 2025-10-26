import React from 'react';

function BottomButton({ buttonName }) {
  return (
    <div className='block md:hidden'>
      <div class='fixed flex items-center justify-center bottom-0 left-0  shadow-lg z-50 w-full h-[75px] bg-white border-t border-gray-200'>
        <button className='bg-primary text-white rounded-lg w-3/4 text-sm py-3 px-2'>
          {buttonName}
        </button>
      </div>
    </div>
  );
}

export default BottomButton;
