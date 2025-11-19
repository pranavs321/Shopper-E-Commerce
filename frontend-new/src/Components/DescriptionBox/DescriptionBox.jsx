// src/Components/DescriptionBox/DescriptionBox.jsx
import React, { useContext, useEffect, useState } from "react";
import "./DescriptionBox.css";
import { ShopContext } from "../../Context/ShopContext";
import localProducts from "../Assets/data";   // 👈 NEW

const backendUrl = "http://localhost:4000";

const DescriptionBox = ({ productId }) => {
  const [activeTab, setActiveTab] = useState("description");

  // form state
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // reviews from backend
  const [reviewsData, setReviewsData] = useState({
    averageRating: 0,
    count: 0,
    reviews: [],
  });

  const { isLoggedIn, setShowLoginPrompt } = useContext(ShopContext);

  const currentRating = hoverRating || rating;

  // 🔹 FIND PRODUCT META FROM data.js USING productId
  const productMeta = localProducts.find(
    (p) => p.id === Number(productId)
  );

  const descriptionText =
    productMeta?.description ||
    "This product is part of our latest collection, designed to balance comfort, style and everyday usability.";

  // optional generic bullet points (same for all)
  const genericBullets = [
    "Designed for all-day comfort and style",
    "Made with quality materials suitable for daily wear",
    "Easy to pair with multiple outfits in your wardrobe",
    "Covered by our standard returns and support policy",
  ];

  // ------- fetch reviews from backend -------
  useEffect(() => {
    if (!productId) return;

    const fetchReviews = async () => {
      try {
        const res = await fetch(`${backendUrl}/products/${productId}/reviews`);
        const data = await res.json();
        if (data.success) {
          setReviewsData({
            averageRating: data.averageRating || 0,
            count: data.count || 0,
            reviews: data.reviews || [],
          });
        } else {
          console.warn("Get reviews failed:", data.message);
        }
      } catch (err) {
        console.error("Fetch reviews error:", err);
      }
    };

    fetchReviews();
  }, [productId]);

  // ------- submit review to backend -------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) return;

    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    const token = localStorage.getItem("auth-token");
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${backendUrl}/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ rating, comment: review }),
      });

      const data = await res.json();
      if (!data.success) {
        alert(data.message || "Failed to submit review");
      } else {
        // clear form and refresh list
        setReview("");
        setRating(5);
        setHoverRating(0);

        const res2 = await fetch(
          `${backendUrl}/products/${productId}/reviews`
        );
        const data2 = await res2.json();
        if (data2.success) {
          setReviewsData({
            averageRating: data2.averageRating || 0,
            count: data2.count || 0,
            reviews: data2.reviews || [],
          });
        }
      }
    } catch (err) {
      console.error("Submit review error:", err);
      alert("Network error while submitting review");
    } finally {
      setSubmitting(false);
    }
  };

  const avg = reviewsData.averageRating || 0;
  const count = reviewsData.count || 0;

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
            Reviews{count > 0 ? ` (${count})` : ""}
          </button>
        </div>

        {/* Content */}
        {activeTab === "description" ? (
          <div className="descbox-content">
            <h3>Product details</h3>

            {/* 🔥 UNIQUE DESCRIPTION PER PRODUCT */}
            <p>{descriptionText}</p>

            <ul>
              {genericBullets.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="descbox-reviews">
            {/* LEFT: summary + reviews list */}
            <div>
              <h3>Customer reviews</h3>
              <div className="reviews-stars-row">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`reviews-star ${
                      idx < Math.round(avg) ? "reviews-star--filled" : ""
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="reviews-score">
                  {avg.toFixed(1)} / 5
                </span>
                <span className="reviews-count">
                  ({count} {count === 1 ? "review" : "reviews"})
                </span>
              </div>
              <p className="reviews-note">
                {count === 0
                  ? "No reviews yet. Be the first to review this product."
                  : "Here’s what other customers think about this product."}
              </p>

              <div className="reviews-list">
                {reviewsData.reviews.map((r) => (
                  <div key={r._id} className="review-item">
                    <div className="review-item-header">
                      <div className="review-item-stars">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <span
                            key={idx}
                            className={`reviews-star ${
                              idx < r.rating ? "reviews-star--filled" : ""
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="review-item-date">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {r.comment && (
                      <p className="review-item-comment">{r.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: form */}
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

              <button type="submit" className="review-submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit review"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default DescriptionBox;
