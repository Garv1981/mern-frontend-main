import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { user, cart, setCart } = useContext(AppContext);

  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-indigo-700">Our Products</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col items-center">
            <img src={product.imgUrl} alt={product.productName} className="w-32 h-32 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-semibold text-indigo-600">{product.productName}</h3>
            <p className="text-gray-600 text-sm mt-2">{product.description}</p>
            <h4 className="text-xl font-bold mt-3 text-pink-600">₹ {product.price}</h4>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
