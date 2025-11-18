// src/Components/DescriptionBox/DescriptionBox.jsx
import React, { useState } from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) return;

    // For now this is only frontend – no backend
    alert("Thanks for your review! (Demo only, not saved to server.)");
    setRating(0);
    setHoverRating(0);
    setReview("");
  };

  const currentRating = hoverRating || rating;

  return (
    <section className="descbox-section">
      <div className="descbox">
        {/* Tabs */}
        <div className="descbox-tabs">
          <button
            type="button"
            className={`descbox-tab ${
              activeTab === "description" ? "descbox-tab--active" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            type="button"
            className={`descbox-tab ${
              activeTab === "reviews" ? "descbox-tab--active" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (122)
          </button>
        </div>

        {/* Content */}
        {activeTab === "description" ? (
          <div className="descbox-content">
            <h3>Product details</h3>
            <p>
              An e-commerce website is an online platform that facilitates the
              buying and selling of products or services over the internet. It
              serves as a virtual marketplace where businesses and individual
              retailers offer their products to consumers.
            </p>
            <ul>
              <li>Premium cotton-blend fabric with soft hand-feel</li>
              <li>Modern slim fit, great for day or night</li>
              <li>Machine-washable and colour-fast</li>
              <li>Easy 7-day returns and secure checkout</li>
            </ul>
          </div>
        ) : (
          <div className="descbox-reviews">
            <div className="reviews-summary">
              <h3>Customer reviews</h3>
              <div className="reviews-stars-row">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx} className="reviews-star reviews-star--filled">
                    ★
                  </span>
                ))}
                <span className="reviews-score">4.8</span>
                <span className="reviews-count">(122 ratings)</span>
              </div>
              <p className="reviews-note">
                92% of customers would recommend this product.
              </p>
            </div>

            <form className="review-form" onSubmit={handleSubmit}>
              <h4>Write a review</h4>

              <label className="review-label">Your rating</label>
              <div className="review-stars-input">
                {Array.from({ length: 5 }).map((_, idx) => {
                  const starValue = idx + 1;
                  const isFilled = starValue <= currentRating;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`review-star ${
                        isFilled ? "review-star--filled" : ""
                      }`}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </button>
                  );
                })}
              </div>

              <label className="review-label" htmlFor="review-text">
                Your review
              </label>
              <textarea
                id="review-text"
                className="review-textarea"
                rows="4"
                placeholder="Share your experience with this product..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />

              <button type="submit" className="review-submit">
                Submit review
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default DescriptionBox;
