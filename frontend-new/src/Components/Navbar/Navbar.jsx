// src/Components/Navbar/Navbar.jsx
import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/shoplogo-removebg-preview.png";
import cart_icon from "../Assets/cart_icon-removebg-preview.png";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, isLoggedIn, logout } = useContext(ShopContext);
  const menuRef = useRef();

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : null}
        </li>

        <li onClick={() => setMenu("mens")}>
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>
          {menu === "mens" ? <hr /> : null}
        </li>

        <li onClick={() => setMenu("womens")}>
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>
          {menu === "womens" ? <hr /> : null}
        </li>

        <li onClick={() => setMenu("kids")}>
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" ? <hr /> : null}
        </li>
      </ul>

      <div className="nav-login-cart">
        {/* 🔹 Show Login or Logout based on isLoggedIn */}
        {isLoggedIn ? (
          <button className="nav-logout-btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart" style={{ position: "relative" }}>
          <img src={cart_icon} alt="cart" />
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
