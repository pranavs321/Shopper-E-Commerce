// src/Components/Popular/Popular.jsx
import React from "react";
import "./Popular.css";
import Item from "../Item/Item";

// import the 4 women images
import women12 from "../Assets/women12.avif";
import women9 from "../Assets/women9.avif";
import women8 from "../Assets/women8.avif";
import women6 from "../Assets/women6.avif";

const popularWomenProducts = [
  {
    id: 24,
    name: "Dark Yellow Short Jacket",
    image: women12,
    new_price: 75,
    old_price: 120,
    category: "women",
    description:
      "Short, lightweight jacket in deep yellow shade, perfect for fall days.",
  },
  {
    id: 21,
    name: "Pink Hoodie",
    image: women9,
    new_price: 60,
    old_price: 115,
    category: "women",
    description:
      "Cozy pink hoodie to elevate your casual and sporty looks.",
  },
  {
    id: 20,
    name: "Multicolor Striped Shirt Full Sleeve",
    image: women8,
    new_price: 48,
    old_price: 87,
    category: "women",
    description:
      "Full sleeve shirt featuring colorful stripes, perfect for casual or workwear.",
  },
  {
    id: 18,
    name: "Fluorescent Full Sleeve Colorless T-Shirt",
    image: women6,
    new_price: 39,
    old_price: 75,
    category: "women",
    description:
      "Bright neon full sleeve t-shirt with a sleek transparent look.",
  },
];

const Popular = () => {
  return (
    <section className="popular">
      <div className="popular-header">
        <h2>Popular in Women</h2>
        <div className="popular-underline" />
      </div>

      <div className="popular-item">
        {popularWomenProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </section>
  );
};

export default Popular;
