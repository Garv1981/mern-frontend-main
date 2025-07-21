import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-blue-400">
            © {new Date().getFullYear()} Garv Gakkhar
          </h3>
          <p className="text-sm text-gray-300">All rights reserved. Powered by Garv Gakkhar 🔥</p>
        </div>
        <div className="flex space-x-4 text-gray-300">
          <a href="#" className="hover:text-blue-300 transition">Privacy</a>
          <a href="#" className="hover:text-blue-300 transition">Terms</a>
          <a href="#" className="hover:text-blue-300 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
