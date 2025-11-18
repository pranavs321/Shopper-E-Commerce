// src/Components/Hero/Hero.jsx
import React from "react";
import "./Hero.css";
import heroImg from "../Assets/hero_model.png"; // your hero image

const Hero = ({ onLatestClick }) => {
  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-eyebrow">NEW ARRIVALS ONLY</p>

        <h1 className="hero-title">
          new <span>👋</span> <br />
          <span>collections</span> <br />
          for everyone
        </h1>

        <p className="hero-subtitle">
          Discover fresh styles, bold colors and everyday essentials carefully
          curated for you.
        </p>

        <button
          type="button"
          className="hero-cta"
          onClick={onLatestClick}
        >
          Latest Collection
        </button>
      </div>

      <div className="hero-right">
        <div className="hero-image-wrapper">
          <img src={heroImg} alt="New collection model" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
