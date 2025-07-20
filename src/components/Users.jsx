import React, { useEffect, useState, useRef, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/users/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(result.data.users || []);
      setTotalPages(result.data.total || 1);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/users/${id}`;
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setError("User Deleted Successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!frmRef.current.checkValidity()) {
      frmRef.current.reportValidity();
      return;
    }
    try {
      await axios.post(`${API_URL}/api/users`, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setError("User added successfully");
      fetchUsers();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm({ ...user });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!frmRef.current.checkValidity()) {
      frmRef.current.reportValidity();
      return;
    }
    try {
      await axios.patch(`${API_URL}/api/users/${editId}`, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchUsers();
      setEditId();
      resetForm();
      setError("User information updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-center text-purple-700">User Management</h2>

      {error && (
        <div className="mb-4 text-center text-red-600 bg-red-100 rounded px-3 py-2">{error}</div>
      )}

      <form ref={frmRef} className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="firstName"
            value={form.firstName}
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="lastName"
            value={form.lastName}
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="email"
            value={form.email}
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="password"
            value={form.password}
            type="password"
            placeholder="New Password"
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <select
          name="role"
          value={form.role}
          required
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">--Select Role--</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex gap-4">
          {editId ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          )}
        </div>
      </form>

      <div className="flex justify-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none"
        />
        <button
          onClick={fetchUsers}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto max-w-6xl mx-auto">
        <table className="w-full table-auto border-collapse shadow-md bg-white rounded-lg overflow-hidden">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">First Name</th>
              <th className="px-4 py-2 text-left">Last Name</th>
              <th className="px-4 py-2 text-left">Email Address</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(users || []).map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{u.firstName}</td>
                <td className="px-4 py-2">{u.lastName}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 capitalize">{u.role}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(u)}
                    className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center items-center space-x-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
