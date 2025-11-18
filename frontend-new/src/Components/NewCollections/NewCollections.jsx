// src/Components/NewCollections/NewCollections.jsx
import React from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
import men7 from "../Assets/men7.avif";
import women11 from "../Assets/women11.avif";
import women15 from "../Assets/women15.webp";
import kid12 from "../Assets/kid12.avif";

const newCollectionsData = [
  {
    id: 7,
    name: "Printed Half Sleeve Shirt",
    image: men7,
    new_price: 48,
    old_price: 89,
  },
  {
    id: 24,
    name: "Dark Yellow Short Jacket",
    image: women11,
    new_price: 75,
    old_price: 120,
  },
  {
    id: 27,
    name: "Light Blue Suit",
    image: women15,
    new_price: 40,
    old_price: 70,
  },
  {
    id: 39,
    name: "Striped Frock",
    image: kid12,
    new_price: 44,
    old_price: 75,
  },
];

const NewCollections = () => {
  return (
    <section
      id="section-new-collections"       // 🔹 IMPORTANT: scroll target
      className="new-collections"
    >
      <div className="new-collections-header">
        <h2>NEW COLLECTIONS</h2>
        <div className="new-collections-underline" />
      </div>

      <div className="new-collections-grid">
        {newCollectionsData.map((item) => (
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

export default NewCollections;
