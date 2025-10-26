import React from 'react';

function FooterSm() {
  return (
    <div className='block md:hidden'>
      <div class='fixed bottom-0 left-0 rounded-t-3xl shadow-lg z-50 w-full h-[80px] bg-white border-t border-gray-200'>
        <div class='grid h-full max-w-lg grid-cols-4 mx-auto font-medium'>
          <button
            type='button'
            class='inline-flex flex-col items-center justify-center px-5 border-gray-200  hover:bg-gray-50 group'
          >
            <svg
              class='w-5 h-5 mb-2 text-gray-500 group-hover:text-blue-600'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
            </svg>
            <span class='text-sm text-gray-500 group-hover:text-blue-600'>
              Home
            </span>
          </button>
          <button
            type='button'
            class='inline-flex flex-col items-center justify-center px-5  border-gray-200 hover:bg-gray-50 group'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='#6b7280'
              class='bi bi-cart3 mb-1'
              viewBox='0 0 16 16'
            >
              <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2' />
            </svg>
            <span class='text-sm text-gray-500 group-hover:text-blue-600'>
              Cart
            </span>
          </button>
          <button
            type='button'
            class='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='#6b7280'
              class='bi bi-grid mb-1'
              viewBox='0 0 16 16'
            >
              <path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z' />
            </svg>
            <span class='text-sm text-gray-500 group-hover:text-blue-600'>
              Category
            </span>
          </button>
          <button
            type='button'
            class='inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-gray-50 group '
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='#6b7280'
              class='bi bi-person mb-1'
              viewBox='0 0 16 16'
            >
              <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z' />
            </svg>
            <span class='text-sm text-gray-500 group-hover:text-blue-600'>
              Account
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FooterSm;
