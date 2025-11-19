// src/Pages/Cart.jsx
import React, { useContext } from "react";
import "./CSS/Cart.css";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    clearCart,          // ⭐ from context
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const token = localStorage.getItem("auth-token");

  // if not logged in → friendly empty message
  if (!token) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Please login to view and manage your cart.</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  // filter products that are actually in the cart
  const cartProducts = all_product.filter(
    (p) => cartItems && cartItems[p.id] > 0
  );

  const totalItems = cartProducts.reduce(
    (sum, p) => sum + (cartItems[p.id] || 0),
    0
  );

  const subtotal = getTotalCartAmount();
  const shippingFee = subtotal > 0 ? 0 : 0; // can change later
  const grandTotal = subtotal + shippingFee;

  const formattedCurrency = (amt) => `₹${amt.toFixed(2)}`;

  const handleProceedCheckout = () => {
    if (grandTotal === 0) return;
    navigate("/checkout");
  };

  const handleClearCart = () => {
    if (grandTotal === 0) return;
    const ok = window.confirm("Are you sure you want to clear the cart?");
    if (!ok) return;
    clearCart();
  };

  return (
    <section className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>
          You have <span>{totalItems}</span>{" "}
          {totalItems === 1 ? "item" : "items"} in your cart.
        </p>
      </div>

      {cartProducts.length === 0 ? (
        <div className="cart-empty-inline">
          <p>Your cart is currently empty.</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
        </div>
      ) : (
        <>
          {/* ================= TABLE ================= */}
          <div className="cart-table">
            <div className="cart-row cart-row--header">
              <div>Products</div>
              <div>Title</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
              <div>Remove</div>
            </div>

            {cartProducts.map((product) => {
              const qty = cartItems[product.id] || 0;
              const lineTotal = product.new_price * qty;

              return (
                <div key={product.id} className="cart-row">
                  {/* product image */}
                  <div className="cart-cell cart-cell-product">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="cart-product-img"
                    />
                  </div>

                  {/* title / category */}
                  <div className="cart-cell cart-cell-title">
                    <div className="cart-product-name">{product.name}</div>
                    <div className="cart-product-meta">
                      Category: {product.category}
                    </div>
                  </div>

                  {/* price */}
                  <div className="cart-cell cart-cell-price">
                    {formattedCurrency(product.new_price)}
                  </div>

                  {/* quantity controls */}
                  <div className="cart-cell cart-cell-qty">
                    <button
                      className="qty-btn"
                      onClick={() => removeFromCart(product.id)}
                    >
                      −
                    </button>
                    <span className="qty-value">{qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => addToCart(product.id)}
                    >
                      +
                    </button>
                  </div>

                  {/* line total */}
                  <div className="cart-cell cart-cell-line-total">
                    {formattedCurrency(lineTotal)}
                  </div>

                  {/* remove (X) */}
                  <div className="cart-cell cart-cell-remove">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(product.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= BOTTOM: TOTALS + PROMO ================= */}
          <div className="cart-bottom">
            {/* LEFT: Cart Totals */}
            <div className="cart-totals">
              <h2>Cart Totals</h2>

              <div className="cart-totals-row">
                <span>Subtotal</span>
                <span>{formattedCurrency(subtotal)}</span>
              </div>

              <div className="cart-totals-row">
                <span>Shipping Fee</span>
                <span>
                  {shippingFee === 0
                    ? "Free"
                    : formattedCurrency(shippingFee)}
                </span>
              </div>

              <div className="cart-totals-divider" />

              <div className="cart-totals-row cart-totals-row-total">
                <span>Total</span>
                <span>{formattedCurrency(grandTotal)}</span>
              </div>

              <div className="cart-buttons-row">
                <button
                  className="cart-clear-btn"
                  onClick={handleClearCart}
                  disabled={grandTotal === 0}
                >
                  CLEAR CART
                </button>

                <button
                  className="cart-checkout-btn"
                  onClick={handleProceedCheckout}
                  disabled={grandTotal === 0}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>

            {/* RIGHT: Promo code box */}
            <div className="cart-promo">
              <p className="promo-text">
                If you have a promo code, enter it here
              </p>
              <div className="promo-form">
                <input
                  type="text"
                  placeholder="promo code"
                  className="promo-input"
                />
                <button className="promo-submit">Submit</button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
