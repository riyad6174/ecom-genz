import React from 'react';

function GenerateLink() {
  return (
    <div className='p-4 bg-white rounded-lg shadow-sm border'>
      <input
        className='bg-gray-100 w-full rounded-md border py-1 px-2 placeholder:text-xs'
        placeholder='Enter URL '
      />
      <button className='bg-primary mt-4 text-xs px-6 py-2 rounded-lg text-white'>
        Copy Link
      </button>
    </div>
  );
}

export default GenerateLink;
