// src/Pages/Admin/Admin.jsx
import React from "react";
import "./Admin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import AdminOrders from "../../Components/AdminOrders/AdminOrders";
import AdminUsers from "../../Components/AdminUsers/AdminUsers";
import { Routes, Route } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <div className="admin-main">
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/users" element={<AdminUsers />} />
          {/* default – when nothing matches */}
          <Route path="*" element={<AddProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
