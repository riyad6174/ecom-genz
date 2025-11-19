import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GoShareAndroid } from 'react-icons/go';
import Navbar from '@/components/common/Navbar';
import Related from '@/components/checkout/Related';
import CustomSection from '@/components/layout/CustomSection';
import { products } from '@/utils/products';
import { addToCart } from '@/store/cartSlice';
import Footer from '@/components/common/Footer';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Find the specific product for this page
const productData = products.find(
  (p) => p.slug === 'adjustable-tint-polarized-sunglass'
);

const ProductDetails = ({ initialProduct }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [product, setProduct] = useState(initialProduct);
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      setSelectedColor(initialProduct.variants?.[0]?.color || '');
      setActiveImage(initialProduct.images?.[0] || '');

      // Push product view event to data layer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          currency: 'BDT',
          value: initialProduct.price || 0,
          items: [
            {
              item_id: initialProduct.id || 'unknown',
              item_name: initialProduct.title || 'unknown',
              price: initialProduct.price || 0,
              original_price: initialProduct.originalPrice || 0,
              item_category: 'Sunglasses',
              item_variant: initialProduct.variants?.[0]?.color || 'unknown',
            },
          ],
        },
      });
    }
  }, [initialProduct]);

  const handleImageClick = (image) => {
    setActiveImage(image);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increment' && quantity < 999) {
      setQuantity(quantity + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = () => {
    if (!product) {
      console.error('Product data is missing');
      return;
    }

    // Push add_to_cart event to data layer
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
            item_category: 'Sunglasses',
            item_variant: selectedColor || 'unknown',
            quantity: quantity || 1,
          },
        ],
      },
    });

    // Dispatch to Redux store
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        selectedColor,
        quantity,
        image: activeImage,
      })
    );

    // Redirect to order page
    router.push('/order');
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  // Rest of the JSX remains unchanged
  return (
    <>
      <Head>
        <title>{product.title} | Buy Online in Bangladesh | Sheii Shop</title>
        <meta
          name='description'
          content={`বাংলাদেশে সেরা দামে ${product.title} কিনুন। বৈশিষ্ট্যসমূহের মধ্যে রয়েছে ১-৯ স্তরের অ্যাডজাস্টেবল লেন্স, ইউভি সুরক্ষা, পোলারাইজড টেকনোলজি এবং আরও অনেক কিছু।`}
        />
        <meta
          name='keywords'
          content={`Adjustable Tint Polarized Sunglass, সানগ্লাস বাংলাদেশ, polarized sunglasses price BD, UV protection glasses, men's round sunglasses, adjustable lenses`}
        />
        <meta name='robots' content='index, follow' />
        <meta name='author' content='Sheii Shop' />
        <link
          rel='canonical'
          href={`https://www.sheiishop.com/product/${product.slug}`}
        />
        <meta property='og:type' content='product' />
        <meta property='og:title' content={`${product.title} | Sheii Shop`} />
        <meta property='og:description' content={product.description} />
        <meta
          property='og:image'
          content={
            product.images?.[0] ||
            'https://www.sheiishop.com/assets/footer-logo.png'
          }
        />
        <meta
          property='og:url'
          content={`https://www.sheiishop.com/product/${product.slug}`}
        />
        <meta property='og:site_name' content='Sheii Shop' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={`${product.title} | Sheii Shop`} />
        <meta name='twitter:description' content={product.description} />
        <meta
          name='twitter:image'
          content={
            product.images?.[0] ||
            'https://www.sheiishop.com/assets/footer-logo.png'
          }
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Product',
              name: product.title,
              image: product.images,
              description: product.description,
              sku: product.id,
              brand: {
                '@type': 'Brand',
                name: 'Sheii Shop',
              },
              offers: {
                '@type': 'Offer',
                url: `https://www.sheiishop.com/product/${product.slug}`,
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
      <div>
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
          .color-button {
            transition: all 0.2s ease-in-out;
          }
          .color-button-active {
            border-color: #3b82f6;
            transform: scale(1.1);
          }
        `}</style>
        <div className='py-8 container mx-auto px-4 lg:px-8'>
          <div className='bg-white md:py-6 rounded-2xl md:rounded-xl shadow-lg'>
            <div className='flex flex-col md:flex-row gap-4 md:gap-6 -mx-4'>
              <div className='w-full md:w-3/4 px-4'>
                <div className='p-2 md:p-0 md:grid md:grid-cols-4 gap-4'>
                  <div className='col-span-3 md:pl-6'>
                    <img
                      className='w-full h-[267px] md:h-[533px] object-cover rounded-lg image-transition'
                      src={activeImage}
                      alt={product.title}
                    />
                    <div className='flex justify-center gap-2 mt-4 md:hidden'>
                      {product.images.slice(1).map((image, index) => (
                        <img
                          key={index}
                          className={`w-[80px] h-[80px] object-cover rounded-lg cursor-pointer small-image ${
                            activeImage === image
                              ? 'small-image-active'
                              : 'small-image-inactive'
                          }`}
                          src={image}
                          alt={`${product.title} Thumbnail ${index + 1}`}
                          onClick={() => handleImageClick(image)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className='col-span-1 hidden md:flex flex-col items-center gap-4'>
                    {product.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        className={`w-full h-[167px] object-cover rounded-lg cursor-pointer small-image ${
                          activeImage === image
                            ? 'small-image-active'
                            : 'small-image-inactive'
                        }`}
                        src={image}
                        alt={`${product.title} Thumbnail ${index + 1}`}
                        onClick={() => handleImageClick(image)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className='md:w-1/2 px-7 md:px-0 py-4'>
                <h2 className='text-lg md:text-2xl font-semibold font-mont text-gray-800 md:mb-4'>
                  {product.title}
                </h2>
                <p className='text-gray-600 text-sm mb-4 font-mont'>
                  {product.description}
                </p>
                <div className='mb-6'>
                  <span className='font-semibold text-gray-700'>
                    কালার সিলেক্ট করুন
                  </span>
                  <div className='flex items-center gap-3 mt-4'>
                    {product.variants.map((variant) => (
                      <div
                        key={variant.color}
                        className={`border-2  flex items-center justify-center rounded-full p-1 cursor-pointer color-button ${
                          selectedColor === variant.color
                            ? 'color-button-active'
                            : ''
                        }`}
                        onClick={() => handleColorChange(variant.color)}
                      >
                        <button
                          className='w-[30px] h-[30px] rounded-full'
                          style={{
                            backgroundColor:
                              variant.color.toLowerCase() == 'golden'
                                ? 'wheat'
                                : variant.color.toLowerCase(),
                          }}
                        ></button>
                        <span className='px-1'>{variant.color}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex items-center justify-start gap-2 text-md mb-6'>
                  <span className='text-blue-900 font-bold text-xl'>
                    ৳ {product.price.toFixed(2)}
                  </span>
                  <span className='text-gray-500 font-normal text-lg line-through'>
                    ৳ {product.originalPrice.toFixed(2)}
                  </span>
                </div>
                <div className='flex items-center justify-start gap-4 mb-6'>
                  <div className='relative flex items-center max-w-[8rem] border border-gray-400 rounded-lg bg-white'>
                    <button
                      type='button'
                      onClick={() => handleQuantityChange('decrement')}
                      className='hover:bg-gray-200 rounded-s-lg py-3 px-4 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none'
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
                      className='h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5'
                    />
                    <button
                      type='button'
                      onClick={() => handleQuantityChange('increment')}
                      className='hover:bg-gray-200 rounded-e-lg py-3 px-4 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none'
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
                    className='flex items-center bg-[#a4dd00] text-white justify-center gap-2 border border-blue-600 px-6 py-[12px] rounded-md font-mont font-semibold text-sm'
                    disabled={!product.inStock}
                  >
                    <span>{product.inStock ? 'Buy Now' : 'Out of Stock'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomSection>
        <div className='px-3'>
          <div className='bg-white p-5 rounded-lg'>
            <div className='flex justify-between items-center mb-3'>
              <h2 className='text-lg font-semibold'>Description</h2>
            </div>
            <div className='mt-10'>
              <p className='text-gray-600 font-mont text-sm'>
                আপনার দৈনন্দিন জীবনকে আরও আরামদায়ক এবং স্টাইলিশ করে তুলুন এই
                অ্যাডজাস্টেবল টিন্ট পোলারাইজড সানগ্লাস দিয়ে। এটি একটি
                প্রিমিয়াম পুরুষদের সানগ্লাস যা সক্রিয় জীবনযাপনের জন্য তৈরি।
                ১-৯ স্তরের অ্যাডজাস্টেবল লেন্স দিয়ে আপনি যেকোনো আলোর
                পরিস্থিতিতে দৃষ্টিকে পুরোপুরি নিয়ন্ত্রণ করতে পারবেন। এর
                অভ্যন্তরীণ এনডি ফিল্টার এবং পোলারাইজড লেন্স ক্ষতিকর ইউভি রশ্মি
                আটকে দেয় এবং ঝলকানি কমিয়ে দৃষ্টি স্পষ্ট করে।
              </p>
              <p className='text-gray-600 font-mont text-sm mt-4'>
                বাইরের অ্যাডভেঞ্চার, বিচ ট্রিপ বা দৈনন্দিন পরিধানে এটি চোখকে
                দারুণ সুরক্ষা দেয়। ক্লাসিক রাউন্ড ফ্রেম এবং কালো ফিনিশের সাথে
                এটি আধুনিক স্টাইলের সাথে ব্যবহারিকতা মিশিয়ে দিয়েছে। বিচে,
                রাস্তায় বা ঘরের ভিতর—যেকোনো জায়গায় এটি আপনার সঙ্গী হয়ে উঠবে।
                ডিমেবল লেন্স এবং সুন্দর ডিজাইন এটিকে স্পোর্টস, ভ্রমণ, কাজ বা
                আরামের জন্য আদর্শ করে তোলে। উচ্চমানের হালকা উপাদান দিয়ে তৈরি
                এটি টেকসই এবং সারাদিন পরার জন্য আরামদায়ক। অ্যাডজাস্টেবল নোজ
                প্যাড এবং নন-স্লিপ রাবার টেম্পল নিশ্চিত করে যে ফিটিং সুরক্ষিত
                এবং মন ভালো রাখে।
              </p>
              <p className='text-gray-600 font-mont text-sm mt-4'>
                এটি সব ধরনের আলোর পরিস্থিতিতে মানিয়ে নেয় এবং চোখের স্বাস্থ্য
                রক্ষা করে, যা ফিটনেসপ্রেমী এবং স্টাইল-সচেতন ব্যক্তিদের জন্য
                পারফেক্ট।
              </p>
              <p className='py-5 text-gray-600 font-mont text-sm mt-4'>
                Key Features:
              </p>
              <ul className='list-disc list-inside text-gray-600 font-mont text-sm'>
                <li>🔍 ১-৯ স্তরের অ্যাডজাস্টেবল লেন্স</li>
                <li>☀️ ক্ষতিকর ইউভি রশ্মি থেকে সুরক্ষা</li>
                <li>🛡️ এনডি ফিল্টার এবং পোলারাইজড লেন্স</li>
                <li>👓 ঝলকানি কমানো এবং দৃষ্টি স্পষ্টকরণ</li>
                <li>🎨 স্টাইলিশ রাউন্ড ফ্রেম ডিজাইন</li>
                <li>🛤️ বহুমুখী: ড্রাইভিং, সাইক্লিং, বিচ অ্যাকটিভিটি</li>
                <li>⚖️ হালকা ও টেকসই উপাদান</li>
                <li>🛡️ অ্যাডজাস্টেবল নোজ প্যাড এবং নন-স্লিপ টেম্পল</li>
                <li>👕 সারাদিন আরামদায়ক পরিধান</li>
              </ul>
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
