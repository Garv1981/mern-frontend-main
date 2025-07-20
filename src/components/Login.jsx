import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/login`;
      const result = await axios.post(url, user);
      setUser(result.data);
      Navigate("/");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>

        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Submit
          </button>
        </div>

        <hr className="my-6" />

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-600 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
