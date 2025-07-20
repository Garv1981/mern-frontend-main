import { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Order from "./components/Order";
import Admin from "./components/Admin";
import Users from "./components/Users";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Login from "./components/Login";
import Profile from "./components/Profile";

// Create Context
export const AppContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-cyan-50 to-purple-50 font-sans">
      <AppContext.Provider value={{ cart, setCart, user, setUser }}>
        <BrowserRouter>
          <div className="max-w-7xl mx-auto shadow-xl bg-white min-h-screen flex flex-col rounded-2xl overflow-hidden">
            <Header />

            <main className="flex-1 px-6 py-8 bg-gray-50">
              <Routes>
                <Route index element={<Product />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<Profile />} />
                <Route path="cart" element={<Cart />} />
                <Route path="order" element={<Order />} />
                <Route path="admin" element={<Admin />}>
                  <Route index element={<Users />} />
                  <Route path="products" element={<Products />} />
                  <Route path="orders" element={<Orders />} />
                </Route>
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
