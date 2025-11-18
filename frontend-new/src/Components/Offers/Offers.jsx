import React from "react";
import "./Offers.css";
import offerImg from "../Assets/offer_model.jpg"; // ⬅️ change to your actual image file

const Offers = () => {
  const handleClick = () => {
    // example: scroll to top or to /mens page etc.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="offers">
      <div className="offers-left">
        <p className="offers-eyebrow">LIMITED TIME DEAL</p>

        <h2 className="offers-title">
          Exclusive <span>Offers</span> For You
        </h2>

        <p className="offers-subtitle">
          Only on best-selling products across Women, Men and Kids collections.
        </p>

        <div className="offers-perks">
          <span>Up to 60% OFF</span>
          <span>Free shipping over $50</span>
          <span>7-day easy returns</span>
        </div>

        <button className="offers-cta" onClick={handleClick}>
          Check now
        </button>
      </div>

      <div className="offers-right">
        <div className="offers-image-wrapper">
          <img src={offerImg} alt="Exclusive offers" />
        </div>
      </div>
    </section>
  );
};

export default Offers;
