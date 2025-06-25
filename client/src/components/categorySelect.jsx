import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategorySelect({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/category").then(res => setCategories(res.data));
  }, []);

  return (
    <select  style={{outline: "none"}} value={value} onChange={e => onChange(e.target.value)}>
      <option  value="" >Selecciona una categoría</option>
      {categories.map(cat => (
        <option key={cat._id} value={cat._id}>{cat.name}</option>
      ))}
    </select>
  );
}