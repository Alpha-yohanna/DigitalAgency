import React, { useState } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const adminUrl = `${process.env.PUBLIC_URL || ""}/admin`;

  const handleServicesHover = () => {
    setDropdownVisible(true);
  };

  const handleServicesLeave = () => {
    setDropdownVisible(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setDropdownVisible(false);
  };

  const navLinks = (
    <>
      <li className="md:mt-2">
        <div
          id="dropdown"
          onMouseEnter={handleServicesHover}
          onMouseLeave={handleServicesLeave}
          onClick={() => setDropdownVisible((isVisible) => !isVisible)}
          className="flex cursor-pointer items-center text-black hover:text-gray-500 custom-link-style"
        >
          Services <FiChevronDown className="ml-1" size={16} />
        </div>
        {isDropdownVisible && (
          <div className="mt-2 rounded-lg bg-gray-700 py-2 text-left shadow-lg md:absolute md:z-10 md:right-30">
            <a
              href="#resources"
              className="block px-4 py-2 text-white hover:bg-green-100"
              onClick={closeMobileMenu}
            >
              Resources
            </a>
            <a
              href="#blog"
              className="block px-4 py-2 text-white hover:bg-green-100"
              onClick={closeMobileMenu}
            >
              Our Blog
            </a>
            <a
              href="#faq"
              className="block px-4 py-2 text-white hover:bg-green-100"
              onClick={closeMobileMenu}
            >
              Frequently Asked Questions (FAQ)
            </a>
          </div>
        )}
      </li>
      <li className="md:mt-2">
        <a
          href="#about"
          className="text-black hover:text-gray-500 custom-link-style"
          onClick={closeMobileMenu}
        >
          About Us
        </a>
      </li>
      <li className="md:mt-2">
        <a
          href="#contact"
          className="text-black hover:text-gray-500 custom-link-style"
          onClick={closeMobileMenu}
        >
          Contact Us
        </a>
      </li>
      <li>
        <a
          href={adminUrl}
          className="inline-block rounded-lg border border-1 border-green-600 bg-green-100 px-3 py-1 text-black hover:text-gray-500 custom-link-style"
          onClick={closeMobileMenu}
        >
          Login
        </a>
      </li>
      <li>
        <a
          href="#contact"
          className="inline-block rounded-lg border border-1 border-green-600 bg-green-600 px-3 py-1 text-white hover:text-gray-200 custom-link-style"
          onClick={closeMobileMenu}
        >
          Get Started
        </a>
      </li>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-green-100 text-white">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <span className="text-black font-Poppins font-bold text-20">
              Design
            </span>
            <span className="text-orange-500 font-Poppins font-bold text-20">
              Agency
            </span>
          </div>
        </div>
        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 text-black md:hidden"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <div className="hidden items-center md:flex">
          <ul className="flex space-x-6">{navLinks}</ul>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="border-t border-green-200 bg-green-100 px-6 pb-5 md:hidden">
          <ul className="grid gap-4 pt-4">{navLinks}</ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
