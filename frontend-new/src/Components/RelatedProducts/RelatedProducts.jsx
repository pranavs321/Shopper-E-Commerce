// src/Components/RelatedProducts/RelatedProducts.jsx
import React, { useContext, useMemo } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const RelatedProducts = ({ category, currentId }) => {
  const { all_product } = useContext(ShopContext);

  // pick related items: same category, not the current product
  const related = useMemo(() => {
    if (!Array.isArray(all_product)) return [];
    return all_product
      .filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === category?.toLowerCase() &&
          p.id !== currentId
      )
      .slice(0, 4); // show max 4
  }, [all_product, category, currentId]);

  if (!related.length) return null; // nothing to show

  return (
    <section className="related">
      <h2 className="related-title">Related Products</h2>
      <div className="related-underline" />

      <div className="related-grid">
        {related.map((item) => (
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

export default RelatedProducts;
