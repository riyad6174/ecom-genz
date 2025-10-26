import React, { useState } from 'react';
import {
  Dialog,
  Transition,
  Listbox,
  TransitionChild,
  DialogPanel,
  DialogTitle,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import { MdArrowDropDown } from 'react-icons/md';
import { FaPencil } from 'react-icons/fa6';
import { HiPlus } from 'react-icons/hi2';
import CustomSection from '../layout/CustomSection';
import { Fragment } from 'react';
import { IoClose } from 'react-icons/io5';

const banks = ['Select Bank', 'Bank of America', 'Chase', 'Wells Fargo'];

function AccountDashboard() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(banks[0]);

  return (
    <CustomSection>
      <div className='bg-white p-4 rounded-lg'>
        {/* Title */}
        <div className='flex items-center justify-start gap-5 py-2'>
          <span className='font-bold text-lg'>My Dashboard</span>
          <button className='flex gap-3 px-2 text-sm py-2 border font-semibold rounded-md bg-white text-gray-500 border-gray-500'>
            <span className='text-xs'>Day</span>
            <MdArrowDropDown className='text-gray-600' />
          </button>
        </div>

        {/* Total Earnings */}
        <div className='py-3'>
          <div className='bg-gray-100 rounded-md py-3 text-gray-600 px-4'>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10'>
                <img
                  src='/assets/icon/coin.png'
                  alt='Coin Icon'
                  className='object-cover'
                />
              </div>
              <div className='flex flex-col'>
                <span className='text-sm'>Total Earning</span>
                <span className='text-sm text-gray-700 font-semibold'>
                  $500
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Manage Accounts */}
        <div className='py-4'>
          <span className='font-bold text-lg'>Manage your payment account</span>
        </div>

        <div className='bg-white rounded-lg p-2'>
          <div className='flex items-center justify-between p-2 rounded-lg'>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10'>
                <img
                  src='/assets/checkout/money.svg'
                  alt='Bkash'
                  className='w-full h-full'
                />
              </div>
              <div className='flex flex-col'>
                <span className='text-sm font-semibold'>Bkash</span>
                <span className='text-xs text-gray-500'>01670467556</span>
              </div>
            </div>
            <button
              onClick={() => setIsEditOpen(true)}
              className='text-primary flex items-center gap-2 font-semibold text-xs border-2 border-primary rounded-md px-4 py-2'
            >
              <FaPencil /> <span>Edit</span>
            </button>
          </div>
        </div>

        <div className='py-4'>
          <button
            onClick={() => setIsAddOpen(true)}
            className='flex items-center justify-center text-sm gap-4 border border-primary rounded-3xl text-primary px-4 py-2 font-semibold'
          >
            <span>Add new Account</span>
            <HiPlus />
          </button>
        </div>
      </div>

      {/* Off-Canvas Drawer for Editing */}
      <Transition show={isEditOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50'
          onClose={() => setIsEditOpen(false)}
        >
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
                  <span>Account Information </span>
                  <IoClose
                    onClick={() => setIsEditOpen(false)}
                    className='text-xl text-gray-400 cursor-pointer'
                  />
                </DialogTitle>

                <form className='py-6'>
                  {/* Account Number */}
                  <div className='mb-4'>
                    <label className='block text-sm mb-2 font-medium'>
                      Account Number
                    </label>
                    <input
                      type='text'
                      placeholder='Account No*'
                      className='w-full border p-2 rounded mb-2 placeholder:text-sm text-sm'
                      required
                    />
                  </div>

                  {/* Account Holder Name */}
                  <div className='mb-4'>
                    <label className='block text-sm mb-2 font-medium'>
                      Account Holder Name
                    </label>
                    <input
                      type='text'
                      placeholder='Account Holder Name*'
                      className='w-full border p-2 rounded mb-2 placeholder:text-sm text-sm'
                      required
                    />
                  </div>

                  {/* Bank Selection */}
                  <div className='mb-4'>
                    <label className='block text-sm mb-2 font-medium'>
                      Select Bank
                    </label>
                    <Listbox value={selectedBank} onChange={setSelectedBank}>
                      <ListboxButton className='w-full text-left text-gray-500 text-sm border p-2 rounded mb-2'>
                        {selectedBank || 'Select Bank'}
                      </ListboxButton>
                      <ListboxOptions className='border rounded mt-1'>
                        {banks.map((bank, idx) => (
                          <ListboxOption
                            key={idx}
                            value={bank}
                            className='p-2 cursor-pointer hover:bg-gray-200'
                          >
                            {bank}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Listbox>
                  </div>

                  {/* Branch Name */}
                  <div className='mb-4'>
                    <label className='block text-sm mb-2 font-medium'>
                      Branch Name
                    </label>
                    <input
                      type='text'
                      placeholder='Branch Name'
                      className='w-full border p-2 rounded mb-2 placeholder:text-sm text-sm'
                    />
                  </div>

                  {/* Routing Number */}
                  <div className='mb-4'>
                    <label className='block text-sm mb-2 font-medium'>
                      Routing Number
                    </label>
                    <input
                      type='text'
                      placeholder='Routing No'
                      className='w-full border p-2 rounded mb-2 placeholder:text-sm text-sm'
                    />
                  </div>
                </form>

                {/* Buttons */}
                <div className='flex justify-end gap-2 mt-auto pt-4'>
                  <button
                    className='border border-gray-600 px-8 py-2 rounded-sm text-xs font-medium'
                    onClick={() => setIsEditOpen(false)}
                  >
                    Cancel
                  </button>
                  <button className='bg-primary text-white px-8 py-2 rounded-sm text-xs font-medium'>
                    Save
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
      {/* Off-Canvas Drawer for add */}
      <Transition show={isAddOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50'
          onClose={() => setIsAddOpen(false)}
        >
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
                  <span>Add Account </span>
                  <IoClose
                    onClick={() => setIsAddOpen(false)}
                    className='text-xl text-gray-400 cursor-pointer'
                  />
                </DialogTitle>

                <form className='py-6'>
                  {/* Account Number */}
                  <div className='mb-4'>
                    <label className='block text-sm mb-2 font-medium'>
                      Account Number
                    </label>
                    <input
                      type='text'
                      placeholder='Account No*'
                      className='w-full border p-2 rounded mb-2 placeholder:text-sm text-sm'
                      required
                    />
                  </div>

                  {/* Account Holder Name */}
                  <div className='mb-4'>
                    <label className='block text-sm mb-2 font-medium'>
                      Account Holder Name
                    </label>
                    <input
                      type='text'
                      placeholder='Account Holder Name*'
                      className='w-full border p-2 rounded mb-2 placeholder:text-sm text-sm'
                      required
                    />
                  </div>

                  {/* Bank Selection */}
                  <div className='mb-4'>
                    <label className='block text-sm mb-2 font-medium'>
                      Select Bank
                    </label>
                    <Listbox value={selectedBank} onChange={setSelectedBank}>
                      <ListboxButton className='w-full text-left text-gray-500 text-sm border p-2 rounded mb-2'>
                        {selectedBank || 'Select Bank'}
                      </ListboxButton>
                      <ListboxOptions className='border rounded mt-1'>
                        {banks.map((bank, idx) => (
                          <ListboxOption
                            key={idx}
                            value={bank}
                            className='p-2 cursor-pointer hover:bg-gray-200'
                          >
                            {bank}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Listbox>
                  </div>

                  {/* Branch Name */}
                  <div className='mb-4'>
                    <label className='block text-sm mb-2 font-medium'>
                      Branch Name
                    </label>
                    <input
                      type='text'
                      placeholder='Branch Name'
                      className='w-full border p-2 rounded mb-2 placeholder:text-sm text-sm'
                    />
                  </div>

                  {/* Routing Number */}
                  <div className='mb-4'>
                    <label className='block text-sm mb-2 font-medium'>
                      Routing Number
                    </label>
                    <input
                      type='text'
                      placeholder='Routing No'
                      className='w-full border p-2 rounded mb-2 placeholder:text-sm text-sm'
                    />
                  </div>
                </form>

                {/* Buttons */}
                <div className='flex justify-end gap-2 mt-auto pt-4'>
                  <button
                    className='border border-gray-600 px-8 py-2 rounded-sm text-xs font-medium'
                    onClick={() => setIsAddOpen(false)}
                  >
                    Cancel
                  </button>
                  <button className='bg-primary text-white px-8 py-2 rounded-sm text-xs font-medium'>
                    Save
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </CustomSection>
  );
}

export default AccountDashboard;
