// src/Components/NewsLetter/NewsLetter.jsx
import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // later you can connect this to backend
  };

  return (
    <div className="newsletter">
      <div className="newsletter-inner">
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay updated.</p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email id"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
