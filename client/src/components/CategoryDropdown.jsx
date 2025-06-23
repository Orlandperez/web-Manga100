import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CategoryDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/category").then(res => setCategories(res.data));
  }, []);

  const handleCategoryClick = (catId) => {
    setDropdownOpen(false);
    navigate(`/products?category=${catId}`);
  };

  return (
    <div
      className="dropdown"
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