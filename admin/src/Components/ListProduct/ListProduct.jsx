// src/Components/ListProduct/ListProduct.jsx
import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../Assets/cross.png"; // make sure this file exists

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/allproducts");
      const data = await res.json();
      // backend sends an array
      setAllProducts(Array.isArray(data) ? data : []);
      console.log("All products response:", data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Remove a product
  const removeProduct = async (id) => {
    try {
      const res = await fetch("http://localhost:4000/removeproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      let result = {};
      try {
        // if backend returns JSON, this will work;
        // if not, it will just be caught and ignored
        result = await res.json();
      } catch (e) {
        console.warn("Remove product: response not JSON, ignoring body.");
      }

      if (!res.ok) {
        console.error("Failed to remove product:", result);
        alert("Failed to remove product");
        return;
      }

      // update UI instantly
      setAllProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing product:", err);
      alert("Something went wrong while removing product.");
    }
  };

  return (
    <div className="list-product">
      <h2 className="listproduct-title">All Products List</h2>

      <div className="listproduct-table">
        <div className="listproduct-header">
          <span>Products</span>
          <span>Title</span>
          <span>Old Price</span>
          <span>New Price</span>
          <span>Category</span>
          <span>Remove</span>
        </div>

        {loading ? (
          <div className="listproduct-empty">Loading products...</div>
        ) : allProducts.length === 0 ? (
          <div className="listproduct-empty">No products found.</div>
        ) : (
          <div className="listproduct-body">
            {allProducts.map((item) => (
              <div className="listproduct-row" key={item._id || item.id}>
                <div className="listproduct-img-cell">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="listproduct-img"
                  />
                </div>
                <div className="listproduct-name">{item.name}</div>
                <div className="listproduct-price">${item.old_price}</div>
                <div className="listproduct-price">${item.new_price}</div>
                <div className="listproduct-category">{item.category}</div>
                <button
                  type="button"
                  className="listproduct-remove"
                  onClick={() => removeProduct(item.id)}
                >
                  <img src={cross_icon} alt="remove" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
