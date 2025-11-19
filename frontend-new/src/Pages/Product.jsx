// src/Pages/Product.jsx
import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { ShopContext } from "../Context/ShopContext";

import Breadcrum from "../Components/Breadcrums/Breadcrums";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  const product = all_product.find(
    (p) =>
      String(p.id) === String(productId) ||
      String(p._id || "") === String(productId)
  );

  if (!product) {
    return <div style={{ padding: "40px" }}>Product not found.</div>;
  }

  return (
    <>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />

      {/* 🔹 pass productId to DescriptionBox */}
      <DescriptionBox productId={product.id} />

      <RelatedProducts currentProduct={product} />
    </>
  );
};

export default Product;
