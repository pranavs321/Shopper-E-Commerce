// src/Pages/Shop.jsx
import React, { useRef } from "react";
import "./CSS/Shop.css";

import Hero from "../Components/Hero/Hero";
import NewCollections from "../Components/NewCollections/NewCollections";
import Popular from "../Components/Popular/Popular";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import Offers from "../Components/Offers/Offers";

const Shop = () => {
  // for "Latest Collections" scroll
  const newCollectionsRef = useRef(null);

  const scrollToNewCollections = () => {
    if (newCollectionsRef.current) {
      newCollectionsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="shop-page">
      {/* Hero with Explore button */}
      <Hero onExploreClick={scrollToNewCollections} />

      {/* Latest collections */}
      <section ref={newCollectionsRef}>
        <NewCollections />
      </section>

      {/* 🔥 Exclusive Offers block (the one you just wrote) */}
      <Offers />

      {/* Popular in Women */}
      <Popular />

      {/* Newsletter: Get Exclusive Offers on Email */}
      <NewsLetter />
    </div>
  );
};

export default Shop;
