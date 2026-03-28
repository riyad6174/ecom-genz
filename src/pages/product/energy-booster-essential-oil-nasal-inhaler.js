import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GoShareAndroid } from 'react-icons/go';
import { GiGrapes, GiWatermelon, GiPeach } from 'react-icons/gi';
import { FaLeaf, FaLemon, FaQuestionCircle } from 'react-icons/fa';
import Navbar from '@/components/common/Navbar';
import CustomSection from '@/components/layout/CustomSection';
import { products } from '@/utils/products';
import { addToCart } from '@/store/cartSlice';
import Footer from '@/components/common/Footer';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Find the specific product for this page
const productData = products.find(
  (p) => p.slug === 'energy-booster-essential-oil-nasal-inhaler',
);

const variantIcons = {
  Grape: <GiGrapes className="text-purple-600 text-xl" />,
  Watermelon: <GiWatermelon className="text-red-500 text-xl" />,
  Mint: <FaLeaf className="text-green-500 text-xl" />,
  Peace: <GiPeach className="text-orange-500 text-xl" />,
  Lemon: <FaLemon className="text-yellow-500 text-xl" />,
};

const variantBgColors = {
  Grape: 'bg-purple-100',
  Watermelon: 'bg-red-100',
  Mint: 'bg-green-100',
  Peace: 'bg-orange-100',
  Lemon: 'bg-yellow-100',
};

const ProductDetails = ({ initialProduct }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [product, setProduct] = useState(initialProduct);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      setActiveImage(initialProduct.images[0] || '');
      setSelectedColor(initialProduct.variants?.[0]?.type || '');

      // GTM Data Layer Push (only on client-side)
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'view_item',
          ecommerce: {
            items: [
              {
                item_id: initialProduct.id || 'unknown',
                item_name: initialProduct.title || 'unknown',
                price: initialProduct.price || 0,
                original_price: initialProduct.originalPrice || 0,
                item_category: 'Wellness',
                item_variant: 'Essential Oil Inhaler',
              },
            ],
            currency: 'BDT',
            value: initialProduct.price || 0,
          },
        });
      }
    }
  }, [initialProduct]);

  const handleImageClick = (image) => {
    setActiveImage(image);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increment' && quantity < 999) {
      setQuantity(quantity + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'add_to_cart',
          ecommerce: {
            currency: 'BDT',
            value: product.price * quantity || 0,
            items: [
              {
                item_id: product.id || 'unknown',
                item_name: product.title || 'unknown',
                price: product.price || 0,
                original_price: product.originalPrice || 0,
                item_category: 'Wellness',
                item_variant: selectedColor || 'unknown',
                quantity: quantity || 1,
              },
            ],
          },
        });
      }
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          slug: product.slug,
          price: product.price,
          selectedColor,
          variantKey: 'type',
          quantity,
          image: activeImage,
        }),
      );
      router.push('/order');
    }
  };

  if (!product) {
    return (
      <div className='text-center py-10 text-gray-600 font-mont text-lg'>
        পণ্য খুঁজে পাওয়া যায়নি
      </div>
    );
  }

  const faqData = [
    {
      question:
        'এই নেজাল ইনহেলার কি সত্যিই সাইনাস ও স্ট্রেস কমাতে সাহায্য করে?',
      answer:
        'জ্বী, প্রাকৃতিক এসেনশিয়াল অয়েলের অ্যারোমাথেরাপির মাধ্যমে এটি সাইনাসের অস্বস্তি, মাথার চাপ, টেনশন ও স্ট্রেস উপশম করতে সহায়তা করে। এটি সতেজ অনুভূতি দেয় এবং ফোকাস বাড়াতে সাহায্য করে।',
    },
    {
      question: 'এটি কতদিন ব্যবহার করা যায়?',
      answer:
        'সঠিকভাবে ব্যবহার করলে এবং ক্যাপ বন্ধ রাখলে একটি ইনহেলার ৩-৬ মাস পর্যন্ত সুবাস ধরে রাখতে পারে। তবে ব্যবহারের ফ্রিকোয়েন্সির উপর নির্ভর করে এটি কম-বেশি হতে পারে।',
    },
    {
      question: 'এতে কি কোনো পার্শ্বপ্রতিক্রিয়া আছে?',
      answer:
        'সাধারণত নিরাপদ, কারণ এতে শুধুমাত্র খাঁটি প্রাকৃতিক এসেনশিয়াল অয়েল ব্যবহার করা হয়েছে। তবে অ্যালার্জি থাকলে (যেমন: নির্দিষ্ট তেলের প্রতি) ব্যবহারের আগে টেস্ট করে নিন। অতিরিক্ত ব্যবহারে নাকের জ্বালা হতে পারে। গর্ভবতী বা শিশুদের ক্ষেত্রে ডাক্তারের পরামর্শ নিন।',
    },
    {
      question: 'কীভাবে সঠিকভাবে ব্যবহার করব?',
      answer:
        'ক্যাপ খুলে ইনহেলারটি নাকের কাছে (১-২ ইঞ্চি দূরে) ধরুন। এক নাকের ছিদ্র বন্ধ করে অন্যটি দিয়ে ধীরে ধীরে গভীরভাবে শ্বাস নিন। ৩-৫ বার পুনরাবৃত্তি করুন। প্রয়োজনে দিনে ৩-৫ বার ব্যবহার করতে পারেন।',
    },
    {
      question: 'এটি কি শিশুদের জন্য নিরাপদ?',
      answer:
        'প্রাপ্তবয়স্কদের জন্য ডিজাইন করা। ১২ বছরের নিচের শিশুদের ক্ষেত্রে ব্যবহারের আগে ডাক্তারের পরামর্শ নেওয়া উচিত, কারণ এসেনশিয়াল অয়েল শিশুদের জন্য বেশি শক্তিশালী হতে পারে।',
    },
  ];

  return (
    <>
      <Head>
        <title>Energy Booster Essential Oil Nasal Inhaler | GenZ Shop</title>
        <meta
          name='description'
          content='প্রাকৃতিক এসেনশিয়াল অয়েল নেজাল ইনহেলার – সাইনাস, স্ট্রেস ও টেনশন কমান, এনার্জি বাড়ান। ডুয়াল স্টিক, অর্গানিক ও বহনযোগ্য।'
        />
        <meta
          property='og:title'
          content='Energy Booster Essential Oil Nasal Inhaler | GenZ Shop'
        />
        <meta
          property='og:description'
          content='প্রাকৃতিক অ্যারোমাথেরাপি দিয়ে সতেজ থাকুন। সাইনাস অস্বস্তি, স্ট্রেস রিলিফ ও ফোকাস বাড়াতে সহায়ক।'
        />
        <meta
          property='og:url'
          content={`https://www.genzshop.store/product/${product.slug}`}
        />
        <meta property='og:type' content='product' />
        <meta property='og:image' content={product.images[0]} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <Navbar />
      <div className='py-6 sm:py-8 container mx-auto px-4 sm:px-6 lg:px-8'>
        <style jsx>{`
          .image-transition {
            transition:
              opacity 0.3s ease-in-out,
              transform 0.3s ease-in-out;
          }
          .image-transition:hover {
            transform: scale(1.02);
          }
          .small-image {
            transition:
              opacity 0.2s ease-in-out,
              border-color 0.2s ease-in-out;
            border-width: 2px;
          }
          .small-image-active {
            border-color: #a4dd00;
            opacity: 1;
          }
          .small-image-inactive {
            opacity: 0.7;
            border-color: transparent;
          }
        `}</style>
        <div className='bg-white py-4 sm:py-6 rounded-xl shadow-lg'>
          <div className='flex flex-col lg:flex-row gap-4 sm:gap-6'>
            {/* Image Section – Updated grid */}
            <div className='w-full lg:w-3/5 px-4'>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4'>
                <div className='col-span-1 sm:col-span-2'>
                  <img
                    className='w-full h-64 sm:h-80 lg:h-[400px] object-cover rounded-lg image-transition'
                    src={activeImage}
                    alt={product.title}
                  />
                </div>
                {/* Thumbnails – 3 in row on sm+, single column on mobile */}
                <div className='grid grid-cols-3 sm:grid-cols-1 gap-3 sm:gap-4'>
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      className={`w-full h-20 sm:h-28 lg:h-36 object-cover rounded-lg cursor-pointer small-image ${
                        activeImage === image
                          ? 'small-image-active'
                          : 'small-image-inactive'
                      }`}
                      src={image}
                      alt={`${product.title} থাম্বনেইল ${index + 1}`}
                      onClick={() => handleImageClick(image)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className='w-full lg:w-2/5 px-4 sm:px-6 py-4'>
              <h2 className='text-lg sm:text-xl lg:text-2xl font-semibold font-mont text-gray-800 mb-2 sm:mb-4'>
                {product.title}
              </h2>
              <p className='text-gray-600 text-sm sm:text-base font-mont mb-4'>
                {product.description}
              </p>

              {product.variants && product.variants.length > 0 && (
                <div className='mb-6'>
                  <span className='font-semibold text-gray-700 text-sm sm:text-base'>
                    ফ্লেভার নির্বাচন করুন
                  </span>
                  <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3'>
                    {product.variants.map((variant, index) => {
                      const value = variant.type;
                      const isSelected = selectedColor === value;
                      return (
                        <div
                          key={index}
                          className={`border flex flex-row items-center justify-center gap-2 rounded-lg cursor-pointer px-3 py-2.5 transition-all duration-200 ${
                            isSelected ? 'border-primary shadow-md opacity-100 ring-1 ring-primary' : 'border-gray-300 hover:border-gray-400 opacity-70 hover:opacity-100'
                          } ${variantBgColors[value] || 'bg-gray-50'}`}
                          onClick={() => setSelectedColor(value)}
                        >
                          <div className='flex items-center justify-center'>
                            {variantIcons[value]}
                          </div>
                          <span className='text-xs sm:text-sm font-semibold text-gray-800'>
                            {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className='flex items-center justify-start gap-2 text-md mb-6'>
                <span className='text-black font-bold text-lg sm:text-xl'>
                  ৳ {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className='text-gray-500 font-normal text-base sm:text-lg line-through'>
                    ৳ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className='flex items-center justify-start gap-4 mb-6'>
                <div className='flex items-center border border-gray-400 rounded-lg bg-white'>
                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    className='hover:bg-gray-200 rounded-l-lg py-2 px-3 sm:px-4 h-10 sm:h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none'
                  >
                    <svg
                      className='w-2 h-2 text-gray-900'
                      fill='none'
                      viewBox='0 0 18 2'
                    >
                      <path stroke='currentColor' strokeWidth='2' d='M1 1h16' />
                    </svg>
                  </button>
                  <input
                    type='text'
                    value={quantity}
                    readOnly
                    className='h-10 sm:h-11 w-12 sm:w-16 text-center text-gray-900 text-sm'
                  />
                  <button
                    onClick={() => handleQuantityChange('increment')}
                    className='hover:bg-gray-200 rounded-r-lg py-2 px-3 sm:px-4 h-10 sm:h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none'
                  >
                    <svg
                      className='w-2 h-2 text-gray-900'
                      fill='none'
                      viewBox='0 0 18 18'
                    >
                      <path
                        stroke='currentColor'
                        strokeWidth='2'
                        d='M9 1v16M1 9h16'
                      />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleBuyNow}
                  className='flex items-center bg-primary text-black justify-center gap-2 border border-primary px-4 sm:px-6 py-2 sm:py-3 rounded-md font-mont font-semibold text-sm'
                  disabled={!product.inStock}
                >
                  <span>{product.inStock ? 'এখনই কিনুন' : 'স্টক নেই'}</span>
                </button>
              </div>
              
              <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-sm sm:text-base text-red-600 font-semibold font-mont'>
                  এটি সম্পুর্ণ ন্যাচারাল এসেনশিয়াল অয়েল সমৃদ্ধ একটি প্রোডাক্ট। ই-ভেপ বা ই-সিগারেট ভেবে ভুল করবেন না।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomSection>
        <div className='px-3 sm:px-4'>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
            <img
              src='/assets/product/inhaler/bull.avif'
              alt='Energy Booster Nasal Inhaler - Dual Stick Design'
              className='w-full h-48 sm:h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow'
            />
            <img
              src='/assets/product/inhaler/grape.avif'
              alt='Portable Essential Oil Inhaler with Cap'
              className='w-full h-48 sm:h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow'
            />
            <img
              src='/assets/product/inhaler/rf-7.png'
              alt='Aromatherapy Nasal Inhaler - Peppermint Style'
              className='w-full h-48 sm:h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow'
            />
            <img
              src='/assets/product/inhaler/rf-9.png'
              alt='Refreshing Nasal Inhaler Pack - Natural Oils'
              className='w-full h-48 sm:h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow'
            />
          </div>
          {/* Product Description */}
          <div className='bg-white p-2 mt-4 sm:p-5 rounded-lg'>
            <h2 className='text-lg sm:text-xl font-semibold mb-3'>
              পণ্যের বিবরণ
            </h2>
            <p className='text-gray-600 font-mont text-sm sm:text-base'>
              এসেনশিয়াল অয়েল নেজাল ইনহেলার <br />
              পিউর ও অর্গানিক • কাস্টম ফ্লেভার • ডুয়াল নেজাল স্টিক <br />
              যেকোনো সময় সহজে শ্বাস নিন 🌿
            </p>
            <p className='py-3 text-gray-600 font-mont text-sm sm:text-base'>
              আমাদের এসেনশিয়াল অয়েল নেজাল ইনহেলার প্রাকৃতিকভাবে সাইনাসের
              অস্বস্তি, মাথার চাপ, টেনশন ও স্ট্রেস কমাতে সহায়তা করে। এতে
              ব্যবহৃত হয়েছে খাঁটি ও অর্গানিক এসেনশিয়াল অয়েল, যা নাকে
              প্রশান্তিদায়ক ও সতেজ অনুভূতি দেয়।
            </p>
            <p className='py-2 text-gray-600 font-mont text-sm sm:text-base font-semibold'>
              ✨ পণ্যের উপকারিতা
            </p>
            <ul className='list-disc list-inside space-y-2 text-gray-700 font-mont text-sm sm:text-base pl-4'>
              <li>সাইনাস ব্লক, নাকের অস্বস্তি ও চাপ কমাতে সাহায্য করে</li>
              <li>অ্যারোমাথেরাপির মাধ্যমে টেনশন ও স্ট্রেস রিলিফ</li>
              <li>সতেজ সুবাস যা এনার্জি ও ফোকাস বাড়াতে সহায়ক</li>
              <li>ডুয়াল নেজাল স্টিক – স্বাস্থ্যকর ও সহজ ব্যবহার</li>
              <li>ছোট ও বহনযোগ্য – পকেট বা ব্যাগে সহজেই রাখা যায়</li>
            </ul>
            <p className='py-3 text-gray-600 font-mont text-sm sm:text-base font-semibold'>
              🌱 পণ্যের তথ্য
            </p>
            <ul className='list-disc list-inside space-y-1 text-gray-700 font-mont text-sm sm:text-base pl-4'>
              <li>ব্যবহার উপযোগী বয়স: প্রাপ্তবয়স্ক</li>
              <li>উপাদান: প্রাকৃতিক এসেনশিয়াল অয়েল</li>
              <li>মেয়াদ: ১২ মাস</li>
              <li>ফ্লেভার: কাস্টমাইজেবল (নির্বাচন অনুযায়ী)</li>
            </ul>
          </div>
          <div className='mt-4 flex flex-col items-center justify-center'>
                   <img
              src='/assets/product/inhaler/model.jpg'
              alt='Aromatherapy Nasal Inhaler - Peppermint Style'
              className='w-full h-full object-cover shadow-md hover:shadow-lg transition-shadow'
            />
                   <img
              src='/assets/product/inhaler/driving.jpg'
              alt='Aromatherapy Nasal Inhaler - Peppermint Style'
              className='w-full h-full object-cover shadow-md hover:shadow-lg transition-shadow'
            />
                   <img
              src='/assets/product/inhaler/motion.jpg'
              alt='Aromatherapy Nasal Inhaler - Peppermint Style'
              className='w-full h-full object-cover shadow-md hover:shadow-lg transition-shadow'
            />
                   <img
              src='/assets/product/inhaler/refresh.jpg'
              alt='Aromatherapy Nasal Inhaler - Peppermint Style'
              className='w-full h-full object-cover shadow-md hover:shadow-lg transition-shadow'
            />
          </div>

          {/* FAQ Section */}
          <div className='bg-white p-4 sm:p-5 rounded-lg mt-4 sm:mt-6'>
            <h2 className='text-lg sm:text-xl font-semibold flex items-center gap-2 mb-3'>
              <FaQuestionCircle className='text-red-500' /> প্রায়শই জিজ্ঞাসিত
              প্রশ্নাবলী (FAQ)
            </h2>
            <div className='mt-4 space-y-4'>
              {faqData.map((faq, index) => (
                <div key={index} className='border-b pb-4 last:border-b-0'>
                  <p className='text-gray-800 font-semibold mb-1 text-sm sm:text-base'>
                    <span className='text-blue-600'>প্রশ্ন:</span>{' '}
                    {faq.question}
                  </p>
                  <p className='text-gray-600 font-mont text-sm sm:text-base'>
                    <span className='font-semibold'>উত্তর:</span> {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CustomSection>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  if (!productData) {
    return { notFound: true };
  }
  return { props: { initialProduct: productData } };
}

export default ProductDetails;
