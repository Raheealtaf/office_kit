"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, FileText, Smartphone, Laptop, Zap } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Zap className="w-6 h-6 text-white" fill="white" />
          </div>
          <span className="self-center text-2xl font-bold whitespace-nowrap text-slate-900">
            officekit<span className="text-blue-600">.io</span>
          </span>
        </Link>

        {/* Desktop Buttons */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <li>
            <Link
              href="/blog"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition-colors"
            >
              Blog
            </Link>
          </li>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all duration-300 ${
            isOpen ? "block opacity-100 translate-y-0" : "hidden md:opacity-100"
          }`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/tools/word-to-pdf"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition-colors"
              >
                Word to PDF
              </Link>
            </li>
            <li>
              <Link
                href="/tools/image-to-pdf"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition-colors"
              >
                Image to PDF
              </Link>
            </li>
            <li>
              <Link
                href="/tools/scan-document"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition-colors"
              >
                Scan Document
              </Link>
            </li>
            <li>
              <Link
                href="/tools/image-to-pdf"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition-colors"
              >
                PDF to Image
              </Link>
            </li>
            <li className="relative group">
              <button className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0">
                More Tools
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown Menu (Desktop only) */}
              <div className="hidden group-hover:block absolute left-0 mt-0 w-44 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-10">
                <Link
                  href="/tools/merge-pdf"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  Merge PDF
                </Link>
                <Link
                  href="/tools/split-pdf"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  Split PDF
                </Link>
                <Link
                  href="/tools/edit-pdf"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  PDF to Excel
                </Link>
                <Link
                  href="/tools/edit-pdf"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  Edit PDF
                </Link>
                <Link
                  href="/tools/compress-pdf"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  Compress PDF
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
