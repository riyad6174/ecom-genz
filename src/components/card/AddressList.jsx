import React, { Fragment, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { FaPen } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { TbUserSquare } from 'react-icons/tb';

const AddressCard = ({ name, email, phone, address, isDefault }) => {
  return (
    <div className='border-b pb-4 mb-4 flex justify-between items-start'>
      <div className='flex gap-4'>
        <div className='text-gray-500 text-xl flex items-start'>
          <span className='p-2'>
            <TbUserSquare />{' '}
          </span>
        </div>

        <div>
          <div className='flex items-center gap-4'>
            <p className='text-gray-800'>{name}</p>
            {isDefault && (
              <span className='bg-blue-50 text-primary text-xs font-medium px-2 py-2 rounded-md'>
                Default
              </span>
            )}
          </div>
          <p className='text-gray-600 text-sm py-3 flex items-center gap-3'>
            <span>{email}</span> • <span>{phone}</span>
          </p>
          <p className='text-gray-500 text-sm'>{address}</p>
        </div>
      </div>

      <div className='flex gap-5'>
        <button className='text-blue-500 hover:text-blue-600'>
          <FaPen size={16} />
        </button>
        <button className='text-red-500 hover:text-red-600'>
          <FiTrash size={16} />
        </button>
      </div>
    </div>
  );
};

const AddressList = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const addresses = [
    {
      name: 'Jhon Doe',
      email: 'jhon@gmail.com',
      phone: '+6281234567890',
      address: 'Jl. Mawar Mutih No. 34, Malang, East Java, Indonesia, 12012',
      isDefault: true,
    },
    {
      name: 'Jhon Doe',
      email: 'jhon@gmail.com',
      phone: '+6281234567890',
      address: 'Jl. Mawar Mutih No. 34, Malang, East Java, Indonesia, 12012',
      isDefault: false,
    },
  ];

  return (
    <div className='w-full px-6 py-6'>
      {addresses.map((addr, index) => (
        <AddressCard key={index} {...addr} />
      ))}

      <div className='mt-6 flex'>
        <button
          className='bg-primary text-xs hover:bg-blue-700 text-white px-6 py-3 rounded-md w-64'
          onClick={() => setIsDrawerOpen(true)}
        >
          Add New Address
        </button>
      </div>

      <Transition show={isDrawerOpen} as={Fragment}>
        <Dialog
          as='div'
          onClose={() => setIsDrawerOpen(false)}
          className='relative z-50'
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
            <div className='fixed inset-0 bg-black bg-opacity-30' />
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
              <DialogPanel className='w-96 bg-white shadow-lg h-full p-6'>
                <DialogTitle className='text-lg  font-semibold border-b pb-2 text-gray-800 flex items-center justify-between'>
                  <span>Edit Address </span>
                  <IoClose
                    onClick={() => setIsDrawerOpen(false)}
                    className='text-xl text-gray-400 cursor-pointer'
                  />
                </DialogTitle>

                {/* Form Fields */}
                <div className='space-y-3 pt-4'>
                  <div>
                    <label className='text-sm font-medium'>
                      Recipient's Name*
                    </label>
                    <input
                      type='text'
                      className='w-full border rounded-md px-2 py-2 bg-gray-50 mt-1'
                      placeholder='Enter name'
                    />
                  </div>

                  <div>
                    <label className='text-sm font-medium'>
                      Recipient's Phone*
                    </label>
                    <input
                      type='text'
                      className='w-full border rounded-md px-2 py-2 bg-gray-50 mt-1'
                      placeholder='Enter phone number'
                    />
                  </div>

                  <div>
                    <label className='text-sm font-medium'>Division</label>
                    <select className='w-full border rounded-md px-2 py-2 bg-gray-50 mt-1'>
                      <option>Select Division</option>
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                    </select>
                  </div>

                  <div>
                    <label className='text-sm font-medium'>District</label>
                    <select className='w-full border rounded-md px-2 py-2 bg-gray-50 mt-1'>
                      <option>Select District</option>
                      <option>Comilla</option>
                      <option>Gazipur</option>
                    </select>
                  </div>

                  <div>
                    <label className='text-sm font-medium'>Upazila</label>
                    <select className='w-full border rounded-md px-2 py-2 bg-gray-50 mt-1'>
                      <option>Select Upazila</option>
                      <option>Mirpur</option>
                      <option>Banani</option>
                    </select>
                  </div>

                  <div>
                    <label className='text-sm font-medium'>Address</label>
                    <textarea
                      className='w-full border rounded-md px-2 py-2 bg-gray-50 mt-1'
                      placeholder='Enter full address'
                    ></textarea>
                  </div>

                  {/* Address Label */}
                  <div>
                    <label className='text-sm font-medium'>Address Label</label>
                    <div className='flex gap-4 mt-2'>
                      <label className='flex items-center'>
                        <input type='radio' name='label' className='mr-2' />{' '}
                        Home
                      </label>
                      <label className='flex items-center'>
                        <input type='radio' name='label' className='mr-2' />{' '}
                        Office
                      </label>
                      {/* Default Address Checkbox */}
                      <div className='flex items-center'>
                        <input type='checkbox' className='mr-2' />
                        <label className='text-sm'>Mark as Default</label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Buttons */}
                <div className='flex justify-end gap-2 mt-auto pt-8'>
                  <button
                    className='border border-gray-600 px-6 py-2 rounded-sm text-xs font-medium'
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Cancel
                  </button>
                  <button className='bg-primary text-white px-6 py-2 rounded-sm text-xs font-medium'>
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

export default AddressList;
