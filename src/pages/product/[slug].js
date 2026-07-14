import React, { useState, useEffect } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { useDispatch } from 'react-redux';
import Navbar from '@/components/common/Navbar';
import { addToCart, clearCart } from '@/store/cartSlice';
import Footer from '@/components/common/Footer';
import Head from 'next/head';
import OrderDialog from '@/components/checkout/OrderDialog';

const StarIcon = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-amber-400' : 'text-gray-300'}`}
    fill='currentColor'
    viewBox='0 0 20 20'
  >
    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
  </svg>
);

function CountdownToMidnight() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = Math.max(0, Math.floor((midnight - now) / 1000));
      setTimeLeft({
        h: Math.floor(diff / 3600),
        m: Math.floor((diff % 3600) / 60),
        s: diff % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div
      className='rounded-xl px-4 py-3 my-3'
      style={{
        background: 'linear-gradient(135deg,#fff7ed,#ffedd5)',
        border: '1.5px solid #fed7aa',
      }}
    >
      <p className='text-sm font-semibold text-center text-orange-700 mb-2'>
        Offer ends in
      </p>
      <div className='flex items-center justify-center gap-2'>
        {[
          { val: pad(timeLeft.h), label: 'Hours' },
          { val: pad(timeLeft.m), label: 'Minutes' },
          { val: pad(timeLeft.s), label: 'Seconds' },
        ].map((unit, i) => (
          <React.Fragment key={unit.label}>
            {i > 0 && (
              <span className='text-orange-500 font-black text-2xl leading-none mb-4'>
                :
              </span>
            )}
            <div className='flex flex-col items-center'>
              <span
                className='countdown-digit font-mono font-extrabold text-lg px-3 py-1.5 rounded-lg min-w-[44px] text-center shadow-md text-white'
                style={{
                  background: 'linear-gradient(135deg,#ea580c,#c2410c)',
                }}
              >
                {unit.val}
              </span>
              <span className='text-[10px] text-orange-600 mt-1 font-medium'>
                {unit.label}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function DynamicProductPage({ product, notFound }) {
  const dispatch = useDispatch();
  const [selectedVariant, setSelectedVariant] = useState('');
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  useEffect(() => {
    if (!product) return;
    const firstVariant = product.variants?.[0];
    setSelectedVariant(
      firstVariant
        ? firstVariant.value || firstVariant.color || firstVariant.type || ''
        : '',
    );
    setActiveImage(product.images?.[0] || product.thumbnail || '');

    if (typeof window !== 'undefined') {
      sendGTMEvent({ ecommerce: null });
      sendGTMEvent({
        event: 'view_item',
        ecommerce: {
          currency: 'BDT',
          value: product.price || 0,
          items: [
            {
              item_id: product.id || product._id || 'unknown',
              item_name: product.title || 'unknown',
              price: product.price || 0,
              original_price: product.originalPrice || 0,
              item_category: product.category || 'General',
              item_variant:
                firstVariant?.value ||
                firstVariant?.color ||
                firstVariant?.type ||
                'Standard',
            },
          ],
        },
      });
    }
  }, [product]);

  if (notFound || !product) {
    return (
      <>
        <Navbar />
        <div className='min-h-[60vh] flex flex-col items-center justify-center text-slate-500'>
          <p className='text-2xl font-bold mb-2'>Product Not Found</p>
          <p className='text-sm'>
            The product you are looking for does not exist.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  function handleBuyNow() {
    if (!product || isAdding) return;
    setIsAdding(true);

    if (typeof window !== 'undefined') {
      sendGTMEvent({ ecommerce: null });
      sendGTMEvent({
        event: 'add_to_cart',
        ecommerce: {
          currency: 'BDT',
          value: product.price * quantity || 0,
          items: [
            {
              item_id: product.id || product._id || 'unknown',
              item_name: product.title || 'unknown',
              price: product.price || 0,
              original_price: product.originalPrice || 0,
              item_category: product.category || 'General',
              item_variant: selectedVariant || 'Standard',
              quantity: quantity || 1,
            },
          ],
        },
      });
    }

    dispatch(clearCart());
    dispatch(
      addToCart({
        id: product.id || product._id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        selectedColor: selectedVariant,
        quantity: quantity,
        image: activeImage,
      }),
    );

    setIsOrderDialogOpen(true);
    setIsAdding(false);
    setQuantity(1);
  }

  const colorVariants = product.variants?.filter(
    (v) => v.name === 'Color' || v.color,
  );
  const hasColorSwatch = colorVariants && colorVariants.length > 0;

  return (
    <>
      <Head>
        <title>{product.title} | Buy Online in Bangladesh | GenZ Shop</title>
        <meta
          name='description'
          content={
            product.shortDescription || product.description || product.title
          }
        />
        <meta name='robots' content='index, follow' />
        <link
          rel='canonical'
          href={`https://www.genzshop.store/product/${product.slug}`}
        />
        <meta property='og:type' content='product' />
        <meta property='og:title' content={`${product.title} | GenZ Shop`} />
        <meta
          property='og:description'
          content={product.shortDescription || product.description || ''}
        />
        <meta
          property='og:image'
          content={
            product.images?.[0] ||
            product.thumbnail ||
            'https://www.genzshop.store/assets/footer-logo.png'
          }
        />
        <meta
          property='og:url'
          content={`https://www.genzshop.store/product/${product.slug}`}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Product',
              name: product.title,
              image: product.images,
              description:
                product.shortDescription || product.description || '',
              sku: product.id || product._id,
              brand: { '@type': 'Brand', name: 'GenZ Shop' },
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

      <style jsx global>{`
        .img-zoom {
          transition: transform 0.5s ease;
        }
        .img-zoom:hover {
          transform: scale(1.03);
        }
        .thumb-sel {
          border: 2.5px solid #a4dd00;
          box-shadow: 0 0 0 3px rgba(164, 221, 0, 0.22);
        }
        .thumb-unsel {
          border: 2px solid transparent;
          opacity: 0.65;
        }
        .thumb-unsel:hover {
          opacity: 1;
          border-color: #a4dd00;
        }
        .btn-buy {
          background: linear-gradient(
            135deg,
            #1a1a2e 0%,
            #0f0c1a 50%,
            #1a1a2e 100%
          );
          transition: all 0.3s ease;
          box-shadow:
            0 4px 20px rgba(0, 0, 0, 0.55),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .btn-buy:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65);
        }
        @keyframes offer-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.88;
          }
        }
        .offer-banner {
          animation: offer-pulse 2.2s ease-in-out infinite;
        }
        @keyframes digit-pop {
          0% {
            transform: scale(1.18);
          }
          100% {
            transform: scale(1);
          }
        }
        .countdown-digit {
          animation: digit-pop 0.15s ease-out;
        }
        @keyframes banner-shimmer {
          0% {
            transform: translateX(-150%) skewX(-20deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(300%) skewX(-20deg);
            opacity: 0;
          }
        }
        .banner-shimmer-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 35%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(164, 221, 0, 0.15) 50%,
            transparent 100%
          );
          animation: banner-shimmer 3.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes icon-sparkle {
          0%,
          100% {
            text-shadow: 0 0 6px rgba(164, 221, 0, 0.4);
            transform: scale(1) rotate(0deg);
          }
          30% {
            text-shadow:
              0 0 18px rgba(164, 221, 0, 1),
              0 0 36px rgba(139, 195, 74, 0.7);
            transform: scale(1.35) rotate(20deg);
          }
          60% {
            text-shadow: 0 0 6px rgba(164, 221, 0, 0.4);
            transform: scale(1) rotate(0deg);
          }
          80% {
            text-shadow:
              0 0 18px rgba(164, 221, 0, 1),
              0 0 36px rgba(139, 195, 74, 0.7);
            transform: scale(1.35) rotate(-20deg);
          }
        }
        .shine-icon {
          display: inline-block;
          animation: icon-sparkle 2.4s ease-in-out infinite;
          color: #a4dd00;
        }
        /* dp-html-content: full Quill/Tiptap output rendering */
        .dp-html-content {
          line-height: 1.75;
          color: #1e293b;
        }
        .dp-html-content p {
          margin-bottom: 0.85rem;
        }
        .dp-html-content h1 {
          font-size: 1.875rem;
          font-weight: 700;
          margin: 1.25rem 0 0.5rem;
          line-height: 1.2;
        }
        .dp-html-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 1.1rem 0 0.5rem;
          line-height: 1.25;
        }
        .dp-html-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 1rem 0 0.4rem;
          line-height: 1.3;
        }
        .dp-html-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0.9rem 0 0.4rem;
        }
        .dp-html-content h5 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0.8rem 0 0.3rem;
        }
        .dp-html-content h6 {
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0.75rem 0 0.3rem;
        }
        .dp-html-content strong {
          font-weight: 700;
        }
        .dp-html-content em {
          font-style: italic;
        }
        .dp-html-content u {
          text-decoration: underline;
        }
        .dp-html-content s {
          text-decoration: line-through;
        }
        .dp-html-content ul {
          list-style-type: disc;
          padding-left: 1.75rem;
          margin: 0.5rem 0 0.75rem;
        }
        .dp-html-content ol {
          list-style-type: decimal;
          padding-left: 1.75rem;
          margin: 0.5rem 0 0.75rem;
        }
        .dp-html-content ul ul {
          list-style-type: circle;
          margin: 0.25rem 0;
        }
        .dp-html-content ul ul ul {
          list-style-type: square;
        }
        .dp-html-content li {
          margin-bottom: 0.3rem;
          display: list-item;
        }
        .dp-html-content .ql-indent-1 {
          padding-left: 3em;
        }
        .dp-html-content .ql-indent-2 {
          padding-left: 6em;
        }
        .dp-html-content .ql-indent-3 {
          padding-left: 9em;
        }
        .dp-html-content .ql-indent-4 {
          padding-left: 12em;
        }
        .dp-html-content .ql-indent-5 {
          padding-left: 15em;
        }
        .dp-html-content .ql-align-center {
          text-align: center;
        }
        .dp-html-content .ql-align-right {
          text-align: right;
        }
        .dp-html-content .ql-align-justify {
          text-align: justify;
        }
        .dp-html-content img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
        }
        .dp-html-content a {
          color: #2563eb;
          text-decoration: underline;
        }
        .dp-html-content a:hover {
          color: #1d4ed8;
        }
        .dp-html-content blockquote {
          border-left: 4px solid #a4dd00;
          padding: 0.6em 1em;
          margin: 1em 0;
          color: #4b5563;
          font-style: italic;
          background: #f0fdf4;
          border-radius: 0 4px 4px 0;
        }
        .dp-html-content code {
          background: #f1f5f9;
          padding: 0.15em 0.45em;
          border-radius: 4px;
          font-size: 0.875em;
          font-family: ui-monospace, monospace;
          color: #be123c;
        }
        .dp-html-content pre,
        .dp-html-content pre.ql-syntax {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          overflow-x: auto;
          font-family: ui-monospace, monospace;
          font-size: 0.875rem;
          line-height: 1.6;
          margin: 1rem 0;
        }
        .dp-html-content table,
        .dp-html-content .quill-better-table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.25rem 0;
          font-size: 0.9rem;
          overflow: hidden;
          border-radius: 6px;
          box-shadow: 0 0 0 1px #e2e8f0;
        }
        .dp-html-content th,
        .dp-html-content td,
        .dp-html-content .quill-better-table td {
          border: 1px solid #e2e8f0;
          padding: 9px 13px;
          text-align: left;
          vertical-align: top;
        }
        .dp-html-content th,
        .dp-html-content thead td {
          background: #f8fafc;
          font-weight: 600;
          color: #374151;
        }
        .dp-html-content tr:nth-child(even) td {
          background: #fafafa;
        }
        .dp-html-content hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 1.5rem 0;
        }
        .dp-html-content iframe {
          max-width: 100%;
          border-radius: 6px;
        }
      `}</style>

      <Navbar />

      {/* Sticky Offer Banner */}
      {discount > 0 && (
        <div
          className='offer-banner sticky top-0 z-40 py-2.5 px-4 text-center relative overflow-hidden'
          style={{
            background:
              'linear-gradient(90deg,#0d0d0d 0%,#1a1208 30%,#2d1f0a 50%,#1a1208 70%,#0d0d0d 100%)',
            borderBottom: '1.5px solid rgba(164,221,0,0.3)',
          }}
        >
          <div className='banner-shimmer-line' />
          <p
            className='font-bold text-sm md:text-base tracking-wide relative z-10'
            style={{
              color: '#A4DD00',
              textShadow: '0 0 16px rgba(164,221,0,0.5)',
            }}
          >
            <span className='shine-icon'>*</span> {discount}% ডিস্কাউন্ট শুধু
            আজকের জন্য <span className='shine-icon'>*</span>
          </p>
        </div>
      )}

      {/* Hero */}
      <div className='bg-gradient-to-b from-slate-50 to-white'>
        <div className='container mx-auto px-0 lg:px-8 py-0 md:py-6'>
          <div className='bg-white rounded shadow-xl overflow-hidden'>
            <div className='flex flex-col lg:flex-row'>
              {/* Images */}
              <div className='w-full lg:w-[58%] p-5 md:p-8'>
                <div className='flex flex-col md:grid md:grid-cols-4 gap-4'>
                  <div className='md:col-span-3 overflow-hidden rounded-2xl bg-gray-50'>
                    <img
                      className='w-full h-[360px] md:h-[520px] object-cover img-zoom'
                      src={activeImage}
                      alt={product.title}
                    />
                  </div>
                  <div className='hidden md:flex flex-col gap-3'>
                    {product.images?.slice(0, 3).map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveImage(img)}
                        className={`overflow-hidden rounded-xl cursor-pointer transition-all duration-200 ${activeImage === img ? 'thumb-sel' : 'thumb-unsel'}`}
                      >
                        <img
                          src={img}
                          alt={`thumb ${i + 1}`}
                          className='w-full h-[155px] object-cover'
                        />
                      </div>
                    ))}
                  </div>
                  <div className='flex md:hidden justify-center gap-2 mt-2'>
                    {product.images?.slice(0, 4).map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveImage(img)}
                        className={`overflow-hidden rounded-lg cursor-pointer transition-all duration-200 ${activeImage === img ? 'thumb-sel' : 'thumb-unsel'}`}
                      >
                        <img
                          src={img}
                          alt={`thumb ${i + 1}`}
                          className='w-[72px] h-[72px] object-cover'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className='w-full lg:w-[42%] px-6 md:px-10 py-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-100'>
                <div className='inline-flex items-center gap-2 mb-4'>
                  <span
                    style={{
                      background: 'linear-gradient(135deg,#1a1208,#2d1f0a)',
                      color: '#A4DD00',
                      border: '1px solid rgba(164,221,0,0.3)',
                    }}
                    className='text-xs font-bold px-3 py-1 rounded-full'
                  >
                    Bestseller
                  </span>
                  {product.inStock ? (
                    <span
                      style={{ background: '#052e16', color: '#86efac' }}
                      className='text-xs font-semibold px-3 py-1 rounded-full'
                    >
                      In Stock
                    </span>
                  ) : (
                    <span className='bg-red-900 text-red-200 text-xs font-semibold px-3 py-1 rounded-full'>
                      Out of Stock
                    </span>
                  )}
                </div>

                <h1 className='text-lg md:text-3xl font-semibold md:font-bold text-gray-900 leading-snug mb-3'>
                  {product.title}
                </h1>

                <div className='flex items-center gap-2 mb-3'>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} filled />
                  ))}
                  <span className='text-sm text-gray-500'>
                    (4.8 / 96 reviews)
                  </span>
                </div>

                {product.shortDescription && (
                  <p className='text-gray-600 text-sm leading-relaxed mb-4'>
                    {product.shortDescription}
                  </p>
                )}

                {product.discountTimer && <CountdownToMidnight />}

                <div className='flex items-end gap-3 mt-4 mb-5'>
                  <span
                    className='text-4xl font-extrabold'
                    style={{ color: '#f97316' }}
                  >
                    BDT{Number(product.price).toFixed(0)}
                  </span>
                  <span className='text-xl text-gray-400 line-through mb-1'>
                    BDT{Number(product.originalPrice).toFixed(0)}
                  </span>
                  {discount > 0 && (
                    <span
                      style={{
                        background: '#fde047',
                        color: '#991b1b',
                        border: '1px solid #f59e0b',
                      }}
                      className='text-sm font-bold px-2 py-0.5 rounded-lg mb-1'
                    >
                      {Number(product.originalPrice) - Number(product.price)}{' '}
                      Taka Save
                    </span>
                  )}
                </div>

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className='mb-5'>
                    <p className='text-sm font-semibold text-gray-700 mb-3'>
                      {product.variants[0].name || 'Variant'}:{' '}
                      <span className='font-bold' style={{ color: '#A4DD00' }}>
                        {selectedVariant}
                      </span>
                    </p>
                    <div className='flex items-center gap-2 flex-wrap'>
                      {product.variants.map((v, i) => {
                        const val = v.value || v.color || v.type || '';
                        const isSelected = selectedVariant === val;
                        const isColor = v.name === 'Color' || v.color;
                        if (isColor) {
                          const lc = val.toLowerCase();
                          const bg =
                            lc === 'golden'
                              ? '#d4a017'
                              : lc === 'silver'
                                ? '#c0c0c0'
                                : lc;
                          return (
                            <button
                              key={i}
                              title={val}
                              onClick={() => setSelectedVariant(val)}
                              style={{
                                backgroundColor: bg,
                                width: 36,
                                height: 36,
                                borderRadius: '50%',
                                border:
                                  lc === 'silver' || lc === 'white'
                                    ? '2px solid #9ca3af'
                                    : '2px solid transparent',
                                outline: isSelected
                                  ? '3px solid #A4DD00'
                                  : 'none',
                                outlineOffset: 3,
                                transform: isSelected
                                  ? 'scale(1.15)'
                                  : 'scale(1)',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                              }}
                            />
                          );
                        }
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedVariant(val)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all`}
                            style={
                              isSelected
                                ? {
                                    background: '#1a1208',
                                    color: '#A4DD00',
                                    borderColor: '#A4DD00',
                                  }
                                : {
                                    background: 'white',
                                    color: '#374151',
                                    borderColor: '#d1d5db',
                                  }
                            }
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Qty + Buy */}
                <div className='flex items-center gap-3 mb-3'>
                  <div className='flex items-center border-2 border-gray-200 rounded-xl overflow-hidden'>
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className='px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg'
                    >
                      -
                    </button>
                    <span className='px-5 py-3 font-semibold text-gray-800 min-w-[48px] text-center'>
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        quantity < 999 && setQuantity(quantity + 1)
                      }
                      className='px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg'
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock || isAdding}
                    className='btn-buy flex-1 text-white font-bold py-3.5 rounded-xl text-sm tracking-wide disabled:opacity-70'
                  >
                    {isAdding
                      ? 'Processing...'
                      : product.inStock
                        ? 'Buy Now'
                        : 'Out of Stock'}
                  </button>
                </div>

                <div className='grid grid-cols-2 gap-3 pt-5 border-t border-gray-100'>
                  {[
                    { icon: '🚀', text: 'Fast Delivery' },
                    { icon: '🔒', text: 'Cash on Delivery' },
                    { icon: '💯', text: 'Original Product' },
                    { icon: '🎁', text: 'Special Offer' },
                  ].map((p) => (
                    <div key={p.text} className='flex items-center gap-2'>
                      <span className='text-lg'>{p.icon}</span>
                      <span className='text-xs text-gray-500 font-medium'>
                        {p.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery - mobile only */}
      {product.gallery && product.gallery.length > 0 && (
        <div className='md:hidden w-full'>
          {product.gallery.map((img, i) => (
            <div key={i} className='w-full'>
              <img
                src={img}
                alt={`gallery-${i}`}
                className='w-full block object-cover'
              />
            </div>
          ))}
        </div>
      )}

      {/* HTML Description */}
      {product.descriptionHTML && (
        <div className='bg-gradient-to-b from-white to-slate-50 py-12'>
          <div className='container mx-auto px-0 lg:px-8 max-w-4xl'>
            <div className='text-center mb-4'>
              <span
                style={{
                  background: 'linear-gradient(135deg,#1a1208,#2d1f0a)',
                  color: '#A4DD00',
                  border: '1px solid rgba(164,221,0,0.3)',
                }}
                className='text-xs font-bold px-4 py-1.5 rounded-full inline-block'
              >
                Product Description
              </span>
            </div>
            <div
              className='bg-white rounded shadow-md p-4 md:p-12 dp-html-content'
              dangerouslySetInnerHTML={{ __html: product.descriptionHTML }}
            />
          </div>
        </div>
      )}

      {/* Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <div className='bg-white py-12'>
          <div className='container mx-auto px-4 lg:px-8 max-w-4xl'>
            <div className='rounded shadow-md overflow-hidden'>
              <div
                className='px-8 py-5'
                style={{
                  background: 'linear-gradient(to right,#1a1208,#2d1f0a)',
                  borderBottom: '2px solid rgba(164,221,0,0.4)',
                }}
              >
                <h3 className='font-bold text-lg' style={{ color: '#A4DD00' }}>
                  Specifications
                </h3>
              </div>
              <div className='divide-y divide-gray-100'>
                {product.specifications.map((spec, i) => (
                  <div
                    key={i}
                    className={`flex px-8 py-4 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <span className='w-48 text-sm font-semibold text-gray-500'>
                      {spec.label}
                    </span>
                    <span className='text-sm text-gray-800 font-medium'>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQs */}
      {product.faqs && product.faqs.length > 0 && (
        <div className='bg-slate-50 py-12'>
          <div className='container mx-auto px-4 lg:px-8 max-w-4xl'>
            <h2 className='text-2xl font-extrabold text-gray-900 mb-6 text-center'>
              Frequently Asked Questions
            </h2>
            <div className='space-y-4'>
              {product.faqs.map((faq, i) => (
                <details
                  key={i}
                  className='bg-white rounded-xl shadow-sm border border-gray-100 p-5 group'
                >
                  <summary className='font-semibold text-gray-800 cursor-pointer list-none flex justify-between items-center'>
                    {faq.question}
                    <span
                      className='text-lg group-open:rotate-45 transition-transform'
                      style={{ color: '#A4DD00' }}
                    >
                      +
                    </span>
                  </summary>
                  <p className='mt-3 text-gray-600 text-sm leading-relaxed'>
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className='bg-white py-12'>
          <div className='container mx-auto px-4 lg:px-8 max-w-4xl'>
            <h2 className='text-2xl font-extrabold text-gray-900 mb-6 text-center'>
              Customer Reviews
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {product.reviews.map((review, i) => (
                <div
                  key={i}
                  className='bg-slate-50 rounded-2xl p-5 border border-slate-100'
                >
                  <div className='flex items-center gap-2 mb-2'>
                    <div
                      className='w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm'
                      style={{ background: '#1a1208', color: '#A4DD00' }}
                    >
                      {review.reviewerName?.[0] || 'R'}
                    </div>
                    <span className='font-semibold text-gray-800 text-sm'>
                      {review.reviewerName}
                    </span>
                    <div className='flex ml-auto'>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <StarIcon key={s} filled={s <= (review.rating || 5)} />
                      ))}
                    </div>
                  </div>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Extra Gallery Grid - desktop only */}
      {product.gallery && product.gallery.length > 0 && (
        <div className='hidden md:block w-full'>
          <div
            className={`grid ${product.gallery.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} ${product.gallery.length >= 3 ? 'md:grid-cols-3' : product.gallery.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}
          >
            {product.gallery.map((img, i) => (
              <div key={i} className='overflow-hidden'>
                <img
                  src={img}
                  alt={`gallery-${i}`}
                  className='w-full object-cover block img-zoom'
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className='py-14 bg-gradient-to-b from-white to-slate-50'>
        <div className='container mx-auto px-4 text-center'>
          <div
            className='rounded-2xl p-10 max-w-2xl mx-auto shadow-2xl'
            style={{
              background:
                'linear-gradient(135deg,#0a0a14 0%,#1a1333 40%,#251848 70%,#0a0a14 100%)',
              border: '1px solid rgba(180,140,255,0.18)',
            }}
          >
            <h3
              className='text-2xl font-extrabold mb-2'
              style={{
                color: '#e8d5ff',
                textShadow: '0 0 20px rgba(160,100,255,0.4)',
              }}
            >
              Order Now!
            </h3>
            <p className='text-sm mb-6' style={{ color: '#a08cc0' }}>
              Limited stock - secure your order now
            </p>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock || isAdding}
              className='font-extrabold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-70'
              style={{
                background:
                  'linear-gradient(135deg,#A4DD00 0%,#8BC34A 50%,#A4DD00 100%)',
                color: '#1a1208',
                boxShadow: '0 4px 20px rgba(164,221,0,0.35)',
                border: 'none',
              }}
            >
              {product.inStock
                ? `BDT${product.price} - Buy Now`
                : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>

      <Footer />

      <OrderDialog
        isOpen={isOrderDialogOpen}
        onClose={() => setIsOrderDialogOpen(false)}
      />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    const { connectDB } = await import('@/lib/mongodb');
    const ProductModel = (await import('@/models/Product')).default;
    const { products: staticProducts } = await import('@/utils/products');

    const isStatic = staticProducts.some((p) => p.slug === slug);
    if (isStatic) {
      return { notFound: true };
    }

    await connectDB();
    const product = await ProductModel.findOne({ slug }).lean();

    if (!product) return { props: { notFound: true } };

    return {
      props: {
        product: JSON.parse(
          JSON.stringify({ ...product, id: product._id.toString() }),
        ),
      },
    };
  } catch (err) {
    console.error(err);
    return { props: { notFound: true } };
  }
}
