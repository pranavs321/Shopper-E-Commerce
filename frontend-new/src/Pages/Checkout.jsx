// src/Pages/Checkout.jsx
import React, { useContext, useState } from "react";
import "./CSS/Checkout.css";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { all_product, cartItems, getTotalCartAmount } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("auth-token");

  // if not logged in, send to login
  if (!token) {
    navigate("/login");
  }

  // products in cart
  const cartProducts = all_product.filter(
    (p) => cartItems && cartItems[p.id] > 0
  );

  const subtotal = getTotalCartAmount();
  const shippingFee = subtotal > 0 ? 0 : 0;
  const grandTotal = subtotal + shippingFee;

  const formatCurrency = (amt) => `₹${amt.toFixed(2)}`;

  // simple address form
  const [address, setAddress] = useState({
    fullName: "",
    line1: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (grandTotal === 0) return;

    try {
      await fetch("http://localhost:4000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ address }),
      });

      
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Network error while placing order");
    }
  };

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        {/* LEFT: shipping form */}
        <div className="checkout-left">
          <h1>Checkout</h1>
          <p className="checkout-subtitle">
            Enter your shipping details to complete your order.
          </p>

          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <label>
              Full Name
              <input
                type="text"
                name="fullName"
                value={address.fullName}
                onChange={changeHandler}
                required
              />
            </label>

            <label>
              Address
              <input
                type="text"
                name="line1"
                value={address.line1}
                onChange={changeHandler}
                required
              />
            </label>

            <div className="checkout-grid">
              <label>
                City
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={changeHandler}
                  required
                />
              </label>

              <label>
                Pincode
                <input
                  type="text"
                  name="pincode"
                  value={address.pincode}
                  onChange={changeHandler}
                  required
                />
              </label>
            </div>

            <label>
              Phone
              <input
                type="tel"
                name="phone"
                value={address.phone}
                onChange={changeHandler}
                required
              />
            </label>

            <button
              type="submit"
              className="checkout-place-btn"
              disabled={grandTotal === 0}
            >
              Place Order
            </button>
          </form>
        </div>

        {/* RIGHT: order summary */}
        <div className="checkout-right">
          <h2>Order Summary</h2>

          <div className="checkout-items">
            {cartProducts.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              cartProducts.map((p) => (
                <div key={p.id} className="checkout-item-row">
                  <div className="checkout-item-info">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="checkout-item-img"
                    />
                    <div>
                      <div className="checkout-item-name">{p.name}</div>
                      <div className="checkout-item-meta">
                        Qty: {cartItems[p.id]} •{" "}
                        {formatCurrency(p.new_price)}
                      </div>
                    </div>
                  </div>
                  <div className="checkout-item-total">
                    {formatCurrency(p.new_price * cartItems[p.id])}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="checkout-totals">
            <div className="checkout-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="checkout-row">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? "Free" : formatCurrency(shippingFee)}</span>
            </div>
            <div className="checkout-divider" />
            <div className="checkout-row checkout-row-total">
              <span>Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
