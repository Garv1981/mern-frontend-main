import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders);
      setTotalPages(result.data.total);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  const updateOrder = async (status, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      await axios.patch(url, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Order Management
      </h2>

      <div className="mb-4 flex justify-center">
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {error && (
        <div className="text-center text-red-500 font-semibold mb-4">{error}</div>
      )}

      <ul className="space-y-4 max-w-2xl mx-auto">
        {orders.map((order) => (
          <li
            key={order._id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col gap-2"
          >
            <div className="text-gray-800 font-semibold">
              Order ID: <span className="text-gray-600">{order._id}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Value: ₹{order.orderValue}</span>
              <span
                className={`px-3 py-1 rounded-full text-white text-xs ${
                  order.status === "Pending"
                    ? "bg-yellow-500"
                    : order.status === "completed"
                    ? "bg-green-600"
                    : "bg-red-500"
                }`}
              >
                {order.status}
              </span>
            </div>

            {order.status === "Pending" && (
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => updateOrder("cancelled", order._id)}
                  className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateOrder("completed", order._id)}
                  className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Complete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-lg ${
            page === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
