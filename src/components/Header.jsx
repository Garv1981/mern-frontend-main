import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <header className="bg-slate-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-300 hover:text-teal-200 transition duration-300">
          🌐 YourCart
        </h1>

        <nav className="flex space-x-6 text-lg">
          <Link
            to="/"
            className="hover:text-teal-300 transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="hover:text-teal-300 transition duration-300"
          >
            MyCart
          </Link>

          <Link
            to="/order"
            className="hover:text-teal-300 transition duration-300"
          >
            MyOrder
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-red-300 font-semibold transition duration-300"
            >
              Admin
            </Link>
          )}

          {user?.token ? (
            <Link
              to="/profile"
              className="hover:text-green-300 transition duration-300"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="hover:text-yellow-300 transition duration-300"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
