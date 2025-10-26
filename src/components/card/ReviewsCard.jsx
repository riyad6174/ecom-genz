import React from 'react';
import { FaStar } from 'react-icons/fa';
const reviews = [
  {
    id: 1,
    name: 'Alexa Wallers',
    rating: 4,
    comment:
      'Absolutely love this jacket! Stylish and comfortable. Great purchase, h...',
    date: 'Today',
  },
  {
    id: 2,
    name: 'Emily Mendez',
    rating: 5,
    comment:
      'Absolutely love this jacket! Stylish and comfortable. Great purchase, h...',
    date: 'Today',
  },
];

const Rating = ({ stars }) => {
  return (
    <div className='flex gap-1'>
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {index < stars ? (
            <span className='text-orange-400'>
              <FaStar />
            </span>
          ) : (
            <span className='text-gray-300'>
              <FaStar />
            </span>
          )}
        </span>
      ))}
    </div>
  );
};

const ReviewsCard = () => {
  return (
    <div className='max-w-md mx-auto '>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-lg font-semibold'>Review (1283)</h2>
        <a href='#' className='text-blue-500 text-sm'>
          See More
        </a>
      </div>
      {reviews.map((review) => (
        <div key={review.id} className='flex items-start gap-3 mb-4'>
          <img
            src='/assets/order/user.png'
            alt={review.name}
            className='w-10 h-10 rounded-full'
          />
          <div>
            <div className='flex justify-between w-full'>
              <h3 className='font-semibold'>{review.name}</h3>
              <span className='text-sm text-gray-500'>{review.date}</span>
            </div>
            <Rating stars={review.rating} />
            <p className='text-gray-600 text-sm mt-1'>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsCard;
