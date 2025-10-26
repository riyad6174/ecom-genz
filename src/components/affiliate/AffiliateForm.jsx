import { useState } from 'react';

export default function AffiliateForm() {
  const [activeTab, setActiveTab] = useState('information');

  return (
    <div className='  p-6 bg-white shadow-lg rounded-lg'>
      <h2 className='text-xl font-semibold text-left mb-4'>
        To join affiliate, Sign up with your information
      </h2>

      {/* Tabs Section */}
      <div className='flex border-b gap-2'>
        {[
          { label: 'Information', value: 'information' },
          { label: 'Account', value: 'account' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex-1 py-2 text-left text-xs border-b-[3px] transition-all ${
              activeTab === tab.value
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Section */}
      {activeTab === 'information' ? (
        <form className='mt-4 space-y-4'>
          <div>
            <label className='block text-sm font-medium'>Name*</label>
            <input
              type='text'
              placeholder='Your Name'
              className='w-full mt-1 p-2 border rounded-lg'
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>Phone Name*</label>
            <input
              type='text'
              placeholder='Your Phone'
              className='w-full mt-1 p-2 border rounded-lg'
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>
              Your email (Optional)
            </label>
            <input
              type='email'
              placeholder='Your Email'
              className='w-full mt-1 p-2 border rounded-lg'
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>Option 1</label>
            <input
              type='text'
              placeholder='Option Field'
              className='w-full mt-1 p-2 border rounded-lg'
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>Option 2</label>
            <input
              type='text'
              placeholder='Option Field'
              className='w-full mt-1 p-2 border rounded-lg'
            />
          </div>
        </form>
      ) : (
        <form className='mt-4 space-y-4'>
          <div>
            <label className='block text-sm font-medium'>Account</label>
            <input
              type='text'
              placeholder='Account'
              className='w-full mt-1 p-2 border rounded-lg'
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>Phone Number</label>
            <input
              type='text'
              placeholder='Phone Number'
              className='w-full mt-1 p-2 border rounded-lg'
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>
              Account Holder Name
            </label>
            <input
              type='text'
              placeholder='Account Holder Name'
              className='w-full mt-1 p-2 border rounded-lg'
            />
          </div>
        </form>
      )}

      {/* Buttons Section */}
      <div className='flex mt-6 gap-2 text-xs'>
        <button className='flex-1 py-3 bg-gray-200 font-semibold text-gray-700 rounded-lg'>
          Cancel
        </button>
        <button className='flex-1 py-3 bg-primary font-semibold text-white rounded-lg'>
          Continue
        </button>
      </div>
    </div>
  );
}
