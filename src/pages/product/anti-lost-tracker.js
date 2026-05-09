import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { GoShareAndroid } from 'react-icons/go';
import {
  FaApple,
  FaAndroid,
  FaMapMarkerAlt,
  FaLock,
  FaSyncAlt,
  FaBatteryHalf,
  FaQuestionCircle,
  FaUser,
  FaRegCommentDots,
} from 'react-icons/fa';
import Navbar from '@/components/common/Navbar';
import CustomSection from '@/components/layout/CustomSection';
import { products } from '@/utils/products';
import { addToCart } from '@/store/cartSlice';
import { useCartDialog } from '@/context/CartDialogContext';
import Footer from '@/components/common/Footer';
import Head from 'next/head';

const productData = products.find((p) => p.slug === 'anti-lost-tracker');

const getVariantKey = (variants) => {
  if (!variants || variants.length === 0) return null;
  return Object.keys(variants[0]).find((key) => key !== 'id') || null;
};

const getVariantValue = (variant) => {
  const key = getVariantKey([variant]);
  return key ? variant[key] : null;
};

const ProductDetails = ({ initialProduct }) => {
  const dispatch = useDispatch();
  const { openDialog } = useCartDialog();
  const viewItemFired = useRef(false);
  const [product, setProduct] = useState(initialProduct);
  const [selectedVariant, setSelectedVariant] = useState('Android + iOS');
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [variantKey, setVariantKey] = useState(null);

  useEffect(() => {
    if (viewItemFired.current) return;
    viewItemFired.current = true;
    if (initialProduct) {
      setProduct(initialProduct);
      const key = getVariantKey(initialProduct.variants);
      setVariantKey(key);
      setSelectedVariant(
        initialProduct.variants[0] ? initialProduct.variants[0][key] : ''
      );
      setActiveImage(initialProduct.images[0] || '');

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          items: [
            {
              item_id: initialProduct.id || 'unknown',
              item_name: initialProduct.title || 'unknown',
              price: initialProduct.price || 0,
              original_price: initialProduct.originalPrice || 0,
              item_category: 'Trackers',
              item_variant:
                initialProduct.variants?.[0]?.type ||
                initialProduct.variants?.[0]?.color ||
                'unknown',
            },
          ],
          currency: 'BDT',
          value: initialProduct.price || 0,
        },
      });
    }
  }, [initialProduct]);

  const handleImageClick = (image) => setActiveImage(image);

  const handleVariantChange = (variant) => {
    const value = getVariantValue(variant);
    setSelectedVariant(value);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increment' && quantity < 999) setQuantity(quantity + 1);
    else if (type === 'decrement' && quantity > 1) setQuantity(quantity - 1);
  };

  const handleBuyNow = () => {
    if (!product) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
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
            item_category: 'Trackers',
            item_variant: selectedVariant || 'unknown',
            quantity: quantity || 1,
          },
        ],
      },
    });

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        selectedColor: selectedVariant,
        quantity,
        image: activeImage,
        variantKey,
      })
    );
    openDialog();
  };

  if (!product) {
    return (
      <div className='text-center py-10 text-gray-600 font-mont text-lg'>
        পণ্য খুঁজে পাওয়া যায়নি
      </div>
    );
  }

  const getVariantTitle = () => {
    if (product.variants && product.variants.length > 0) {
      const firstVariant = product.variants[0];
      if (firstVariant.color) return 'কালার সিলেক্ট করুন';
      if (firstVariant.type) return 'মডেল সিলেক্ট করুন';
    }
    return 'ভেরিয়েন্ট সিলেক্ট করুন';
  };

  const faqData = [
    {
      question: 'এই ট্র্যাকারগুলো কি Android এবং iOS-এর সাথে কাজ করে?',
      answer:
        'Hoco E101 ডুয়াল মোডটি Android এবং iOS উভয় অপারেটিং সিস্টেমের সাথে কাজ করে। Borofone ট্র্যাকারটি শুধুমাত্র iOS ডিভাইসের জন্য ডিজাইন করা হয়েছে। কেনার সময় আপনার পছন্দের মডেলটি নির্বাচন করুন।',
    },
    {
      question: 'ট্র্যাকার হারিয়ে গেলে কি লোকেশন দেখা যাবে?',
      answer:
        'হ্যাঁ! Hoco E101 Google Find Hub (Android-এর জন্য) এবং Apple Find My (iOS-এর জন্য) নেটওয়ার্ক উভয়ের সাথেই কাজ করে। Borofone শুধুমাত্র Apple Find My নেটওয়ার্ক ব্যবহার করে। ফলে অন্য ব্যবহারকারীদের ডিভাইসের মাধ্যমে ট্র্যাকারটির লোকেশন ম্যাপে দেখা যাবে।',
    },
    {
      question: 'ব্যাটারি কতদিন চলে এবং এটি কি পরিবর্তন করা যায়?',
      answer:
        'Hoco E101 একটি CR2032 (210 mAh) বোতাম ব্যাটারি ব্যবহার করে যা প্রায় 6-8 মাস পর্যন্ত চলে। Borofone ট্র্যাকারটিও CR2032 ব্যাটারি ব্যবহার করে যা 9-12 মাস পর্যন্ত চলে। ব্যাটারি শেষ হলে আপনি নিজেই খুব সহজে পরিবর্তন করতে পারবেন।',
    },
    {
      question: 'ট্র্যাকারগুলো কি ওয়াটারপ্রুফ?',
      answer:
        'হ্যাঁ, Hoco E101 IPX5 ওয়াটার রেজিস্ট্যান্ট রেটিং পেয়েছে, যা হালকা বৃষ্টি এবং জলের ছিটা থেকে সুরক্ষা দেয়। Borofone ট্র্যাকারটি IP65 রেটিং সহ ওয়াটার-রেজিস্ট্যান্ট। তবে কোনোটিই সম্পূর্ণ জলে ডুবানোর জন্য নয়।',
    },
    {
      question: 'একাধিক ট্র্যাকার একই অ্যাপে ম্যানেজ করা যাবে?',
      answer:
        'হ্যাঁ, আপনি Google Find Hub বা Apple Find My অ্যাপে একাধিক ট্র্যাকার যুক্ত করতে পারবেন। প্রতিটি ট্র্যাকার আলাদাভাবে ম্যানেজ এবং ট্র্যাক করা যাবে।',
    },
    {
      question: 'ট্র্যাকারের রেঞ্জ কত দূরত্ব পর্যন্ত?',
      answer:
        'ব্লুটুথ রেঞ্জ প্রায় 30-50 মিটার (লাইনে অফ সাইটে)। তবে নেটওয়ার্কের মাধ্যমে পুরো বিশ্বের যেকোনো জায়গা থেকে লোকেশন ট্র্যাক করা যাবে।',
    },
  ];

  const reviewsData = [
    {
      name: 'আরিফ হোসেন',
      rating: 5,
      text: 'Hoco E101 ডুয়াল মোডটি নিয়েছি, দারুণ কাজ করে! আমার একসাথে Android ফোন এবং iPad আছে, দুটোতেই পারফেক্টলি কাজ করছে। চাবির রিং-এ লাগিয়ে রেখেছি, আর ভুল করে চাবি রেখে চলে গেলে সাথে সাথে নোটিফিকেশন আসছে।',
    },
    {
      name: 'সুমাইয়া রহমান',
      rating: 5,
      text: 'Borofone iOS ভার্সনটি আইফোনের জন্য পারফেক্ট। ফাইন্ড মাই অ্যাপে খুব দ্রুত লোকেশন আপডেট হয় এবং ব্যাটারি লাইফ দারুণ। ব্যাগের জন্য কিনেছি, এখন আর দুশ্চিন্তা করতে হয় না।',
    },
    {
      name: 'রাকিবুল ইসলাম',
      rating: 4,
      text: 'Hoco E101-এর সাইজটা খুবই কম্প্যাক্ট এবং হালকা। কার চাবির গোছায় লাগিয়ে দিয়েছি, ওজনই টের পাওয়া যায় না। ডুয়াল মোড হওয়ায় পরিবারের সবার সাথে শেয়ার করা যায়।',
    },
    {
      name: 'তানজিনা আক্তার',
      rating: 5,
      text: 'Borofone ট্র্যাকারটি আমার বাচ্চার স্কুল ব্যাগে লাগিয়েছি। স্কুল থেকে ফেরার সময় ব্যাগ কোথায় আছে তা সহজেই দেখতে পারি। বাচ্চা নিরাপদে থাকলে মা-বাবার চিন্তা কমে যায়।',
    },
  ];

  return (
    <>
      <Head>
        <title>Hoco E101 & Borofone Anti-Lost Tracker | Genz Shop</title>
        <meta
          name='description'
          content='Hoco E101 ডুয়াল মোড (Android + iOS) এবং Borofone iOS Anti-Lost Tracker কিনুন Genz Shop-এ। IPX5/IP65 ওয়াটার রেজিস্ট্যান্ট, 6-12 মাস ব্যাটারি লাইফ সহ।'
        />
        <meta
          property='og:title'
          content='Hoco E101 & Borofone Anti-Lost Tracker | Genz Shop'
        />
        <meta
          property='og:description'
          content='আপনার মূল্যবান জিনিসপত্র ট্র্যাক করুন Hoco E101 ডুয়াল মোড এবং Borofone iOS ট্র্যাকার দিয়ে। Android ও iOS সাপোর্ট, ওয়াটার রেজিস্ট্যান্ট, লং ব্যাটারি লাইফ।'
        />
        <meta
          property='og:url'
          content={`https://www.genzshop.store/product/${product.slug}`}
        />
        <meta property='og:type' content='product' />
        <meta property='og:image' content={product.images[0]} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='Hoco E101 & Borofone Anti-Lost Tracker | Genz Shop'
        />
        <meta
          name='twitter:description'
          content='আপনার চাবি, ব্যাগ, ওয়ালেট ট্র্যাক করুন Hoco E101 (Android+iOS) এবং Borofone (iOS) ট্র্যাকার দিয়ে। Genz Shop থেকে কিনুন।'
        />
        <meta name='twitter:image' content={product.images[0]} />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.title,
              image: product.images,
              description:
                'Hoco E101 ডুয়াল মোড এবং Borofone iOS Anti-Lost Tracker',
              sku: product.id,
              brand: {
                '@type': 'Brand',
                name: 'Hoco & Borofone',
              },
              offers: {
                '@type': 'Offer',
                url: `https://www.genzshop.store/product/${product.slug}`,
                priceCurrency: 'BDT',
                price: product.price,
                availability: product.inStock
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/OutOfStock',
                itemCondition: 'https://schema.org/NewCondition',
              },
            }),
          }}
        />
      </Head>
      <Navbar />
      <div className='py-6 sm:py-8 container mx-auto px-4 sm:px-6 lg:px-8'>
        <style jsx>{`
          .image-transition {
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
          }
          .image-transition:hover {
            transform: scale(1.02);
          }
          .small-image {
            transition: opacity 0.2s ease-in-out, border-color 0.2s ease-in-out;
            border-width: 2px;
          }
          .small-image-active {
            border-color: #3b82f6;
            opacity: 1;
          }
          .small-image-inactive {
            opacity: 0.7;
            border-color: transparent;
          }
          .variant-button {
            transition: all 0.2s ease-in-out;
            min-width: 40px;
          }
          .variant-button-active {
            border-color: #3b82f6 !important;
            transform: scale(1.05);
            background-color: #eff6ff;
          }
        `}</style>
        <div className='bg-white py-4 sm:py-6 rounded-xl shadow-lg'>
          <div className='flex flex-col lg:flex-row gap-4 sm:gap-6'>
            {/* Image Section */}
            <div className='w-full lg:w-3/5 px-4'>
              <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
                <div className='col-span-1 sm:col-span-3'>
                  <img
                    className='w-full h-64 sm:h-80 lg:h-[400px] object-cover rounded-lg image-transition'
                    src={activeImage}
                    alt={product.title}
                  />
                  <div className='flex justify-center gap-2 mt-4 sm:hidden'>
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer small-image ${
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
                <div className='hidden sm:flex flex-col items-center gap-4'>
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
                Hoco E101 ডুয়াল মোড (Android + iOS) এবং Borofone iOS
                অ্যান্টি-লস্ট ট্র্যাকার। আপনার মূল্যবান জিনিসপত্র হারানোর
                চিন্তা দূর করুন। স্মার্ট ট্র্যাকিং টেকনোলজি দিয়ে সবসময় জানুন
                আপনার চাবি, ব্যাগ, ওয়ালেট কোথায় আছে।
              </p>

              {/* Variant Section */}
              {product.variants && product.variants.length > 0 && variantKey && (
                <div className='mb-6'>
                  <span className='font-semibold text-gray-700 text-sm sm:text-base'>
                    {getVariantTitle()}
                  </span>
                  <div className='flex flex-col md:flex-row items-start gap-3 mt-4 flex-wrap'>
                    {product.variants.map((variant, index) => {
                      const value = getVariantValue(variant);
                      const isSelected = selectedVariant === value;
                      return (
                        <div
                          key={index}
                          className={`border-2 flex items-center justify-center rounded-lg cursor-pointer variant-button px-4 py-2 text-gray-800 border-gray-300 hover:bg-gray-100 ${
                            isSelected ? 'variant-button-active' : ''
                          }`}
                          onClick={() => handleVariantChange(variant)}
                        >
                          {value === 'Android + iOS' ? (
                            <div className='flex items-center gap-2'>
                              <FaAndroid className='text-xl text-green-600' />
                              <FaApple className='text-xl text-gray-800' />
                              <span className='text-sm font-semibold'>
                                Hoco E101 ডুয়াল মোড
                              </span>
                            </div>
                          ) : value === 'iOS' ? (
                            <div className='flex items-center gap-2'>
                              <FaApple className='text-xl text-gray-800' />
                              <span className='text-sm font-semibold'>
                                Borofone iOS ভার্সন
                              </span>
                            </div>
                          ) : (
                            <span className='text-sm font-semibold'>{value}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className='flex items-center justify-start gap-2 text-md mb-6'>
                <span className='text-blue-600 font-bold text-lg sm:text-xl'>
                  ৳ {product.price.toFixed(2)}
                </span>
                <span className='text-gray-500 font-normal text-base sm:text-lg line-through'>
                  ৳ {product.originalPrice.toFixed(2)}
                </span>
              </div>

              <div className='flex items-center justify-start gap-4 mb-6'>
                <div className='flex items-center border border-gray-400 rounded-lg bg-white'>
                  <button
                    type='button'
                    onClick={() => handleQuantityChange('decrement')}
                    className='hover:bg-gray-200 rounded-l-lg py-2 px-3 sm:px-4 h-10 sm:h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none'
                  >
                    <svg
                      className='w-2 h-2 text-gray-900'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 18 2'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M1 1h16'
                      />
                    </svg>
                  </button>
                  <input
                    type='text'
                    value={quantity}
                    readOnly
                    className='h-10 sm:h-11 w-12 sm:w-16 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block py-2.5'
                  />
                  <button
                    type='button'
                    onClick={() => handleQuantityChange('increment')}
                    className='hover:bg-gray-200 rounded-r-lg py-2 px-3 sm:px-4 h-10 sm:h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none'
                  >
                    <svg
                      className='w-2 h-2 text-gray-900'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 18 18'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 1v16M1 9h16'
                      />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleBuyNow}
                  className='flex items-center bg-gradient-to-r from-blue-700 to-blue-900 text-white justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-mont font-semibold text-sm hover:from-blue-800 hover:to-blue-950 transition-all shadow-md disabled:opacity-70'
                  disabled={!product.inStock}
                >
                  <span>{product.inStock ? 'এখনই কিনুন' : 'স্টক নেই'}</span>
                </button>
              </div>

              {/* Quick Features */}
              <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
                <h3 className='font-semibold text-gray-800 mb-3'>
                  দ্রুত বৈশিষ্ট্যসমূহ:
                </h3>
                <div className='grid grid-cols-2 gap-3'>
                  <div className='flex items-center gap-2'>
                    <FaSyncAlt className='text-blue-500' />
                    <span className='text-sm'>ডুয়াল মোড সাপোর্ট</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaBatteryHalf className='text-green-500' />
                    <span className='text-sm'>9-12 মাস ব্যাটারি</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaMapMarkerAlt className='text-red-500' />
                    <span className='text-sm'>গ্লোবাল ট্র্যাকিং</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaLock className='text-purple-500' />
                    <span className='text-sm'>ওয়াটার রেজিস্ট্যান্ট</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomSection>
        <div className='px-3 sm:px-4'>
          {/* Product Description */}
          <div className='bg-white p-4 sm:p-5 rounded-lg shadow-sm'>
            <h2 className='text-lg sm:text-xl font-semibold mb-3'>
              পণ্যের বিবরণ
            </h2>
            <p className='text-gray-600 font-mont text-sm sm:text-base mb-4'>
              আপনার মূল্যবান জিনিসপত্রের খোঁজ রাখুন{' '}
              <strong>
                Hoco E101 ডুয়াল মোড এবং Borofone অ্যান্টি-লস্ট ট্র্যাকার
              </strong>
              -এর মাধ্যমে। এই স্মার্ট ট্র্যাকারগুলো আপনার চাবি, ব্যাগ, ওয়ালেট,
              লাগেজ এমনকি পোষা প্রাণীর লোকেশনও ট্র্যাক করতে সক্ষম। সম্পূর্ণ
              বিল্ট-ইন নেটওয়ার্ক সাপোর্টের মাধ্যমে বিশ্বব্যাপী কোটি কোটি
              ডিভাইসের সাথে কানেক্টেড থাকে আপনার ট্র্যাকারটি।
            </p>

            <div className='my-6 rounded-lg overflow-hidden border border-gray-200'>
              <img
                src='/assets/product/tracker/dual.webp'
                alt='Hoco E101 vs Borofone Tracker Comparison'
                className='w-full rounded-lg'
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            <p className='py-4 sm:py-5 text-gray-600 font-mont text-sm sm:text-base font-semibold'>
              Hoco E101 ডুয়াল মোড ট্র্যাকারের মূল বৈশিষ্ট্যসমূহ:
            </p>
            <ul className='space-y-3 text-gray-700 font-mont text-sm sm:text-base mb-6'>
              <li className='flex items-start gap-3'>
                <FaSyncAlt className='text-blue-500 mt-1 flex-shrink-0' />
                <span>
                  <strong>ডুয়াল-নেটওয়ার্ক ট্র্যাকিং কম্প্যাটিবিলিটি:</strong>{' '}
                  Apple Find My নেটওয়ার্ক এবং Google Find My Device উভয়ের সাথে
                  কাজ করে। iOS এবং Android উভয় প্ল্যাটফর্ম থেকে ট্র্যাক করতে
                  পারবেন।
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <FaApple className='text-gray-700 mt-1 flex-shrink-0' />
                <span>
                  <strong>আল্ট্রা-কম্প্যাক্ট ও হালকা ডিজাইন:</strong> মাত্র ৩২ ×
                  ৩২ × ৭ মিমি সাইজ এবং মাত্র ৭.৫ গ্রাম ওজন। চাবির রিং বা ব্যাগে
                  লাগানোর জন্য পারফেক্ট।
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <FaBatteryHalf className='text-green-500 mt-1 flex-shrink-0' />
                <span>
                  <strong>দীর্ঘস্থায়ী ব্যাটারি:</strong> CR2032 (210 mAh)
                  রিপ্লেসেবল বোতাম ব্যাটারি যা প্রায় ৬-৮ মাস পর্যন্ত চলে।
                  বারবার চার্জ করার ঝামেলা নেই।
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <FaAndroid className='text-green-600 mt-1 flex-shrink-0' />
                <span>
                  <strong>সহজ সেটআপ ও ওয়াইড কম্প্যাটিবিলিটি:</strong>{' '}
                  সাম্প্রতিক সব iOS এবং Android ডিভাইসের সাথে কাজ করে। ফোন,
                  ট্যাবলেট, এক্সেসরিজ সবকিছুর সাথে কম্প্যাটিবল।
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <FaMapMarkerAlt className='text-red-500 mt-1 flex-shrink-0' />
                <span>
                  <strong>ফ্লেক্সিবল প্লেসমেন্ট ও ব্যবহার:</strong> চাবিতে
                  লাগান, গাড়ির ভিতরে মাউন্ট করুন, লাগেজে লাগান বা পোষা প্রাণীর
                  কলারে এটাচ করুন। হারানোর চিন্তা দূর করুন।
                </span>
              </li>
            </ul>

            <p className='py-4 sm:py-5 text-gray-600 font-mont text-sm sm:text-base font-semibold'>
              Borofone iOS ট্র্যাকারের মূল বৈশিষ্ট্যসমূহ:
            </p>
            <ul className='space-y-3 text-gray-700 font-mont text-sm sm:text-base mb-6'>
              <li className='flex items-start gap-3'>
                <FaApple className='text-gray-800 mt-1 flex-shrink-0' />
                <span>
                  <strong>Apple Find My নেটওয়ার্ক সাপোর্ট:</strong> শুধুমাত্র
                  iOS ডিভাইসের জন্য অপটিমাইজড। Apple-এর নিজস্ব সিকিউর নেটওয়ার্ক
                  ব্যবহার করে।
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <FaLock className='text-blue-600 mt-1 flex-shrink-0' />
                <span>
                  <strong>প্রাইভেসি প্রোটেকশন:</strong> এন্ড-টু-এন্ড এনক্রিপশনের
                  মাধ্যমে আপনার লোকেশন ডেটা সম্পূর্ণ সুরক্ষিত।
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <FaBatteryHalf className='text-green-500 mt-1 flex-shrink-0' />
                <span>
                  <strong>লং-লাস্টিং ব্যাটারি:</strong> ৯-১২ মাস পর্যন্ত
                  ব্যাটারি লাইফ সহ CR2032 রিপ্লেসেবল ব্যাটারি।
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <GoShareAndroid className='text-gray-700 mt-1 flex-shrink-0' />
                <span>
                  <strong>শেয়ারিং সুবিধা:</strong> পরিবারের সদস্য বা বন্ধুদের
                  সাথে ট্র্যাকার শেয়ার করতে পারেন।
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <FaMapMarkerAlt className='text-red-500 mt-1 flex-shrink-0' />
                <span>
                  <strong>IP65 ওয়াটার রেজিস্ট্যান্ট:</strong> হালকা বৃষ্টি ও
                  জলের ছিটা থেকে সুরক্ষা। দৈনন্দিন ব্যবহারের জন্য উপযুক্ত।
                </span>
              </li>
            </ul>

            <div className='mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100'>
              <h3 className='font-semibold text-blue-800 mb-2'>
                কোন মডেলটি আপনার জন্য সঠিক?
              </h3>
              <p className='text-gray-700 text-sm'>
                <strong>Hoco E101 ডুয়াল মোড:</strong> যদি আপনার পরিবারে Android
                এবং iOS উভয় ডিভাইস থাকে, অথবা ভবিষ্যতে প্ল্যাটফর্ম পরিবর্তন
                করার সম্ভাবনা থাকে।
                <br />
                <strong>Borofone iOS ভার্সন:</strong> যদি আপনি শুধুমাত্র iPhone,
                iPad বা Mac ব্যবহার করেন এবং Apple একোসিস্টেমে পুরোপুরি থাকেন।
              </p>
            </div>
          </div>

          {/* User Guide */}
          <div className='bg-white p-4 sm:p-5 rounded-lg shadow-sm mt-6'>
            <h2 className='text-lg sm:text-xl font-semibold flex items-center gap-2 mb-3'>
              <FaUser className='text-blue-500' /> ইউজার গাইড
            </h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div>
                <p className='text-gray-600 font-mont text-sm sm:text-base mb-4'>
                  আপনার <strong>অ্যান্টি-লস্ট ট্র্যাকার</strong> ব্যবহার শুরু
                  করতে এই সহজ ধাপগুলো অনুসরণ করুন:
                </p>
                <ol className='list-decimal list-inside text-gray-600 font-mont text-sm sm:text-base space-y-4'>
                  <li className='pb-3 border-b border-gray-100'>
                    <span className='font-semibold text-gray-800'>
                      ব্যাটারি স্থাপন:
                    </span>{' '}
                    ট্র্যাকারটির পেছনের কভার খুলে CR2032 বোতাম ব্যাটারিটি প্রবেশ
                    করান। (+) চিহ্ন উপরে রেখে কভারটি শক্তভাবে বন্ধ করুন।
                  </li>
                  <li className='pb-3 border-b border-gray-100'>
                    <span className='font-semibold text-gray-800'>
                      পেয়ারিং শুরু:
                    </span>{' '}
                    ট্র্যাকারের বাটনটি 3 সেকেন্ডের জন্য চাপুন এবং ধরে রাখুন
                    যতক্ষণ না এটি শব্দ করে বা LED জ্বলে পেয়ারিং মোডে যায়।
                  </li>
                  <li className='pb-3 border-b border-gray-100'>
                    <span className='font-semibold text-gray-800'>
                      অ্যাপের সাথে সংযোগ:
                    </span>
                    <ul className='list-disc list-inside ml-5 mt-2 space-y-2'>
                      <li>
                        <strong className='text-green-600'>
                          Android-এর জন্য:
                        </strong>{' '}
                        আপনার ফোনে <strong>Google Find Hub</strong> অ্যাপটি
                        খুলুন এবং কাছাকাছি ডিভাইস হিসেবে ট্র্যাকারটি যুক্ত করুন।
                      </li>
                      <li>
                        <strong className='text-gray-700'>iOS-এর জন্য:</strong>{' '}
                        <strong>Find My</strong> অ্যাপে যান, 'Items' ট্যাবে (+)
                        আইকনে ট্যাপ করে 'Other Supported Item' নির্বাচন করুন এবং
                        স্ক্রিনের নির্দেশনা অনুসরণ করুন।
                      </li>
                    </ul>
                  </li>
                  <li className='pb-3 border-b border-gray-100'>
                    <span className='font-semibold text-gray-800'>
                      ব্যবহার শুরু:
                    </span>{' '}
                    ট্র্যাকারটিকে আপনার চাবি, ব্যাগ বা ওয়ালেটে সংযুক্ত করুন।
                    এখন আপনি অ্যাপের মাধ্যমে এটির রিয়েল-টাইম লোকেশন দেখতে
                    পারবেন এবং কাছাকাছি থাকলে শব্দ বাজাতে পারবেন।
                  </li>
                  <li>
                    <span className='font-semibold text-gray-800'>
                      নোটিফিকেশন সেটআপ:
                    </span>{' '}
                    অ্যাপের সেটিংসে 'Notify When Left Behind' বা 'হারিয়ে গেলে
                    জানান' অপশনটি চালু করুন, যাতে আপনি জিনিসটি ভুলে গেলে
                    অ্যালার্ট পেতে পারেন।
                  </li>
                </ol>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='w-full aspect-video rounded-xl overflow-hidden shadow-md'>
                  <iframe
                    className='w-full h-full'
                    src='https://www.youtube.com/embed/H6m1ESYHupc?si=V5t-RODIeZCHI9m0'
                    title='YouTube video player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                  ></iframe>
                </div>
                <div className='w-full aspect-video rounded-xl overflow-hidden shadow-md'>
                  <iframe
                    className='w-full h-full'
                    src='https://www.youtube.com/embed/OfuMSheZQ8A'
                    title='YouTube video player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                  ></iframe>
                </div>
                <div className='p-3 bg-gray-50 rounded-lg'>
                  <p className='text-sm text-gray-600'>
                    <strong>টিপ:</strong> ট্র্যাকারের নাম সেট করুন যাতে সহজে
                    চেনা যায় (যেমন: "কার চাবি", "অফিস ব্যাগ", ইত্যাদি)।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className='bg-white p-4 sm:p-5 rounded-lg shadow-sm mt-6'>
            <h2 className='text-lg sm:text-xl font-semibold flex items-center gap-2 mb-3'>
              <FaQuestionCircle className='text-red-500' /> প্রায়শই জিজ্ঞাসিত
              প্রশ্নাবলী (FAQ)
            </h2>
            <div className='mt-4 space-y-4'>
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className='border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition duration-200'
                >
                  <p className='text-gray-800 font-semibold mb-2 text-sm sm:text-base flex items-start gap-2'>
                    <span className='text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs'>
                      Q{index + 1}
                    </span>
                    {faq.question}
                  </p>
                  <p className='text-gray-600 font-mont text-sm sm:text-base pl-8'>
                    <span className='font-semibold text-green-600'>উত্তর:</span>{' '}
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
            <div className='mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg'>
              <p className='text-yellow-800 text-sm'>
                <strong>গুরুত্বপূর্ণ:</strong> ট্র্যাকার হারিয়ে গেলে অবিলম্বে
                অ্যাপে 'Lost Mode' অ্যাক্টিভেট করুন। এতে ট্র্যাকারটি অন্য কারো
                ফোনের কাছ দিয়ে গেলে আপনাকে নোটিফিকেশন পাঠাবে।
              </p>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className='bg-white p-4 sm:p-5 rounded-lg shadow-sm mt-6'>
            <h2 className='text-lg sm:text-xl font-semibold flex items-center gap-2 mb-3'>
              <FaRegCommentDots className='text-purple-500' /> গ্রাহক রিভিউ
            </h2>
            <div className='mt-4 space-y-4'>
              {reviewsData.map((review, index) => (
                <div
                  key={index}
                  className='p-4 border border-gray-100 rounded-lg bg-gray-50 hover:bg-white transition duration-200'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <p className='text-sm sm:text-base font-semibold text-gray-800'>
                      {review.name}
                    </p>
                    <div className='text-yellow-500 text-sm'>
                      {Array(review.rating)
                        .fill()
                        .map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                    </div>
                  </div>
                  <p className='text-gray-600 text-sm sm:text-base italic'>
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
              ))}
              <div className='mt-4 pt-4 border-t border-gray-200'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-semibold text-gray-800'>সর্বমোট রেটিং</p>
                    <div className='flex items-center gap-2 mt-1'>
                      <div className='text-yellow-500'>★★★★★</div>
                      <span className='text-gray-600 text-sm'>
                        4.8/5.0 (12 রিভিউ)
                      </span>
                    </div>
                  </div>
                  <button className='px-4 py-2 bg-blue-50 text-blue-600 font-medium text-sm sm:text-base rounded-lg hover:bg-blue-100 transition duration-200'>
                    সকল রিভিউ দেখুন
                  </button>
                </div>
              </div>
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
