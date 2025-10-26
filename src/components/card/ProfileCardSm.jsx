import React from 'react';
import { GrLocation } from 'react-icons/gr';
import { TbShoppingCartHeart } from 'react-icons/tb';
import { HiOutlineCreditCard } from 'react-icons/hi';
import { RiEdit2Fill } from 'react-icons/ri';
import Link from 'next/link';
const ProfileCardSm = () => {
  return (
    <div className='max-w-full mx-auto bg-white  rounded-lg p-4 text-center'>
      {/* Profile Image */}
      <div className='relative w-28 h-28 mx-auto'>
        <img
          src='/assets/order/user.png'
          alt='profile'
          className='w-28 h-28 rounded-full object-cover border-4 border-white shadow'
        />
        {/* Edit Icon */}
        <Link
          href={'/edit-profile'}
          className='absolute border-2 border-white bottom-1 right-1 bg-primary text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md'
        >
          <RiEdit2Fill className='text-lg' />
        </Link>
      </div>

      {/* User Info */}
      <h3 className='text-lg font-semibold mt-3'>Hasan Mahmud</h3>
      <p className='text-sm text-gray-500'>rikafashionshop@gmail.com</p>

      {/* Action Buttons */}
      <div className='flex  justify-center items-center gap-7 mt-5'>
        <ActionItem
          icon={<GrLocation className='text-2xl text-primary' />}
          label='Address'
          link={'/delivery-address'}
        />
        <ActionItem
          icon={<HiOutlineCreditCard className='text-2xl text-yellow-500' />}
          label='Payment'
          link={'/'}
        />
        <ActionItem icon='❤️' label='Wishlist' />
        <ActionItem
          icon={<TbShoppingCartHeart className='text-2xl text-orange-400' />}
          label='My Cart'
          link={'/cart'}
        />
      </div>
    </div>
  );
};

const ActionItem = ({ icon, label, link = '#' }) => {
  return (
    <Link href={link} className='flex flex-col items-center'>
      <div className='w-14 h-14 flex items-center justify-center bg-gray-100 rounded-full shadow'>
        <span className='text-xl'>{icon}</span>
      </div>
      <p className='text-xs  font-semibold text-gray-600 mt-1'>{label}</p>
    </Link>
  );
};

export default ProfileCardSm;
