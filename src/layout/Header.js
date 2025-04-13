import React, { useEffect, useState } from "react";
import logo from "../assets/images/Flow.png";
import { Menu } from "lucide-react";
import "../assets/css/styles.css";
import { Link, useLocation } from "react-router-dom";
import { router } from "../constants/router";

export default function Header() {
  const location = useLocation();
  const pageNames = router.find((item) => item.url === location.pathname);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="header">
        <button className="menu-button" onClick={toggleMenu}>
          <Menu size={24} />
        </button>
        <h1 className="title">{pageNames?.name ? pageNames.name : ""}</h1>
        <img className="logo" src={logo} />
      </header>
      {menuOpen && (
        <div className="menu">
          <div className="menu__close" onClick={toggleMenu}>
            ✕
          </div>
          <div className="menu__items">
            {router.map((item) => (
              <Link to={item.url} style={{ textDecoration: "none" }}>
                <div className="menu__item">
                  <p>{item.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="menu__logout">
            <span>←</span>
            <span>יציאה</span>
          </div>
        </div>
      )}
    </>
  );
}
