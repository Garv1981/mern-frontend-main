import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id && qty > 1 ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, item) => sum + item.qty * item.price, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-blue-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-blue-800">
          🛍️ My Cart
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold bg-red-100 p-3 rounded-lg">
            {error}
          </div>
        )}

        {cart.filter((item) => item.qty > 0).length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Your cart is currently empty 🧺
          </p>
        ) : (
          <div className="space-y-4">
            {cart.map(
              (item) =>
                item.qty > 0 && (
                  <div
                    key={item._id}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-800">
                        {item.productName}
                      </p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price} × {item.qty}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => decrement(item._id, item.qty)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-lg font-bold"
                      >
                        −
                      </button>
                      <span className="text-xl font-semibold">{item.qty}</span>
                      <button
                        onClick={() => increment(item._id, item.qty)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-xl font-semibold text-blue-700 min-w-[80px] text-right">
                      ₹{item.price * item.qty}
                    </div>
                  </div>
                )
            )}
          </div>
        )}

        <div className="mt-8 text-center text-2xl font-bold text-gray-800">
          Total Amount: <span className="text-blue-700">₹{orderValue}</span>
        </div>

        <div className="mt-6 text-center">
          {user?.token ? (
            <button
              onClick={placeOrder}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200"
            >
              ✅ Place Order
            </button>
          ) : (
            <button
              onClick={() => Navigate("/login")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200"
            >
              🔒 Login to Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
