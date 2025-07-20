import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Admin() {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Users", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>

        <nav className="flex justify-center space-x-8 mb-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                pathname === item.path
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
