// src/Context/ShopContext.jsx
import React, { createContext, useEffect, useState } from "react";
import localProducts from "../Components/Assets/data";

export const ShopContext = createContext(null);

const backendUrl = "http://localhost:4000";

// default cart (0..299)
const getDefaultCart = () => {
  const cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = ({ children }) => {
  const [all_product, setAll_Product] = useState(localProducts);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("auth-token")
  );
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // ---------- INITIAL LOAD ----------
  useEffect(() => {
    const fetchEverything = async () => {
      try {
        // 1) products
        const prodRes = await fetch(`${backendUrl}/allproducts`);
        const prodJson = await prodRes.json();
        console.log("All products from backend:", prodJson);

        if (Array.isArray(prodJson) && prodJson.length > 0) {
          setAll_Product(prodJson);
        } else {
          setAll_Product(localProducts);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setAll_Product(localProducts);
      }

      // 2) cart
      const token = localStorage.getItem("auth-token");
      setIsLoggedIn(!!token);

      if (token) {
        try {
          const cartRes = await fetch(`${backendUrl}/getcart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: JSON.stringify({}),
          });
          const cartJson = await cartRes.json();
          console.log("Get cart response from backend:", cartJson);

          if (cartJson && typeof cartJson === "object") {
            setCartItems(cartJson);
          } else {
            setCartItems(getDefaultCart());
          }
        } catch (err) {
          console.error("Error fetching cart:", err);
          setCartItems(getDefaultCart());
        }
      } else {
        setCartItems(getDefaultCart());
      }
    };

    fetchEverything();
  }, []);

  // ---------- AUTH ----------
  const markLoggedIn = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setIsLoggedIn(false);
    setCartItems(getDefaultCart());
  };

  // ---------- CART (SERVER IS TRUTH) ----------
  const addToCart = async (itemId) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    try {
      const res = await fetch(`${backendUrl}/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ itemId }),
      });
      const data = await res.json();
      console.log("addtocart response:", data);

      if (data && data.cartData) {
        setCartItems(data.cartData); // ⭐ exact same as DB
      }
    } catch (err) {
      console.error("Error in /addtocart:", err);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    try {
      const res = await fetch(`${backendUrl}/removefromcart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ itemId }),
      });
      const data = await res.json();
      console.log("removefromcart response:", data);

      if (data && data.cartData) {
        setCartItems(data.cartData);
      }
    } catch (err) {
      console.error("Error in /removefromcart:", err);
    }
  };

  const clearCart = async () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    try {
      const res = await fetch(`${backendUrl}/clearcart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      console.log("clearcart response:", data);

      if (data && data.cartData) {
        setCartItems(data.cartData);
      } else {
        setCartItems(getDefaultCart());
      }
    } catch (err) {
      console.error("Error in /clearcart:", err);
      setCartItems(getDefaultCart());
    }
  };

  // ---------- TOTALS (only count valid product IDs) ----------
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    if (!Array.isArray(all_product) || all_product.length === 0) return 0;

    const validIds = new Set(all_product.map((p) => Number(p.id)));

    for (const item in cartItems) {
      const qty = cartItems[item];
      const numericId = Number(item);

      if (qty > 0 && validIds.has(numericId)) {
        const itemInfo = all_product.find((p) => p.id === numericId);
        if (itemInfo) {
          totalAmount += itemInfo.new_price * qty;
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    if (!Array.isArray(all_product) || all_product.length === 0) {
      let rawTotal = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) rawTotal += cartItems[item];
      }
      return rawTotal;
    }

    const validIds = new Set(all_product.map((p) => Number(p.id)));
    let totalItem = 0;

    for (const item in cartItems) {
      const qty = cartItems[item];
      const numericId = Number(item);

      if (qty > 0 && validIds.has(numericId)) {
        totalItem += qty;
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    getTotalCartItems,
    isLoggedIn,
    markLoggedIn,
    logout,
    showLoginPrompt,
    setShowLoginPrompt,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
