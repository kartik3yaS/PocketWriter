// src/components/Header.js
import React from "react";
import "../styles/Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-logo">Pocket Writer</div>
      <div className="header-nav">
        <a href="/">Home</a>
      </div>
    </div>
  );
}

export default Header;
