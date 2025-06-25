import React, { useState } from "react";
import './style-component/Navbar.css';
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="bi bi-list"></i>
      </div>
      <Logo />
      <nav className={menuOpen ? "event-menu" : ""}>
        <NavLinks />
      </nav>
      <UserMenu />
    </header>
  );
}