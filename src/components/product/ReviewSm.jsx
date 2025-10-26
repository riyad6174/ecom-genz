import React, { useState } from 'react';
import CustomSection from '../layout/CustomSection';
import { FaStar } from 'react-icons/fa6';
import { BiLike } from 'react-icons/bi';
import ReviewsCard from '../card/ReviewsCard';

function ReviewSm() {
  return (
    <>
      <CustomSection>
        <div className='px-3 py-6'>
          <div className='bg-white p-5   rounded-lg'>
            <ReviewsCard />
          </div>
        </div>
      </CustomSection>
    </>
  );
}

export default ReviewSm;
