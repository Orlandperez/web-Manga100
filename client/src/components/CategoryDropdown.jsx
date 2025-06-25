import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CategoryDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

 useEffect(() => {
    axios.get("/api/category").then(res => setCategories(res.data));
  }, []);

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleCategoryClick = (catId) => {
    setDropdownOpen(false);
    navigate(`/products?category=${catId}`);
  };

  return (
    <div
      className="dropdown"
      ref={dropdownRef}
      onClick={() => setDropdownOpen((open) => !open)}
    >
      <span className="dropdown-title">Categorías</span>
      {dropdownOpen && (
        <div className="dropdown-menu">
          {categories.map(cat => (
            <div
              key={cat._id}
              className="dropdown-item"
              onClick={e => {
                e.stopPropagation();
                handleCategoryClick(cat._id);
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}