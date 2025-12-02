import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import logo from "/images/Screenshot_3-removebg-preview.png";
import { navLinks } from "../demoData";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center py-3"> 
          {/* Logo */}
          <div className="w-32">
            <img src={logo} alt="logo" className="w-full h-auto" />
          </div>
           
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-bold text-xl hover:text-primary ${
                  currentPath === link.path ? "text-primary" : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-2xl"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>

            <FaShoppingCart className="text-2xl cursor-pointer hover:text-gray-500" />
            <FaUserCircle className="text-2xl cursor-pointer hover:text-gray-500" />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 flex flex-col space-y-3 text-white">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`${currentPath === link.path ? "text-primary font-bold" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
