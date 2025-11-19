// src/Components/Sidebar/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import add_product_icon from "../Assets/product_add.png";
import list_product_icon from "../Assets/product_list.png";
import orders_icon from "../Assets/orders.png";   // use any icons you have
import users_icon from "../Assets/users.jpg";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (to) => (path === to ? "sidebar-item active" : "sidebar-item");

  return (
    <div className="sidebar">
      <Link to="/addproduct" className="sidebar-link">
        <div className={isActive("/addproduct")}>
          <img src={add_product_icon} alt="Add product" />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to="/listproduct" className="sidebar-link">
        <div className={isActive("/listproduct")}>
          <img src={list_product_icon} alt="Product list" />
          <p>Product List</p>
        </div>
      </Link>

      <Link to="/orders" className="sidebar-link">
        <div className={isActive("/orders")}>
          <img src={orders_icon} alt="Orders" />
          <p>Orders</p>
        </div>
      </Link>

      <Link to="/users" className="sidebar-link">
        <div className={isActive("/users")}>
          <img src={users_icon} alt="Users" />
          <p>Users</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
