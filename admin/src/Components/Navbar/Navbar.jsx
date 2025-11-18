import React from "react";
import "./Navbar.css";
import logo from "../Assets/shoplogo.png";
import admin_profile from "../Assets/admin_profile.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Shopper logo" className="nav-logo" />
        <div className="nav-title">
          <span className="nav-brand">SHOPPER</span>
          <span className="nav-subtitle">Admin Panel</span>
        </div>
      </div>

      <div className="nav-right">
        <img
          src={admin_profile}
          alt="Admin"
          className="nav-profile"
        />
        <span className="nav-admin-text">Admin</span>
      </div>
    </div>
  );
};

export default Navbar;
