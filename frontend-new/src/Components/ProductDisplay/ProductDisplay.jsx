// src/Components/ProductDisplay/ProductDisplay.jsx
import React, { useContext, useEffect, useState } from "react";
import "./ProductDisplay.css";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  // ---- safe fallback image array (even if product is undefined) ----
  const mainImg = product?.image || "";
  const galleryImages = [mainImg, mainImg, mainImg, mainImg];

  const [activeImg, setActiveImg] = useState(galleryImages[0]);
  const [selectedSize, setSelectedSize] = useState("M");

  // when product changes (different id), reset main image + size
  useEffect(() => {
    setActiveImg(mainImg);
    setSelectedSize("M");
  }, [mainImg]);

  if (!product) {
    return (
      <section className="productdisplay-section">
        <div className="productdisplay-empty">
          <p>Product not found.</p>
        </div>
      </section>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  return (
    <section className="productdisplay-section">
      <div className="productdisplay">
        {/* LEFT: IMAGE GALLERY */}
        <div className="productdisplay-left">
          <div className="productdisplay-thumbs">
            {galleryImages.map((img, idx) => (
              <button
                type="button"
                key={idx}
                className={`thumb ${activeImg === img ? "thumb--active" : ""}`}
                onClick={() => setActiveImg(img)}
              >
                <img src={img} alt={`${product.name} ${idx + 1}`} />
              </button>
            ))}
          </div>

          <div className="productdisplay-main">
            <img src={activeImg} alt={product.name} />
          </div>
        </div>

        {/* RIGHT: TEXT + ACTIONS */}
        <div className="productdisplay-right">
          <p className="productdisplay-subtitle">
            PREMIUM MENSWEAR • NEW SEASON DROP
          </p>
          <h1 className="productdisplay-title">{product.name}</h1>

          {/* Rating row (static 4.8 for now) */}
          <div className="productdisplay-rating">
            {Array.from({ length: 5 }).map((_, idx) => (
              <span key={idx} className="rating-star">
                ★
              </span>
            ))}
            <span className="rating-score">4.8</span>
            <span className="rating-count">(122 reviews)</span>
          </div>

          {/* Prices */}
          <div className="productdisplay-prices">
            <span className="price-new">${product.new_price}</span>
            <span className="price-old">${product.old_price}</span>
            <span className="price-badge">Save 43%</span>
          </div>

          {/* Short description */}
          <p className="productdisplay-description">
            A lightweight cotton-blend fabric with a soft nap on one side and a
            clean drape. Perfect for day-to-night styling with a modern,
            tailored fit and premium finish.
          </p>

          {/* Small advantage pills */}
          <div className="productdisplay-perks">
            <span className="perk-pill perk-pill--green">In stock</span>
            <span className="perk-pill">Free shipping over $50</span>
            <span className="perk-pill">7-day easy returns</span>
          </div>

          {/* Size selector */}
          <div className="productdisplay-size">
            <div className="size-header">
              <h3>Select size</h3>
              <button className="size-guide-btn" type="button">
                Size guide
              </button>
            </div>
            <div className="size-options">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-pill ${
                    selectedSize === size ? "size-pill--active" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="productdisplay-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
            <button type="button" className="btn-secondary">
              ♡ Wishlist
            </button>
          </div>

          {/* Meta info */}
          <div className="productdisplay-meta">
            <p>
              <span>Category: </span>
              {product.category || "Men"}, T-Shirt, Top
            </p>
            <p>
              <span>Tags: </span>Modern, Latest
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
