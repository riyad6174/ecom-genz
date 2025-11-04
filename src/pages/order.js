import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '@/components/common/Navbar';
import CustomSection from '@/components/layout/CustomSection';
import { IoMdArrowBack } from 'react-icons/io';
import CartCard from '@/components/checkout/CartCard';
import HeaderSm from '@/components/common/HeaderSm';
import Footer from '@/components/common/Footer';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import districtsData from '@/utils/districts.json';
import DeliveryAndReturnPolicy from '@/components/CartPolicy';
import Link from 'next/link';
import { clearCart } from '@/store/cartSlice';
import { useRouter } from 'next/router';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const router = useRouter();
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    district: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState(
    districtsData.districts.slice(0, 5)
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // Pricing state
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(60);
  const [grandTotal, setGrandTotal] = useState(0);

  // Calculate totals based on cart items
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );
    setTotalPrice(total);
    setGrandTotal(total + shippingCharge);
  }, [cartItems, shippingCharge]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Handle phone number change
  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value || '' });
    validateField('phoneNumber', value || '');
  };

  // Handle district selection
  const handleDistrictSelect = (district) => {
    setFormData({ ...formData, district });
    setSearchTerm(district);
    setIsDropdownOpen(false);
    validateField('district', district);
    const newShippingCharge = district === 'Dhaka' ? 60 : 120;
    setShippingCharge(newShippingCharge);
    setGrandTotal(totalPrice + newShippingCharge);
  };

  // Handle district search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFormData({ ...formData, district: value });
    setIsDropdownOpen(true);
    const filtered = districtsData.districts.filter((district) =>
      district.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDistricts(filtered.slice(0, 5));
  };

  // Validate individual field
  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          newErrors.fullName = 'Full name is required';
        } else if (value.length < 2) {
          newErrors.fullName = 'Full name must be at least 2 characters';
        } else {
          delete newErrors.fullName;
        }
        break;
      case 'phoneNumber':
        if (!value) {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\+880\d{10}$/.test(value)) {
          newErrors.phoneNumber =
            'Please enter a valid Bangladesh phone number';
        } else {
          delete newErrors.phoneNumber;
        }
        break;
      case 'district':
        if (!value.trim()) {
          newErrors.district = 'District is required';
        } else if (!districtsData.districts.some((d) => d.name === value)) {
          newErrors.district = 'Please select a valid district';
        } else {
          delete newErrors.district;
        }
        break;
      case 'address':
        if (!value.trim()) {
          newErrors.address = 'Address is required';
        } else if (value.length < 5) {
          newErrors.address = 'Address must be at least 5 characters';
        } else {
          delete newErrors.address;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  // Validate entire form on submit
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (formData.fullName.length < 2)
      newErrors.fullName = 'Full name must be at least 2 characters';
    if (!formData.phoneNumber)
      newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\+880\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Please enter a valid Bangladesh phone number';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    else if (!districtsData.districts.some((d) => d.name === formData.district))
      newErrors.district = 'Please select a valid district';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    else if (formData.address.length < 5)
      newErrors.address = 'Address must be at least 5 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmissionError(null);

    const phoneLastFive = formData.phoneNumber
      ? formData.phoneNumber.slice(-5)
      : 'UNKNOWN';
    const order = {
      user: { ...formData },
      order: {
        items: [...cartItems],
        totalPrice,
        shippingCharge,
        grandTotal,
        orderDate: new Date().toISOString(),
        orderId: `ORD-${phoneLastFive}`,
      },
    };

    const sheetData = {
      name: formData.fullName || '',
      phone: formData.phoneNumber || '',
      district: formData.district || '',
      address: formData.address || '',
      items: JSON.stringify(
        cartItems.map((item) => ({
          title: item.title || 'Unknown',
          price: item.price || 0,
          quantity: item.quantity || 1,
          selectedColor: item.selectedColor || item.selectedVariantValue,
        }))
      ),
      totalPrice: totalPrice || 0,
      shippingCharge: shippingCharge || 0,
      grandTotal: grandTotal || 0,
      orderId: `ORD-${phoneLastFive}` || 'ORD-UNKNOWN',
      orderDate: new Date().toISOString(),
      submissionTime: new Date().toISOString(),
      sheetName: 'Orders',
    };

    console.log('sheetData:', JSON.stringify(sheetData, null, 2));
    if (
      !sheetData.name ||
      !sheetData.phone ||
      !sheetData.district ||
      !sheetData.address
    ) {
      setSubmissionError('Please fill all required fields.');
      setIsLoading(false);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      console.log('Sending fetch request:', {
        url: '/api/submit',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData),
      });
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API error response:', errorData);
        setSubmissionError(errorData.message || 'Failed to submit order');
      } else {
        console.log('Order Submitted:', order);
        setOrderDetails(order);
        setShowPopup(true);

        // Push purchase event to data layer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'purchase',
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
              item_category: item.category || 'Accessories', // Adjust based on product data
            })),
          },
        });
      }
    } catch (error) {
      console.error('Fetch error:', error.name, error.message);
      setSubmissionError('Error submitting order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle popup close
  const handleClosePopup = () => {
    setShowPopup(false);
    setOrderDetails(null);
    dispatch(clearCart());
    router.push('/');
  };

  // Update filtered districts on mount
  useEffect(() => {
    setFilteredDistricts(districtsData.districts.slice(0, 5));
  }, []);

  return (
    <div>
      <div className='hidden md:block'>
        <Navbar />
      </div>
      <HeaderSm>
        <Link href='/'>
          <IoMdArrowBack className='text-2xl' />
        </Link>
        <span className='text-xl font-semibold'>Order</span>
        <div></div>
      </HeaderSm>
      <CustomSection>
        <div className='mx-auto pt-16 md:pt-0'>
          <div className='flex flex-col md:flex-row gap-5'>
            {/* Cart Items */}
            <div className='md:w-4/5'>
              <div className='md:bg-white py-4 px-6 md:p-6 md:mb-4 md:rounded-lg md:shadow'>
                <h2 className='text-lg font-semibold mb-4'>Your Cart</h2>
                {cartItems.length === 0 ? (
                  <div className='flex flex-col gap-4 items-center justify-center h-24'>
                    <p className='text-gray-500'>Your cart is empty.</p>
                    <Link
                      href='/'
                      className='text-white mt-2 bg-primary rounded-lg px-4 py-2 text-sm font-semibold'
                    >
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <CartCard
                      key={`${item.id}-${item.selectedColor}`}
                      item={item}
                    />
                  ))
                )}
                <div className='hidden md:block'>
                  <DeliveryAndReturnPolicy />
                </div>
              </div>
            </div>
            {/* Checkout Form */}
            <div className='md:w-1/3'>
              <div className='bg-white rounded-lg shadow-md p-6'>
                <div className='pb-4'>
                  <h2 className='text-lg font-semibold'>Proceed to Checkout</h2>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className='border md:border-2 rounded-lg md:border-blue-400 p-4 bg-gray-50'
                >
                  <div className='space-y-4'>
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor='fullName'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Full Name
                      </label>
                      <input
                        type='text'
                        id='fullName'
                        name='fullName'
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder='Enter Full Name'
                        className='py-2 px-3 border w-full rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary focus:border-primary'
                      />
                      {errors.fullName && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor='phoneNumber'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Phone Number
                      </label>
                      <PhoneInput
                        id='phoneNumber'
                        defaultCountry='BD'
                        value={formData.phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder='Enter Phone Number'
                        className='py-2 px-3 border w-full rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary focus:border-primary'
                      />
                      {errors.phoneNumber && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                    {/* District */}
                    <div className='relative'>
                      <label
                        htmlFor='district'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        District
                      </label>
                      <input
                        type='text'
                        id='district'
                        name='district'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={() => setIsDropdownOpen(true)}
                        placeholder='Select District'
                        className='py-2 px-3 border w-full rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary focus:border-primary'
                      />
                      {isDropdownOpen && (
                        <ul className='absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg'>
                          {filteredDistricts.length > 0 ? (
                            filteredDistricts.map((district) => (
                              <li
                                key={district.id}
                                onClick={() =>
                                  handleDistrictSelect(district.name)
                                }
                                className='px-3 py-2 text-sm hover:bg-blue-100 cursor-pointer'
                              >
                                {district.name}
                              </li>
                            ))
                          ) : (
                            <li className='px-3 py-2 text-sm text-gray-500'>
                              No districts found
                            </li>
                          )}
                        </ul>
                      )}
                      {errors.district && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.district}
                        </p>
                      )}
                    </div>
                    {/* Address */}
                    <div>
                      <label
                        htmlFor='address'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Details Address
                      </label>
                      <input
                        type='text'
                        id='address'
                        name='address'
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder='Thana, Road No, House No'
                        className='py-2 px-3 border w-full rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary focus:border-primary'
                      />
                      {errors.address && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.address}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Pricing Summary */}
                  <div className='py-4  text-[16px] bg-blue-50 rounded-lg font-semibold p-4 text-black my-5'>
                    <div className='flex text-sm md:text-md justify-between mb-2'>
                      <span>Total Price</span>
                      <span>৳{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className='flex text-sm md:text-md justify-between mb-2'>
                      <span>Shipping Charge</span>
                      <span>৳{shippingCharge.toFixed(2)}</span>
                    </div>
                    <hr className='my-2' />
                    <div className='flex justify-between my-4'>
                      <span className=' text-sm md:text-lg'>Grand Total</span>
                      <span className='font-semibold text-sm md:text-lg'>
                        ৳{grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  {/* Submission Error */}
                  {submissionError && (
                    <p className='text-red-500 text-sm mb-2'>
                      {submissionError}
                    </p>
                  )}
                  <button
                    type='submit'
                    disabled={
                      Object.keys(errors).length > 0 ||
                      !formData.fullName ||
                      !formData.phoneNumber ||
                      !formData.district ||
                      !formData.address ||
                      cartItems.length === 0 ||
                      isLoading
                    }
                    className='bg-primary text-black py-3 px-4 rounded-lg w-full text-sm font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-secondary transition-colors'
                  >
                    {isLoading ? 'Confirming...' : 'Confirm Order'}
                  </button>
                </form>
              </div>
            </div>
            <div className='block md:hidden p-4'>
              <DeliveryAndReturnPolicy />
            </div>
          </div>
        </div>
      </CustomSection>
      <Footer />
      {/* Thank You Popup */}
      {showPopup && orderDetails && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto'>
            <div className='text-center'>
              <svg
                className='w-12 h-12 mx-auto mb-4 text-primary'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 13l4 4L19 7'
                />
              </svg>
              <h2 className='text-2xl font-bold text-black mb-2'>
                Thank You for Your Order!
              </h2>
              <p className='text-gray-600 mb-6'>
                Your order #{orderDetails.order.orderId} has been successfully
                placed.
              </p>
            </div>
            {/* Invoice-like Design */}
            <div className='border rounded-lg bg-white shadow-sm'>
              {/* Invoice Header */}
              <div className='bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-t-lg'>
                <h3 className='text-lg font-semibold text-gray-800'>
                  Order Invoice
                </h3>
                <p className='text-sm text-gray-600'>
                  Order Date:{' '}
                  {new Date(orderDetails.order.orderDate).toLocaleString()}
                </p>
              </div>
              {/* Order Items */}
              <div className='p-3 border-b'>
                <h4 className='text-sm font-medium text-gray-700 mb-3'>
                  Order Items
                </h4>
                {orderDetails.order.items.length === 0 ? (
                  <p className='text-sm text-gray-500'>No items in order.</p>
                ) : (
                  <div className='space-y-3'>
                    <div className='grid grid-cols-11 gap-2 text-xs font-medium text-gray-700 bg-gray-50 p-2 rounded'>
                      <span className='col-span-4'>Item</span>
                      <span className='col-span-3 text-center'>Variant</span>
                      <span className='col-span-2 text-center'>Qty</span>
                      <span className='col-span-2 text-right'>Total</span>
                    </div>
                    {orderDetails.order.items.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedColor}`}
                        className='grid grid-cols-11 gap-2 text-sm text-gray-600 items-center'
                      >
                        <span className='col-span-4 font-medium truncate'>
                          {item.title}
                        </span>
                        <span className='col-span-3 text-center'>
                          {item.selectedColor || item.selectedVariantValue}
                        </span>
                        <span className='col-span-2 text-center'>
                          {item.quantity}
                        </span>
                        <span className='col-span-2 text-right font-medium'>
                          ৳{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Pricing Summary */}
              <div className='p-4'>
                <div className='space-y-2 text-sm text-gray-600'>
                  <div className='flex justify-between'>
                    <span>Total Price</span>
                    <span>৳{orderDetails.order.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Shipping Charge</span>
                    <span>৳{orderDetails.order.shippingCharge.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between font-semibold text-gray-800 pt-2 border-t'>
                    <span>Grand Total</span>
                    <span>৳{orderDetails.order.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              {/* Invoice Footer */}
              <div className='p-4 bg-gray-50 rounded-b-lg text-center text-xs text-gray-500'>
                <p>Thank you for shopping with us!</p>
                <p>Contact us at support@example.com for any queries.</p>
              </div>
            </div>
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className='mt-6 bg-primary text-black py-2 px-4 rounded-lg w-full text-sm font-semibold hover:bg-primary transition-colors'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
