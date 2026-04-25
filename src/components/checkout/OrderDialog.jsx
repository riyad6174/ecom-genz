import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { HiOutlineTrash } from 'react-icons/hi';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { clearCart, removeFromCart, updateQuantity } from '@/store/cartSlice';

const OrderDialog = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const dialogRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [currentView, setCurrentView] = useState('cart');
  const [confirmationAnimating, setConfirmationAnimating] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    deliveryZone: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(60);
  const [grandTotal, setGrandTotal] = useState(0);

  // Pre-warm the DB connection
  useEffect(() => {
    if (isOpen) {
      fetch('/api/submit', { method: 'HEAD' }).catch(() => {});
    }
  }, [isOpen]);

  // Handle open/close animations + GTM begin_checkout
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimating(true));
      });
      if (cartItems.length > 0) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
          event: 'begin_checkout',
          ecommerce: {
            currency: 'BDT',
            value: cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0),
            items: cartItems.map((item) => ({
              item_id: item.id || 'unknown',
              item_name: item.title || 'unknown',
              price: item.price || 0,
              quantity: item.quantity || 1,
              item_variant: item.selectedColor || item.selectedVariantValue,
              item_category: item.category || 'Accessories',
            })),
          },
        });
      }
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      setConfirmationAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setCurrentView('cart');
      }, 400);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    setTotalPrice(total);
    setGrandTotal(total + shippingCharge);
  }, [cartItems, shippingCharge]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        handleClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value || '' });
    validateField('phoneNumber', value || '');
  };

  const handleDeliveryZoneChange = (value) => {
    setFormData({ ...formData, deliveryZone: value });
    validateField('deliveryZone', value);
    const charge = value === 'Inside Dhaka' ? 60 : 120;
    setShippingCharge(charge);
    setGrandTotal(totalPrice + charge);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    switch (name) {
      case 'fullName':
        if (!value.trim()) newErrors.fullName = 'Full name is required';
        else if (value.length < 2) newErrors.fullName = 'Full name must be at least 2 characters';
        else delete newErrors.fullName;
        break;
      case 'phoneNumber':
        if (!value) newErrors.phoneNumber = 'Phone number is required';
        else if (!/^\+880\d{10}$/.test(value)) newErrors.phoneNumber = 'Please enter a valid Bangladesh phone number';
        else delete newErrors.phoneNumber;
        break;
      case 'deliveryZone':
        if (!value) newErrors.deliveryZone = 'Please select a delivery zone';
        else delete newErrors.deliveryZone;
        break;
      case 'address':
        if (!value.trim()) newErrors.address = 'Address is required';
        else if (value.length < 5) newErrors.address = 'Address must be at least 5 characters';
        else delete newErrors.address;
        break;
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (formData.fullName.length < 2) newErrors.fullName = 'Full name must be at least 2 characters';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\+880\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Please enter a valid Bangladesh phone number';
    if (!formData.deliveryZone) newErrors.deliveryZone = 'Please select a delivery zone';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    else if (formData.address.length < 5) newErrors.address = 'Address must be at least 5 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmissionError(null);

    const uniqueId = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const order = {
      user: { ...formData },
      order: {
        items: [...cartItems],
        totalPrice,
        shippingCharge,
        grandTotal,
        orderDate: new Date().toISOString(),
        orderId: uniqueId,
      },
    };

    const bdtTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Dhaka',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const orderPayload = {
      name: formData.fullName || '',
      phone: formData.phoneNumber || '',
      deliveryZone: formData.deliveryZone || '',
      address: formData.address || '',
      items: JSON.stringify(
        cartItems.map((item) => ({
          title: item.title || 'Unknown',
          price: item.price || 0,
          quantity: item.quantity || 1,
          variant:
            (item.selectedColor ? `Color: ${item.selectedColor}` : '') ||
            (item.selectedVariantValue ? `Type: ${item.selectedVariantValue}` : '') ||
            'Standard',
        }))
      ),
      totalPrice: totalPrice || 0,
      shippingCharge: shippingCharge || 0,
      grandTotal: grandTotal || 0,
      orderId: uniqueId,
      orderDate: new Date().toISOString(),
      submissionTime: bdtTime,
    };

    const onSuccess = () => {
      setOrderDetails(order);
      setCurrentView('confirmation');
      setTimeout(() => setConfirmationAnimating(true), 50);
      // GTM purchase event — preserving the same dataLayer structure as the original app
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        event: 'purchase',
        user_data: {
          name: formData.fullName,
          phone: formData.phoneNumber,
          address: formData.address,
          district: formData.deliveryZone,
        },
        ecommerce: {
          transaction_id: order.order.orderId || 'ORD-UNKNOWN',
          value: order.order.grandTotal || 0,
          currency: 'BDT',
          shipping: order.order.shippingCharge || 0,
          items: order.order.items.map((item) => ({
            item_id: item.id || 'unknown',
            item_name: item.title || 'unknown',
            price: item.price || 0,
            quantity: item.quantity || 1,
            item_variant: item.selectedColor || item.selectedVariantValue,
            item_category: item.category || 'Accessories',
          })),
        },
      });
      setIsLoading(false);
    };

    // 2 attempts max — handles cold-start DB connections silently
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        });

        if (response.ok) { onSuccess(); return; }

        // 409 = duplicate ID but order was already saved — treat as success
        if (response.status === 409) { onSuccess(); return; }

        if (response.status >= 400 && response.status < 500) {
          const errorData = await response.json().catch(() => ({}));
          setSubmissionError(errorData.message || 'Failed to submit order.');
          setIsLoading(false);
          return;
        }

        if (attempt < 2) await new Promise((r) => setTimeout(r, 2000));
      } catch {
        if (attempt < 2) await new Promise((r) => setTimeout(r, 2000));
      }
    }

    setSubmissionError('Failed to submit order. Please try again.');
    setIsLoading(false);
  };

  const handleClose = () => {
    if (currentView === 'confirmation') {
      dispatch(clearCart());
      setFormData({ fullName: '', phoneNumber: '', deliveryZone: '', address: '' });
      setOrderDetails(null);
    }
    onClose();
  };

  const handleContinueShopping = () => {
    dispatch(clearCart());
    setFormData({ fullName: '', phoneNumber: '', deliveryZone: '', address: '' });
    setOrderDetails(null);
    onClose();
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({ id: item.id, selectedColor: item.selectedColor }));
  };

  const handleItemQuantityChange = (item, type) => {
    const newQuantity = type === 'increment' ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: item.id, selectedColor: item.selectedColor, quantity: newQuantity }));
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-400 ease-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDuration: '400ms' }}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-400 ${isAnimating ? 'opacity-60' : 'opacity-0'}`}
        style={{ transitionDuration: '400ms' }}
      />

      {/* Dialog Container */}
      <div className='absolute inset-0 flex md:justify-end'>
        <div
          ref={dialogRef}
          className={`
            bg-white w-full md:w-[800px] lg:w-[900px]
            absolute md:relative
            bottom-0 md:bottom-auto md:top-0 md:right-0
            max-h-[94vh] md:max-h-full md:h-full
            rounded-t-xl md:rounded-none
            shadow-2xl
            flex flex-col
            transform transition-all ease-[cubic-bezier(0.32,0.72,0,1)]
            ${isAnimating ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-full'}
          `}
          style={{ transitionDuration: '400ms' }}
        >
          {/* Header */}
          <div className='flex-shrink-0 flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-white rounded-t-xl md:rounded-none'>
            <h2 className='text-lg md:text-xl font-semibold text-gray-900'>
              {currentView === 'cart' ? 'Complete Your Order' : 'Order Confirmed!'}
            </h2>
            <button
              onClick={handleClose}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
              aria-label='Close'
            >
              <IoClose className='w-6 h-6 text-gray-500' />
            </button>
          </div>

          {/* Content */}
          <div className='flex-1 overflow-y-auto min-h-0'>
            {currentView === 'cart' ? (
              <div className='flex flex-col md:flex-row md:h-full'>
                {/* Cart Items */}
                <div className='md:w-1/2 p-4 md:p-6 md:border-r border-gray-200 bg-gray-50 md:overflow-y-auto'>
                  <h3 className='text-md font-semibold text-gray-800 mb-4'>
                    Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                  </h3>

                  {cartItems.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-8'>
                      <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4'>
                        <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                        </svg>
                      </div>
                      <p className='text-gray-500 text-sm'>Your cart is empty</p>
                    </div>
                  ) : (
                    <div className='space-y-3'>
                      {cartItems.map((item, index) => (
                        <div
                          key={`${item.id}-${item.selectedColor || item.selectedVariantValue}-${index}`}
                          className='flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm'
                        >
                          <div className='w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden'>
                            {item.image ? (
                              <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                            ) : (
                              <div className='w-full h-full bg-gray-200' />
                            )}
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='font-medium text-gray-900 text-sm truncate'>{item.title}</p>
                            <p className='text-xs text-gray-500'>{item.selectedColor || item.selectedVariantValue || 'Standard'}</p>
                            <div className='flex items-center justify-between mt-2'>
                              <div className='flex items-center border border-gray-300 rounded-lg'>
                                <button
                                  onClick={() => handleItemQuantityChange(item, 'decrement')}
                                  disabled={item.quantity <= 1}
                                  className='px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:opacity-40 disabled:cursor-not-allowed'
                                >
                                  <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 12H4' />
                                  </svg>
                                </button>
                                <span className='px-3 py-1 text-sm font-medium text-gray-900 min-w-[32px] text-center'>{item.quantity}</span>
                                <button
                                  onClick={() => handleItemQuantityChange(item, 'increment')}
                                  className='px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg'
                                >
                                  <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
                                  </svg>
                                </button>
                              </div>
                              <p className='font-semibold text-gray-900 text-sm'>৳{((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item)}
                            className='p-2 hover:bg-red-50 rounded-full transition-colors flex-shrink-0'
                          >
                            <HiOutlineTrash className='w-5 h-5 text-red-500' />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pricing Summary — Mobile */}
                  <div className='mt-4 p-4 bg-blue-50 rounded-xl md:hidden'>
                    <div className='flex justify-between text-sm text-gray-700 mb-2'>
                      <span>Subtotal</span><span>৳{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between text-sm text-gray-700 mb-2'>
                      <span>Shipping</span><span>৳{shippingCharge.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between font-semibold text-gray-900 pt-2 border-t border-blue-200'>
                      <span>Total</span><span>৳{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Order Form */}
                <div className='md:w-1/2 p-4 pb-8 md:p-6 md:overflow-y-auto'>
                  <h3 className='text-md font-semibold text-gray-800 mb-4'>Delivery Information</h3>

                  <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* Full Name */}
                    <div>
                      <label htmlFor='fullName' className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                      <input
                        type='text'
                        id='fullName'
                        name='fullName'
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder='Enter Full Name'
                        className='py-2.5 px-3 border w-full rounded-lg text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                      />
                      {errors.fullName && <p className='text-red-500 text-xs mt-1'>{errors.fullName}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
                      <PhoneInput
                        id='phoneNumber'
                        defaultCountry='BD'
                        value={formData.phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder='Enter Phone Number'
                        className='py-2.5 px-3 border w-full rounded-lg text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      />
                      {errors.phoneNumber && <p className='text-red-500 text-xs mt-1'>{errors.phoneNumber}</p>}
                    </div>

                    {/* Delivery Zone */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Delivery Zone সিলেক্ট করুন</label>
                      <div className='flex gap-3'>
                        <button
                          type='button'
                          onClick={() => handleDeliveryZoneChange('Inside Dhaka')}
                          className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium border-2 transition-all ${
                            formData.deliveryZone === 'Inside Dhaka'
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          ঢাকার ভেতরে
                          <span className='block text-xs mt-0.5 opacity-70'>৳60</span>
                        </button>
                        <button
                          type='button'
                          onClick={() => handleDeliveryZoneChange('Outside Dhaka')}
                          className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium border-2 transition-all ${
                            formData.deliveryZone === 'Outside Dhaka'
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          ঢাকার বাহিরে
                          <span className='block text-xs mt-0.5 opacity-70'>৳120</span>
                        </button>
                      </div>
                      {errors.deliveryZone && <p className='text-red-500 text-xs mt-1'>{errors.deliveryZone}</p>}
                    </div>

                    {/* Address */}
                    <div>
                      <label htmlFor='address' className='block text-sm font-medium text-gray-700 mb-1'>Details Address</label>
                      <input
                        type='text'
                        id='address'
                        name='address'
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder='এলাকার নাম, থানা, জেলার নাম লিখুন'
                        className='py-2.5 px-3 border w-full rounded-lg text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      />
                      {errors.address && <p className='text-red-500 text-xs mt-1'>{errors.address}</p>}
                    </div>

                    {/* Pricing Summary — Desktop */}
                    <div className='hidden md:block p-4 bg-blue-50 rounded-xl'>
                      <div className='flex justify-between text-sm text-gray-700 mb-2'>
                        <span>Subtotal</span><span>৳{totalPrice.toFixed(2)}</span>
                      </div>
                      <div className='flex justify-between text-sm text-gray-700 mb-2'>
                        <span>Shipping</span><span>৳{shippingCharge.toFixed(2)}</span>
                      </div>
                      <div className='flex justify-between font-semibold text-gray-900 pt-2 border-t border-blue-200'>
                        <span>Total</span><span>৳{grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {submissionError && <p className='text-red-500 text-sm'>{submissionError}</p>}

                    <button
                      type='submit'
                      disabled={
                        Object.keys(errors).length > 0 ||
                        !formData.fullName ||
                        !formData.phoneNumber ||
                        !formData.deliveryZone ||
                        !formData.address ||
                        cartItems.length === 0 ||
                        isLoading
                      }
                      className='bg-gradient-to-r from-blue-700 to-blue-900 text-white py-3 px-4 rounded-lg w-full text-sm font-semibold disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed hover:from-blue-800 hover:to-blue-950 transition-all shadow-md'
                    >
                      {isLoading ? (
                        <span className='flex items-center justify-center gap-2'>
                          <svg className='animate-spin h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                          </svg>
                          Confirming...
                        </span>
                      ) : (
                        'Confirm Order'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              /* Confirmation View */
              <div
                className={`p-4 md:p-6 transition-all duration-500 ease-out ${confirmationAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {/* Success Header */}
                <div className='text-center py-6 bg-gradient-to-b from-green-50 to-white rounded-xl mb-6'>
                  <div
                    className={`w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-500 ease-out ${confirmationAnimating ? 'scale-100' : 'scale-75'}`}
                    style={{ transitionDelay: '100ms' }}
                  >
                    <svg
                      className={`w-10 h-10 text-green-600 transition-all duration-300 ${confirmationAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                      style={{ transitionDelay: '200ms' }}
                      fill='none' stroke='currentColor' viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                    </svg>
                  </div>
                  <h3
                    className={`text-2xl font-bold text-gray-900 mb-2 transition-all duration-400 ${confirmationAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                    style={{ transitionDelay: '150ms' }}
                  >
                    Thank You!
                  </h3>
                  <p className={`text-gray-600 text-sm mb-3 transition-all duration-400 ${confirmationAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{ transitionDelay: '200ms' }}>
                    Your order has been placed successfully.
                  </p>
                  <div
                    className={`bg-green-100 px-4 py-2 rounded-full inline-flex items-center gap-2 text-sm font-medium text-green-800 transition-all duration-400 ${confirmationAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    style={{ transitionDelay: '250ms' }}
                  >
                    <span>Order ID:</span>
                    <span className='font-bold'>#{orderDetails?.order?.orderId}</span>
                  </div>
                  <p className={`text-xs text-gray-500 mt-3 transition-all duration-300 ${confirmationAnimating ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
                    Placed on {orderDetails?.order?.orderDate && new Date(orderDetails.order.orderDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {/* Order Items */}
                <div className={`mb-6 transition-all duration-400 ${confirmationAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '350ms' }}>
                  <h4 className='text-md font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                    Order Items ({orderDetails?.order?.items?.length || 0})
                  </h4>
                  <div className='space-y-3 max-h-48 overflow-y-auto'>
                    {orderDetails?.order?.items?.map((item, index) => (
                      <div key={`${item.id}-${item.selectedColor}-${index}`} className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200'>
                        <div className='w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden'>
                          {item.image ? (
                            <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                          ) : (
                            <div className='w-full h-full bg-gray-300' />
                          )}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='font-medium text-gray-900 text-sm truncate'>{item.title}</p>
                          <p className='text-xs text-gray-500'>{item.selectedColor || item.selectedVariantValue || 'Standard'} | Qty: {item.quantity}</p>
                        </div>
                        <div className='text-right flex-shrink-0'>
                          <p className='font-semibold text-gray-900 text-sm'>৳{((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className={`mb-6 p-4 bg-gray-50 rounded-xl transition-all duration-400 ${confirmationAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
                  <h4 className='text-md font-semibold text-gray-900 mb-3'>Delivery Information</h4>
                  <div className='space-y-2 text-sm'>
                    <p className='text-gray-700'><span className='text-gray-500'>Name:</span> {orderDetails?.user?.fullName}</p>
                    <p className='text-gray-700'><span className='text-gray-500'>Phone:</span> {orderDetails?.user?.phoneNumber}</p>
                    <p className='text-gray-700'><span className='text-gray-500'>Zone:</span> {orderDetails?.user?.deliveryZone}</p>
                    <p className='text-gray-700'><span className='text-gray-500'>Address:</span> {orderDetails?.user?.address}</p>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className={`mb-6 p-4 bg-blue-50 rounded-xl transition-all duration-400 ${confirmationAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '450ms' }}>
                  <div className='flex justify-between text-sm text-gray-700 mb-2'>
                    <span>Subtotal</span><span>৳{orderDetails?.order?.totalPrice?.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-sm text-gray-700 mb-2'>
                    <span>Shipping</span><span>৳{orderDetails?.order?.shippingCharge?.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-blue-200'>
                    <span>Total</span><span>৳{orderDetails?.order?.grandTotal?.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleContinueShopping}
                  className={`w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white py-3 px-6 rounded-xl font-semibold text-sm hover:from-blue-800 hover:to-blue-950 transition-all shadow-md ${confirmationAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: '500ms', transitionDuration: '400ms' }}
                >
                  Continue Shopping
                </button>
                <p className='text-center text-xs text-gray-500 mt-4'>
                  Need help? Contact us at{' '}
                  <a href='tel:+8801814575428' className='text-blue-700 hover:underline'>+8801814575428</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDialog;
