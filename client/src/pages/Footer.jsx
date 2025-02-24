import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand/Logo */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Recipe App</h2>
          <p className="text-gray-300 text-sm">Bringing delicious recipes to your kitchen.</p>
        </div>
        
        {/* Social Media Links */}
        <div className="flex space-x-4 text-xl">
          <a href="#" className="hover:text-blue-400"><FaFacebook /></a>
          <a href="#" className="hover:text-blue-300"><FaTwitter /></a>
          <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-500"><FaLinkedin /></a>
        </div>
      </div>
      
      <hr className="my-4 border-gray-500" />
      
      {/* Copyright Section */}
      <div className="text-center text-gray-200 text-sm">
        &copy; {new Date().getFullYear()} Recipe App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;