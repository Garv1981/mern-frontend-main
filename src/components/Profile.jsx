import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaSave } from "react-icons/fa";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const url = `${API_URL}/api/users/${user.id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    setUser({});
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/${profile._id}/profile`;
      await axios.patch(url, form);
      fetchProfile();
      setError("✅ Data saved successfully.");
    } catch (err) {
      console.log(err);
      setError("❌ Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2 text-indigo-700">
          <FaUserCircle className="text-3xl" /> My Profile
        </h3>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="space-y-4">
        <input
          name="firstName"
          type="text"
          onChange={handleChange}
          defaultValue={profile.firstName}
          placeholder="First Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
        />

        <input
          name="lastName"
          type="text"
          onChange={handleChange}
          defaultValue={profile.lastName}
          placeholder="Last Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
        />

        <input
          name="email"
          type="email"
          onChange={handleChange}
          defaultValue={profile.email}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          defaultValue={profile.password}
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
      >
        <FaSave /> Update Profile
      </button>

      {error && (
        <p className="mt-4 text-center text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
