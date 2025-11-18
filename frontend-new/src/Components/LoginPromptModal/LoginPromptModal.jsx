import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPromptModal.css";
import { ShopContext } from "../../Context/ShopContext";

const LoginPromptModal = () => {
  const { showLoginPrompt, setShowLoginPrompt } = useContext(ShopContext);
  const navigate = useNavigate();

  if (!showLoginPrompt) return null; // nothing to show

  const handleClose = () => setShowLoginPrompt(false);

  const goToLogin = () => {
    setShowLoginPrompt(false);
    navigate("/login");
  };

  return (
    <div className="login-modal-backdrop">
      <div className="login-modal">
        <div className="login-modal-header">
          <span className="login-modal-title">Login required</span>
          <button className="login-modal-close" onClick={handleClose}>
            ×
          </button>
        </div>

        <p className="login-modal-text">
          You need to be logged in to add items to your cart and save them to
          your account.
        </p>

        <div className="login-modal-actions">
          <button
            type="button"
            className="login-modal-btn login-modal-btn--secondary"
            onClick={handleClose}
          >
            Not now
          </button>
          <button
            type="button"
            className="login-modal-btn login-modal-btn--primary"
            onClick={goToLogin}
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
