// src/Pages/LoginSignup.jsx
import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  // "signup" or "login"
  const [mode, setMode] = useState("signup");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const isSignup = mode === "signup";

  // ---------------- handlers ----------------
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      mode === "signup"
        ? "http://localhost:4000/signup"
        : "http://localhost:4000/login";

    // body for signup vs login
    const body =
      mode === "signup"
        ? {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

    try {
      console.log("➡️ Sending", mode, "request:", body);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log("HTTP status:", res.status);

      const responseData = await res.json();
      console.log(
        mode === "signup" ? "Signup response:" : "Login response:",
        responseData
      );

      if (responseData.success) {
        // save token like in tutorial
        if (responseData.token) {
          localStorage.setItem("auth-token", responseData.token);
          console.log("✅ Saved auth-token:", responseData.token);
        }
        // go to homepage
        window.location.replace("/");
      } else {
        alert(responseData.errors || "Something went wrong");
      }
    } catch (err) {
      console.error("❌ Request failed:", err);
      alert("Network error – check backend (port 4000) is running.");
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            {isSignup && (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={changeHandler}
                placeholder="Your Name"
                className="login-input"
                required
              />
            )}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              placeholder="Email Address"
              className="login-input"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Password"
              className="login-input"
              required
            />

            <button type="submit" className="login-button">
              Continue
            </button>

            <div className="login-toggle">
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <span onClick={() => setMode("login")}>Login here</span>
                </>
              ) : (
                <>
                  New here?{" "}
                  <span onClick={() => setMode("signup")}>
                    Create an account
                  </span>
                </>
              )}
            </div>

            {isSignup && (
              <label className="login-check">
                <input type="checkbox" required />
                <span>
                  By continuing, I agree to the terms of use &amp; privacy
                  policy.
                </span>
              </label>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
