// src/Context/ShopContext.jsx
import React, { createContext, useEffect, useState } from "react";
import localProducts from "../Components/Assets/data";

export const ShopContext = createContext(null);

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

  // 🔐 auth-related state
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("auth-token")
  );

  // this controls our custom modal
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) products
        const prodRes = await fetch("http://localhost:4000/allproducts");
        const prodJson = await prodRes.json();
        console.log("All products from backend:", prodJson);

        if (Array.isArray(prodJson) && prodJson.length > 0) {
          setAll_Product(prodJson);
        } else {
          console.log("Backend has no products yet, using local data.js");
          setAll_Product(localProducts);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setAll_Product(localProducts);
      }

      // 2) cart for logged-in user
      const token = localStorage.getItem("auth-token");
      setIsLoggedIn(!!token);

      if (token) {
        try {
          const cartRes = await fetch("http://localhost:4000/getcart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: JSON.stringify({}),
          });
          const cartJson = await cartRes.json();
          console.log("Get cart response:", cartJson);
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

    fetchData();
  }, []);

  // 🔐 small helper you can call when login/signup succeeds
  const markLoggedIn = () => {
    setIsLoggedIn(true);
    // you could also re-fetch cart here if needed
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setIsLoggedIn(false);
    setCartItems(getDefaultCart());
  };

  // ------------- CART LOGIC --------------

  const addToCart = (itemId) => {
    // ❗️BLOCK if not logged in → show our modal instead of window.confirm
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    const token = localStorage.getItem("auth-token");
    if (!token) return;

    fetch("http://localhost:4000/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ itemId }),
    }).catch((err) => console.error("Error in /addtocart:", err));
  };

  const removeFromCart = (itemId) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));

    const token = localStorage.getItem("auth-token");
    if (!token) return;

    fetch("http://localhost:4000/removefromcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ itemId }),
    }).catch((err) => console.error("Error in /removefromcart:", err));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    if (!Array.isArray(all_product) || all_product.length === 0) return 0;

    for (const item in cartItems) {
      const qty = cartItems[item];
      if (qty > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * qty;
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) totalItem += cartItems[item];
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,

    // auth-related stuff
    isLoggedIn,
    markLoggedIn,
    logout,

    // modal controller
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
