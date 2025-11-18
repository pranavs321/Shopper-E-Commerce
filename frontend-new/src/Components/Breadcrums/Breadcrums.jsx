// src/Components/Breadcrums/Breadcrums.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrums.css";

const Breadcrums = ({ product }) => {
  if (!product) return null;

  const rawCategory = product.category || "";
  const catLower = rawCategory.toLowerCase();

  const categoryLabel =
    rawCategory &&
    rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();

  // map category to route path
  let categoryPath = "/";
  if (catLower === "men") categoryPath = "/mens";
  else if (catLower === "women") categoryPath = "/womens";
  else if (catLower === "kid" || catLower === "kids") categoryPath = "/kids";

  return (
    <div className="breadcrum">
      {/* HOME */}
      <Link to="/" className="crumb crumb-link">
        HOME
      </Link>
      <span className="separator">›</span>

      {/* SHOP */}
      <Link to="/" className="crumb crumb-link">
        SHOP
      </Link>

      {/* Category (Men / Women / Kids) */}
      {categoryLabel && (
        <>
          <span className="separator">›</span>
          <Link to={categoryPath} className="crumb crumb-link">
            {categoryLabel}
          </Link>
        </>
      )}

      {/* Current Product (not clickable) */}
      <span className="separator">›</span>
      <span className="crumb crumb-last">{product.name}</span>
    </div>
  );
};

export default Breadcrums;
