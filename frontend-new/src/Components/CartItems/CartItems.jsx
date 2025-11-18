import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";

const CartItems = () => {
  const {
    all_product,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(ShopContext);

  const totalAmount = getTotalCartAmount();

  return (
    <div className="cartitems">
      {/* HEADER ROW */}
      <div className="cartitems-format cartitems-header">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {/* CART LINES */}
      {all_product.map((product) => {
        const qty = cartItems[product.id] || 0;
        if (qty <= 0) return null;

        return (
          <div
            className="cartitems-format cartitems-row"
            key={product.id}
          >
            <img
              src={product.image}
              alt={product.name}
              className="cartitems-product-icon"
            />
            <p className="cartitems-title">{product.name}</p>
            <p>${product.new_price}</p>

            <div className="cartitems-quantity-box">
              <input
                type="number"
                readOnly
                value={qty}
              />
            </div>

            <p>${product.new_price * qty}</p>

            <span
              className="cartitems-remove-icon"
              onClick={() => removeFromCart(product.id)}
            >
              ×
            </span>
          </div>
        );
      })}

      {/* BOTTOM SECTION: TOTALS + PROMO */}
      <div className="cartitems-bottom">
        <div className="cartitems-total">
          <h3>Cart totals</h3>

          <div className="cartitems-total-row">
            <span>Subtotal</span>
            <span>${totalAmount}</span>
          </div>

          <div className="cartitems-total-row">
            <span>Shipping Fee</span>
            <span>Free</span>
          </div>

          <hr />

          <div className="cartitems-total-row cartitems-total-final">
            <span>Total</span>
            <span>${totalAmount}</span>
          </div>

          <button className="cartitems-checkout-btn">
            Proceed to checkout
          </button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
