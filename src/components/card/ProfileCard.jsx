import React, { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import { IoClose } from 'react-icons/io5';

const ProfileCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeDrawer() {
    setIsOpen(false);
  }

  function openDrawer() {
    setIsOpen(true);
  }

  return (
    <div className='grid grid-cols-5 p-4'>
      {/* Profile Image */}
      <div className='col-span-1 flex items-start justify-center'>
        <img
          src='/assets/order/user.png' // Replace with actual image URL
          alt='Profile'
          className='w-24 h-24 rounded-full object-cover'
        />
      </div>

      {/* Profile Details */}
      <div className='grid grid-cols-3 col-span-4 md:grid-cols-3 gap-x-16 gap-y-4 w-full'>
        <div>
          <p className='text-gray-600 text-sm font-semibold'>Full Name</p>
          <p className='text-gray-500 text-sm'>Mahmodul Hasan</p>
        </div>

        <div>
          <p className='text-gray-600 text-sm font-semibold'>Email</p>
          <p className='text-gray-500 text-sm'>info.mahmodul@gmail.com</p>
        </div>

        <div className=''>
          <p className='text-gray-600 text-sm font-semibold'>Phone</p>
          <p className='text-gray-500 text-sm'>+880 1618 599 106</p>
        </div>

        <div>
          <p className='text-gray-600 text-sm font-semibold'>Date of Birth</p>
          <p className='text-gray-500 text-sm'>03 Jan, 1990</p>
        </div>

        <div className='md:col-span-2'>
          <p className='text-gray-600 text-sm font-semibold'>Gender</p>
          <p className='text-gray-500 text-sm'>Male</p>
        </div>

        {/* Edit Button */}
        <div className='w-full col-span-2 md:w-auto flex justify-center md:justify-start py-4'>
          <button
            className='bg-primary w-60 text-white px-6 py-2 rounded-md text-sm font-medium'
            onClick={openDrawer}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Off-Canvas Drawer for Editing */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeDrawer}>
          <TransitionChild
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            {/* Background Overlay (clicking outside closes the drawer) */}
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </TransitionChild>

          <div className='fixed inset-0 flex justify-end'>
            <TransitionChild
              as={Fragment}
              enter='transition transform ease-in-out duration-300'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transition transform ease-in-out duration-300'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <DialogPanel className='w-96 bg-white shadow-xl h-full p-8 flex flex-col'>
                <DialogTitle className='text-lg font-semibold border-b pb-2 text-gray-800 flex items-center justify-between'>
                  <span>Edit </span>
                  <IoClose
                    onClick={closeDrawer}
                    className='text-xl text-gray-400 cursor-pointer'
                  />
                </DialogTitle>

                {/* Profile Image */}
                <div className='flex justify-center my-4'>
                  <img
                    src='/assets/order/user.png'
                    alt='Profile'
                    className='w-24 h-24 rounded-full object-cover border border-gray-300'
                  />
                </div>

                {/* Input Fields */}
                <div className='space-y-4'>
                  <div>
                    <label className='text-sm text-gray-600'>Full Name</label>
                    <input
                      type='text'
                      className='w-full border rounded-md px-3 py-2 text-sm bg-gray-50'
                      defaultValue='Mahmodul Hasan'
                    />
                  </div>

                  <div>
                    <label className='text-sm text-gray-600'>Email</label>
                    <input
                      type='email'
                      className='w-full border rounded-md px-3 py-2 text-sm bg-gray-50'
                      defaultValue='info.mahmodul@gmail.com'
                    />
                  </div>

                  <div>
                    <label className='text-sm text-gray-600'>Phone</label>
                    <input
                      type='text'
                      className='w-full border rounded-md px-3 py-2 text-sm bg-gray-50'
                      defaultValue='+880 1618 599 106'
                    />
                  </div>

                  <div>
                    <label className='text-sm text-gray-600'>
                      Date of Birth
                    </label>
                    <input
                      type='date'
                      className='w-full border rounded-md px-3 py-2 text-sm bg-gray-50'
                      defaultValue='1990-01-03'
                    />
                  </div>

                  <div>
                    <label className='text-sm text-gray-600'>Gender</label>
                    <select className='w-full border rounded-md px-3 py-2 text-sm bg-gray-50'>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className='flex justify-end gap-2 mt-auto pt-4'>
                  <button
                    className='border border-gray-600 px-6 py-1 rounded-sm text-xs font-medium'
                    onClick={closeDrawer}
                  >
                    Cancel
                  </button>
                  <button className='bg-primary text-white px-6 py-1 rounded-sm text-xs font-medium'>
                    Save
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProfileCard;
