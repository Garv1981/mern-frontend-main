import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      await axios.delete(url);
      setError("Product Deleted Successfully");
      fetchProducts();
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
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products`;
      await axios.post(url, form);
      setError("Product added successfully");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      productName: product.productName,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products/${editId}`;
      await axios.patch(url, form);
      fetchProducts();
      setEditId();
      resetForm();
      setError("Product updated successfully");
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
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Product Management</h2>

      {error && (
        <div className="text-center mb-4 text-red-500 font-medium">{error}</div>
      )}

      {/* Form */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md mb-6">
        <form ref={frmRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="productName"
            value={form.productName}
            type="text"
            placeholder="Product Name"
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            name="description"
            value={form.description}
            type="text"
            placeholder="Description"
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            name="price"
            value={form.price}
            type="text"
            placeholder="Price"
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            name="imgUrl"
            value={form.imgUrl}
            type="text"
            placeholder="Image URL"
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />

          <div className="col-span-2 flex gap-3">
            {editId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Update
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Search */}
      <div className="flex justify-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search Products..."
          onChange={(e) => setSearchVal(e.target.value)}
          className="p-2 w-60 border border-gray-300 rounded-lg"
        />
        <button
          onClick={fetchProducts}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-5xl mx-auto mb-6">
        <table className="w-full bg-white rounded-xl shadow-md">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
            {products.map((value) => (
              <tr key={value._id}>
                <td className="px-4 py-2">{value.productName}</td>
                <td className="px-4 py-2">{value.description}</td>
                <td className="px-4 py-2">₹{value.price}</td>
                <td className="px-4 py-2 truncate text-blue-500 underline">{value.imgUrl}</td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(value)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(value._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4">
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
