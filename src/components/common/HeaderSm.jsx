import React from 'react';
function HeaderSm({ children }) {
  return (
    <div className='block md:hidden'>
      <div class='fixed top-0 left-0 px-6 flex items-center justify-between  shadow-sm z-50 w-full h-[65px] bg-white border-t border-gray-200'>
        {children}
      </div>
    </div>
  );
}

export default HeaderSm;
