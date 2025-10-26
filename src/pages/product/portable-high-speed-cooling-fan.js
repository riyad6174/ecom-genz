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
// import FeatureImage from '@/assets/product/fan/fan-description.avif';
import Head from 'next/head';
import Image from 'next/image';

// Find the specific product for this page
const productData = products.find(
  (p) => p.slug === 'portable-high-speed-cooling-fan'
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
      setSelectedColor(initialProduct.variants[0]?.color || '');
      setActiveImage(initialProduct.images[0] || ''); // Set first image as default

      // Push product view event to data layer
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
              item_category: 'Electronics', // Adjust based on your product taxonomy
              item_variant: initialProduct.variants
                ? initialProduct.variants.map((v) => v.color).join(', ')
                : 'unknown',
            },
          ],
          currency: 'BDT', // Bangladeshi Taka
          value: initialProduct.price || 0,
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
    if (type === 'increment' && quantity < 100) {
      setQuantity(quantity + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = () => {
    if (product) {
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
              item_category: 'Wearables',
              item_variant: selectedColor || 'unknown',
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
          selectedColor,
          quantity,
          image: activeImage,
        })
      );
      router.push('/order');
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Head>
        <title>{product.title} | GenZ Shop</title>
        <meta
          name='description'
          content={`Buy the ${product.title} at GenZ Shop. ${product.description}`}
        />
        <meta
          name='keywords'
          content={`portable fan, cooling gadget, ${
            product.title
          }, mini fan, ${product.variants
            .map((v) => v.color)
            .join(', ')}, USB fan`}
        />
        <meta name='author' content='GenZ Shop' />
        <meta name='robots' content='index, follow' />
        <link
          rel='canonical'
          href={`https://www.genzshop.store/product/${product.slug}`}
        />

        {/* Open Graph */}
        <meta property='og:title' content={`${product.title} | GenZ Shop`} />
        <meta property='og:description' content={product.description} />
        <meta property='og:type' content='product' />
        <meta
          property='og:image'
          content={
            product.images[0] ||
            'https://www.genzshop.store/assets/footer-logo.png'
          }
        />
        <meta
          property='og:url'
          content={`https://www.genzshop.store/product/${product.slug}`}
        />
        <meta property='og:site_name' content='GenZ Shop' />

        {/* Twitter Card */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={`${product.title} | GenZ Shop`} />
        <meta name='twitter:description' content={product.description} />
        <meta
          name='twitter:image'
          content={
            product.images[0] ||
            'https://www.genzshop.store/assets/footer-logo.png'
          }
        />

        {/* Structured Data */}
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
                name: 'GenZ Shop',
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
              {/* Image Section */}
              <div className='w-full md:w-3/4 px-4'>
                <div className='p-2 md:p-0 md:grid md:grid-cols-4 gap-4'>
                  {/* Main Image */}
                  <div className='col-span-3 md:pl-6'>
                    <img
                      className='w-full h-[300px] md:h-[533px] object-cover rounded-lg image-transition'
                      src={activeImage}
                      alt={product.title}
                    />
                    {/* Small Images for Mobile */}
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
                  {/* Small Images for Desktop */}
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
              {/* Product Details */}
              <div className='md:w-1/2 px-7 md:px-0 py-4'>
                <h2 className='text-lg md:text-2xl font-semibold font-mont text-gray-800 md:mb-4'>
                  {product.title}
                </h2>
                <p className='text-gray-600 text-sm mb-4 font-mont'>
                  {product.description}
                </p>

                <div className='mb-6'>
                  <span className='font-semibold text-gray-700'>
                    Choose a Color
                  </span>
                  <div className='flex items-center gap-3 mt-4'>
                    {product.variants.map((variant) => (
                      <div
                        key={variant.color}
                        className={`border-2 flex items-center justify-center rounded-full p-1 cursor-pointer color-button ${
                          selectedColor === variant.color
                            ? 'color-button-active'
                            : ''
                        }`}
                        onClick={() => handleColorChange(variant.color)}
                      >
                        <button
                          className='w-[30px] h-[30px] rounded-full'
                          style={{
                            backgroundColor: variant.color.toLowerCase(),
                          }}
                        ></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className='flex items-center justify-start gap-2 text-md mb-6'>
                  <span className='text-blue-600 font-bold text-xl'>
                    ৳{product.price.toFixed(2)}
                  </span>
                  <span className='text-gray-500 font-normal text-lg line-through'>
                    ৳{product.originalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Quantity */}
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
                    className='flex items-center bg-blue-600 text-white justify-center gap-2 border border-blue-600 px-6 py-[12px] rounded-md font-mont font-semibold text-sm'
                    disabled={!product.inStock}
                  >
                    <span>{product.inStock ? 'Buy Now' : 'Out of Stock'}</span>
                  </button>
                </div>

                {/* Share */}
                {/* <div className='flex items-center justify-start gap-4'>
                  <div className='border border-gray-300 p-1 rounded-lg'>
                    <GoShareAndroid className='text-2xl' />
                  </div>
                  <span className='font-mont text-xs font-medium'>
                    {product.inStock
                      ? '(There are 125 products left)'
                      : '(Out of stock)'}
                  </span>
                </div> */}
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
            <div className='mt-5'>
              <img
                className='w-full h-[300px] md:h-[400px] object-cover rounded-lg mb-4'
                src='/assets/product/fan/ice.png'
                alt='portable cooling fan description image'
              />
              <p className='text-gray-600 font-mont text-sm'>
                Beat the heat with the **JF132 Mini Portable Cooling Fan**, your
                ultimate companion for instant refreshment! Featuring
                **lightning-fast cooling technology**, this fan blasts away heat
                in seconds, delivering a powerful, icy breeze that keeps you
                cool even on the hottest days. ❄
              </p>
              <p className='text-gray-600 font-mont text-sm mt-4'>
                Weighing just **183.6 grams**—lighter than your smartphone—this
                **ultra-light and portable** fan slips effortlessly into your
                bag or pocket, making it perfect for travel, work, or outdoor
                adventures. Crafted from **premium ABS and aluminum alloy**, the
                JF132 Mini combines durability with a sleek, modern vibe that
                feels as good as it looks. 💪
              </p>
              <img
                className='w-full h-[350px] md:h-[400px] object-cover rounded-lg my-4'
                src='/assets/product/fan/fan-description.avif'
                alt='portable cooling fan description image'
              />
              <p className='text-gray-600 font-mont text-sm mt-4'>
                Express your style with **six vibrant color options**: Black,
                White, Gray, Pink, Blue, Beige—pick the one that matches your
                mood! 🌈 Powered by a **long-lasting rechargeable battery**, it
                keeps you cool for hours, whether you’re hiking, commuting, or
                chilling at home. Stay cool, stay stylish, stay unstoppable with
                the JF132 Mini!
              </p>
              <p className='py-5 text-gray-600 font-mont text-sm mt-4'>
                Key Features:
              </p>
              <ul className='list-disc list-inside text-gray-600 font-mont text-sm'>
                <li>❄ Lightning-fast cooling technology for instant relief</li>
                <li>🎒 Ultra-light at 183.6 grams for easy portability</li>
                <li>💪 Premium ABS + aluminum alloy build for durability</li>
                <li>🌈 Five stylish colors: Black, White, Gray, Pink, Blue</li>
                <li>
                  🔋 Rechargeable battery for 7/8 hours of continuous cooling
                </li>
                <li>
                  ⚙️ Adjustable speed settings from 0-200 for customized comfort
                </li>
                <li>🔌 USB-C charging for quick and convenient power-ups</li>
                <li>🤫 Whisper-quiet operation for distraction-free use</li>
              </ul>
            </div>
            <div className='mt-10'>
              <h3 className='text-lg font-semibold font-mont text-gray-800 mb-4'>
                User Guide
              </h3>
              <div className='video-container max-w-full md:max-w-3xl mx-auto rounded-xl overflow-hidden video-player'>
                <video
                  className='w-full h-[500px]'
                  controls
                  poster='/assets/product/fan/userguide.jpg'
                >
                  <source
                    src='/assets/product/fan/userguide.mp4'
                    type='video/mp4'
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className='text-gray-600 font-mont text-sm mt-4'>
                Watch the user guide above to learn how to set up and use your{' '}
                <strong>JF132 Portable Cooling Fan</strong>. This video covers
                unboxing, charging, adjusting speed settings, and maintenance
                tips to ensure optimal performance.
              </p>
            </div>
          </div>
        </div>
      </CustomSection>
      {/* <Related /> */}
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
