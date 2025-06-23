import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/category").then(res => setCategories(res.data));
  }, []);

  return (
    <div>
      <h2>Categorías</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat._id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}