import React, { useState } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { MdArrowDropDown } from 'react-icons/md';
import { FaPencil } from 'react-icons/fa6';
import { HiPlus } from 'react-icons/hi2';
import CustomSection from '../layout/CustomSection';
import { Fragment } from 'react';

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

      {/* Edit Account Dialog */}
      <Transition show={isEditOpen} as={Fragment}>
        {/* <Dialog
          onClose={() => setIsEditOpen(false)}
          className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'
        > */}
        <Dialog
          as='div'
          className='relative z-50'
          onClose={() => setIsEditOpen(false)}
        >
          <div className='bg-white p-6 rounded-lg w-96'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-bold'>Edit Account</h2>
              <button
                onClick={() => setIsEditOpen(false)}
                className='text-gray-600'
              >
                &times;
              </button>
            </div>
            <form>
              <input
                type='text'
                placeholder='Account No*'
                className='w-full border p-2 rounded mb-2'
                required
              />
              <input
                type='text'
                placeholder='Account Holder Name*'
                className='w-full border p-2 rounded mb-2'
                required
              />
              <Listbox value={selectedBank} onChange={setSelectedBank}>
                <Listbox.Button className='w-full border p-2 rounded mb-2'>
                  {selectedBank}
                </Listbox.Button>
                <Listbox.Options className='border rounded mt-1'>
                  {banks.map((bank, idx) => (
                    <Listbox.Option
                      key={idx}
                      value={bank}
                      className='p-2 cursor-pointer hover:bg-gray-200'
                    >
                      {bank}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
              <input
                type='text'
                placeholder='Branch Name'
                className='w-full border p-2 rounded mb-2'
              />
              <input
                type='text'
                placeholder='Routing No'
                className='w-full border p-2 rounded mb-2'
              />
              <div className='flex justify-between'>
                <button
                  type='button'
                  onClick={() => setIsEditOpen(false)}
                  className='px-4 py-2 border rounded'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-primary text-white rounded'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      </Transition>

      {/* Add Account Dialog */}
      <Transition show={isAddOpen}>
        <Dialog
          onClose={() => setIsAddOpen(false)}
          className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'
        >
          <div className='bg-white p-6 rounded-lg w-96'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-bold'>Add Account</h2>
              <button
                onClick={() => setIsAddOpen(false)}
                className='text-gray-600'
              >
                &times;
              </button>
            </div>
            <form>
              <input
                type='text'
                placeholder='Account No*'
                className='w-full border p-2 rounded mb-2'
                required
              />
              <input
                type='text'
                placeholder='Account Holder Name*'
                className='w-full border p-2 rounded mb-2'
                required
              />
              <Listbox value={selectedBank} onChange={setSelectedBank}>
                <Listbox.Button className='w-full border p-2 rounded mb-2'>
                  {selectedBank}
                </Listbox.Button>
                <Listbox.Options className='border rounded mt-1'>
                  {banks.map((bank, idx) => (
                    <Listbox.Option
                      key={idx}
                      value={bank}
                      className='p-2 cursor-pointer hover:bg-gray-200'
                    >
                      {bank}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
              <input
                type='text'
                placeholder='Branch Name'
                className='w-full border p-2 rounded mb-2'
              />
              <input
                type='text'
                placeholder='Routing No'
                className='w-full border p-2 rounded mb-2'
              />
              <div className='flex justify-between'>
                <button
                  type='button'
                  onClick={() => setIsAddOpen(false)}
                  className='px-4 py-2 border rounded'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-primary text-white rounded'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      </Transition>
    </CustomSection>
  );
}

export default AccountDashboard;
