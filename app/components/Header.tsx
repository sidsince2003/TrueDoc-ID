"use client";

import { useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <div className="top-0 py-1 lg:py-2 w-full fixed z-20  bg-gray-900 shadow-lg shadow-black/20">
      <nav className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-6">
          {/* Ministry of Power Logo */}
          <img
            src="/power.png.png"
            alt="Ministry of Power Logo"
            className="h-14 w-auto"
          />
          {/* Site Title */}
          <Link href="/">
            <button className="focus:outline-none">
              <h2 className="text-white font-bold text-2xl hover:text-yellow-300 transition duration-200">
                TrueDoc
              </h2>
            </button>
          </Link>
        </div>

       
          {/* Navigation links */}
          <div className="hidden lg:block">
            <ul className="flex space-x-10 text-base font-bold text-white">
              <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear hover:text-blue-500">
                <Link href="#home">Home</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear hover:text-blue-500">
                <Link href="#about">About</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear hover:text-blue-500">
                <Link href="#Features">Features</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear hover:text-blue-500">
                <Link href="#Contact">Contact</Link>
              </li>
            </ul>
          </div>

        {/* Buttons */}
        <div className="hidden lg:flex space-x-4">
          <Link
            href="/login"
            className="flex items-center justify-center rounded-full bg-[#4A3BFF] text-white px-6 py-2.5 font-semibold hover:bg-blue-900 hover:drop-shadow transition duration-200"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="flex items-center justify-center rounded-full bg-[#4A3BFF] text-white px-6 py-2.5 font-semibold hover:bg-blue-900 hover:drop-shadow transition duration-200"
          >
            Sign Up
          </Link>

        </div>
        <div className="text-white">
        <LanguageSwitcher/>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleDropdown}
            className="focus:outline-none text-white text-2xl"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isDropdownOpen && (
        <div className="lg:hidden bg-indigo-600 shadow-md rounded-lg mt-2 mx-5 p-4">
          <ul className="space-y-4 text-white text-lg">
            {["Home", "About", "Features", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setDropdownOpen(false)}
                  className="block hover:underline hover:text-yellow-300 transition duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col space-y-4 mt-4">
            <Link
              href="/login"
              className="block text-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 font-semibold shadow-lg hover:scale-105 transition duration-300"
              onClick={() => setDropdownOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block text-center rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 font-semibold shadow-lg hover:scale-105 transition duration-300"
              onClick={() => setDropdownOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 