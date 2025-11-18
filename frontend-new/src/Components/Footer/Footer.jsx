// src/Components/Footer/Footer.jsx
import React from "react";
import "./Footer.css";

import logo from "../Assets/shoplogo-removebg-preview.png"; // 👜 your PNG logo
import fbIcon from "../Assets/facebook.png";
import instaIcon from "../Assets/instagram.png";
import twitterIcon from "../Assets/twitter.png";

const Footer = () => (
  <footer className="footer">
    {/* LOGO + TITLE */}
    <div className="footer-logo">
      <img
        src={logo}
        alt="Shopper logo"
        className="footer-logo-img"
      />
      <span className="footer-title">SHOPPER</span>
    </div>

    {/* LINKS */}
    <ul className="footer-links">
      <li>Company</li>
      <li>Products</li>
      <li>Offices</li>
      <li>About</li>
      <li>Contact</li>
    </ul>

    {/* SOCIAL ICONS */}
    <div className="footer-social">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={fbIcon} alt="Facebook" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={instaIcon} alt="Instagram" />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={twitterIcon} alt="Twitter" />
      </a>
    </div>

    {/* COPYRIGHT */}
    <div className="footer-copyright">
      &copy; {new Date().getFullYear()} SHOPPER. All Rights Reserved.
    </div>
  </footer>
);

export default Footer;
