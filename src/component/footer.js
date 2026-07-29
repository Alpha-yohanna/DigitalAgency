import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-600 px-6 py-10 text-black">
      <div className="mx-auto grid max-w-6xl gap-8 text-center md:grid-cols-3 md:text-left">
        <div>
          <h2 className="mb-4 text-2xl font-bold uppercase">Web Logo</h2>
          <p>
            Some footer text about the Agency. Just a little description to help
            people understand you better.
          </p>
          <div className="mt-6 flex justify-center gap-4 text-white md:justify-start">
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-lg font-semibold">Quick Links</h2>
          <div className="grid gap-2">
            <a href="#about">Services</a>
            <a href="#about">Portfolio</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-lg font-semibold">Address</h2>
          <p>
            Digital Agency Head Office.
            <br />
            Airport Road
            <br />
            Lagos state Nigeria.
          </p>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-center text-sm md:text-left">
        Copyright Digital Agency 2026.
      </p>
    </footer>
  );
};

export default Footer;
