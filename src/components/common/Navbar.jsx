import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className='hidden md:block bg-white shadow-md'>
        <div className='container mx-auto py-4 flex items-center justify-center'>
          <Link href='/'>
            <img className='h-20' src='/assets/logo.png' alt='Logo' />
          </Link>
        </div>
        <div className='bg-gray-700 py-3 px-6 flex justify-center space-x-8 text-gray-100 text-sm font-medium'>
          <Link
            href='/products'
            className={`${
              router.pathname === '/products'
                ? 'text-blue-500 font-semibold'
                : 'hover:text-blue-400 transition-colors'
            }`}
          >
            Products
          </Link>
          <Link
            href='/about-us'
            className={`${
              router.pathname === '/about-us'
                ? 'text-blue-500 font-semibold'
                : 'hover:text-blue-400 transition-colors'
            }`}
          >
            About Us
          </Link>
          <Link
            href='/contact-us'
            className={`${
              router.pathname === '/contact-us'
                ? 'text-blue-500 font-semibold'
                : 'hover:text-blue-400 transition-colors'
            }`}
          >
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className='block md:hidden bg-white shadow-md'>
        <div className='px-6 py-3 flex items-center justify-between'>
          <Link href='/'>
            <img className='h-12' src='/assets/logo.png' alt='Logo' />
          </Link>
          <button
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='text-2xl text-gray-600 hover:text-blue-500 transition-colors focus:outline-none'
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen
              ? 'max-h-64 opacity-100 px-6 py-4 bg-gray-50 shadow-inner'
              : 'max-h-0 opacity-0'
          } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className='flex flex-col space-y-4 text-gray-700 text-base font-medium'>
            <Link
              href='/products'
              onClick={() => setIsMenuOpen(false)}
              className={`${
                router.pathname === '/products'
                  ? 'text-blue-500 font-semibold'
                  : 'hover:text-blue-500 transition-colors'
              }`}
            >
              Products
            </Link>
            <Link
              href='/about-us'
              onClick={() => setIsMenuOpen(false)}
              className={`${
                router.pathname === '/about-us'
                  ? 'text-blue-500 font-semibold'
                  : 'hover:text-blue-500 transition-colors'
              }`}
            >
              About Us
            </Link>
            <Link
              href='/contact-us'
              onClick={() => setIsMenuOpen(false)}
              className={`${
                router.pathname === '/contact-us'
                  ? 'text-blue-500 font-semibold'
                  : 'hover:text-blue-500 transition-colors'
              }`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
