import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h3 className="text-3xl font-bold text-center text-purple-700 mb-8">My Orders</h3>

      {error && (
        <div className="text-center text-red-500 font-semibold mb-4">{error}</div>
      )}

      {orders.length === 0 && (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      )}

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-2xl p-6 space-y-4"
          >
            <div className="text-lg font-semibold text-gray-800">
              Order ID: <span className="text-gray-600">{order._id}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <p>Order Value: ₹{order.orderValue}</p>
              <p>Status: <span className="font-medium text-green-600">{order.status}</span></p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full mt-4 text-sm text-left border border-gray-200 rounded-lg">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item._id}>
                      <td className="px-4 py-2">{item.productName}</td>
                      <td className="px-4 py-2">₹{item.price}</td>
                      <td className="px-4 py-2">{item.qty}</td>
                      <td className="px-4 py-2">₹{item.qty * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
