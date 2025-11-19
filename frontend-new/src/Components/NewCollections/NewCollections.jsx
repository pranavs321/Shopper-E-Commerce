// src/Components/NewCollections/NewCollections.jsx
import React, { useContext, useMemo } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const FEATURED_IDS = [7, 24, 27, 39]; // the ones you want as "New Collections"

const NewCollections = () => {
  const { all_product } = useContext(ShopContext);

  // pick from backend products using these ids
  const newCollection = useMemo(() => {
    if (!Array.isArray(all_product)) return [];
    return all_product.filter((p) => FEATURED_IDS.includes(p.id));
  }, [all_product]);

  return (
    <section
      id="section-new-collections"  // scroll target if you need smooth scroll
      className="new-collections"
    >
      <div className="new-collections-header">
        <h2>NEW COLLECTIONS</h2>
        <div className="new-collections-underline" />
      </div>

      <div className="new-collections-grid">
        {newCollection.map((item) => (
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
