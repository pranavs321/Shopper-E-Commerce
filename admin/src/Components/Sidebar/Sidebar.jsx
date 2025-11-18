import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import add_product_icon from "../Assets/product_add.png";
import list_product_icon from "../Assets/product_list.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/addproduct" className="sidebar-link">
        <div className="sidebar-item">
          <img src={add_product_icon} alt="Add product" />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to="/listproduct" className="sidebar-link">
        <div className="sidebar-item">
          <img src={list_product_icon} alt="Product list" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
