// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import ShopContextProvider from "./Context/ShopContext";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import LoginPromptModal from "./Components/LoginPromptModal/LoginPromptModal";

// pages
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";

function App() {
  return (
    <div className="app-root">
      <ShopContextProvider>
        <Navbar />

        {/* custom login modal */}
        <LoginPromptModal />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/mens" element={<ShopCategory category="men" />} />
            <Route path="/womens" element={<ShopCategory category="women" />} />
            <Route path="/kids" element={<ShopCategory category="kid" />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />
          </Routes>
        </main>

        <Footer />
      </ShopContextProvider>
    </div>
  );
}

export default App;
