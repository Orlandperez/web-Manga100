import React from "react";
import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";


export default function NavLinks() {
  return (
    <>
      <Link to="/" className="navegacion">Home</Link>
      <CategoryDropdown/>
      <Link to="/products" className="navegacion">Productos</Link>
      <Link to="/about" className="navegacion">Nosotros</Link>
    </>
  );
}