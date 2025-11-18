// src/Pages/ShopCategory.jsx
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import menOffer from "../Components/Assets/men_offer.avif"; // banner image
import femaleOffer from '../Components/Assets/female_offer.avif';

// ----------------- Helpers & constants (outside component = no ESLint drama) -------------
const secondsToTime = (total) => {
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { hours, minutes, seconds };
};

const INITIAL_SECONDS = 12 * 60 * 60 + 20 * 60; // 12h 20m
const PAGE_SIZE = 12; // show 12 products per page

// --------------------------------- Component ---------------------------------
const ShopCategory = ({ category }) => {
  const { all_product } = useContext(ShopContext);

  const [sortOption, setSortOption] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [timeLeft, setTimeLeft] = useState(() =>
    secondsToTime(INITIAL_SECONDS)
  );

  // -------- Banner title text --------
  let categoryTitle = "All";
  if (category === "men") categoryTitle = "Men";
  else if (category === "women") categoryTitle = "Women";
  else if (category === "kid") categoryTitle = "Kids";

  // -------- Countdown timer (clean useEffect, no missing deps) --------
  useEffect(() => {
    let remaining = INITIAL_SECONDS;

    const timer = setInterval(() => {
      remaining -= 1;
      if (remaining < 0) remaining = INITIAL_SECONDS; // loop again
      setTimeLeft(secondsToTime(remaining));
    }, 1000);

    return () => clearInterval(timer);
  }, []); // INITIAL_SECONDS is module-level constant → safe

  const pad = (n) => String(n).padStart(2, "0");

  // -------- Filter + sort products --------
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(all_product)) return [];

    let products = all_product;

    if (category) {
      products = products.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === category.toLowerCase()
      );
    }

    switch (sortOption) {
      case "price_low":
        return [...products].sort(
          (a, b) => a.new_price - b.new_price
        );
      case "price_high":
        return [...products].sort(
          (a, b) => b.new_price - a.new_price
        );
      case "name_asc":
        return [...products].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      case "name_desc":
        return [...products].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      default:
        return [...products]; // featured = original order
    }
  }, [all_product, category, sortOption]);

  // -------- Pagination logic --------
  const totalProducts = filteredProducts.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalProducts / PAGE_SIZE)
  );

  // reset to first page when category or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, sortOption]);

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const showingFrom =
    totalProducts === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(
    startIndex + PAGE_SIZE,
    totalProducts
  );

  // --------------------------------- JSX ---------------------------------
  return (
    <div className="shop-category-page">
      {/* BANNER */}
      <div className="shop-category-banner">
        <div className="banner-left">
          <p className="banner-label">
            SPECIAL OFFER ON {categoryTitle.toUpperCase()}
          </p>

          <h1 className="banner-title">
            FLAT <span>50%</span> OFF
          </h1>

          <div className="banner-countdown-wrapper">
            <span className="banner-countdown-label">
              Ends in
            </span>
            <div className="banner-countdown-pill">
              <span>{pad(timeLeft.hours)}</span>:
              <span>{pad(timeLeft.minutes)}</span>:
              <span>{pad(timeLeft.seconds)}</span>
            </div>
          </div>

          <div className="banner-tags">
            <span className="banner-tag">Free Shipping</span>
            <span className="banner-tag">
              Cash on Delivery
            </span>
            <span className="banner-tag">
              Easy 7-Day Returns
            </span>
          </div>

          <button className="banner-cta">
            Explore now
          </button>
        </div>

        <div className="banner-right">
          <div className="banner-image-card">
            {category === 'men' && <img src={menOffer} alt="Men Offer" />}
            {category === 'women' && <img src={femaleOffer} alt="Women Offer" />}
          </div>
        </div>
      </div>

      {/* TOP INFO + SORT */}
      <div className="shop-category-info">
        <p className="shop-info-text">
          Showing {showingFrom}–{showingTo} out of{" "}
          {totalProducts} products
        </p>

        <div className="shop-sort">
          <label
            htmlFor="sort-select"
            className="shop-sort-label"
          >
            Sort by
          </label>
          <select
            id="sort-select"
            className="shop-sort-select"
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value)
            }
          >
            <option value="featured">Featured</option>
            <option value="price_low">
              Price: Low to High
            </option>
            <option value="price_high">
              Price: High to Low
            </option>
            <option value="name_asc">
              Name: A → Z
            </option>
            <option value="name_desc">
              Name: Z → A
            </option>
          </select>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="shop-category-grid">
        {visibleProducts.length === 0 ? (
          <p className="shop-empty-text">
            No products found in this category yet.
          </p>
        ) : (
          visibleProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        )}
      </div>

      {/* PAGE DOTS (numbers only, no Prev / Next labels) */}
      {totalPages > 1 && (
        <div className="shop-pagination">
          {Array.from(
            { length: totalPages },
            (_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`page-dot ${
                    page === safePage ? "active" : ""
                  }`}
                >
                  {page}
                </button>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
