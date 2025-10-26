import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function OrderSidebar() {
  const router = useRouter();

  // Function to check if the link is active
  const isActive = (path) => router.pathname === path;

  return (
    <nav>
      <h2 className='text-md font-semibold mb-4'>General</h2>
      <ul className='space-y-2'>
        {/* My Profile */}
        <li
          className={`rounded-md text-sm ${
            isActive('/my-profile')
              ? 'bg-primary text-white'
              : 'bg-white text-gray-500 hover:bg-gray-200'
          }`}
        >
          <Link href='/my-profile' className='block p-3'>
            My Profile
          </Link>
        </li>

        {/* Address */}
        <li
          className={`rounded-md text-sm ${
            isActive('/address')
              ? 'bg-primary text-white'
              : 'bg-white text-gray-500 hover:bg-gray-200'
          }`}
        >
          <Link href='/address' className='block p-3'>
            Address
          </Link>
        </li>
      </ul>

      <h2 className='text-md font-semibold my-4'>Order</h2>
      <ul className='space-y-2'>
        {/* My Orders */}
        <li
          className={`rounded-md text-sm  ${
            isActive('/order')
              ? 'bg-primary text-white'
              : 'bg-white text-gray-500 hover:bg-gray-200'
          }`}
        >
          <Link href='/order' className='block p-3'>
            My Orders
          </Link>
        </li>
      </ul>

      <h2 className='text-md font-semibold my-4'>Others</h2>
      <ul className='space-y-2'>
        <li
          className={`rounded-md text-sm  ${
            isActive('/review')
              ? 'bg-primary text-white'
              : 'bg-white text-gray-500 hover:bg-gray-200'
          }`}
        >
          <Link href='/review' className='block p-3'>
            Reviews
          </Link>
        </li>
        <li className='p-3 bg-white text-gray-500 hover:bg-gray-200 rounded-md text-sm'>
          Followed Shop
        </li>
        <li className='p-3 bg-white text-gray-500 hover:bg-gray-200 rounded-md text-sm'>
          Credit Score
        </li>
        <li
          className={`rounded-md text-sm  ${
            isActive('/refer')
              ? 'bg-primary text-white'
              : 'bg-white text-gray-500 hover:bg-gray-200'
          }`}
        >
          <Link href='/refer' className='block p-3'>
            Refer & Earn
          </Link>
        </li>

        <li className='p-3 bg-white text-gray-500 hover:bg-gray-200 rounded-md text-sm'>
          Become Seller / My Store
        </li>
        <li
          className={`rounded-md text-sm  ${
            isActive('/affiliate')
              ? 'bg-primary text-white'
              : 'bg-white text-gray-500 hover:bg-gray-200'
          }`}
        >
          <Link href='/affiliate' className='block p-3'>
            Affiliate
          </Link>
        </li>
      </ul>

      <h2 className='text-md font-semibold my-4'>Preferences</h2>
      <ul className='space-y-2'>
        <li className='p-3 bg-white text-gray-500 hover:bg-gray-200 rounded-md text-sm'>
          Not
        </li>
      </ul>
    </nav>
  );
}

export default OrderSidebar;
