import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import "./style-pages/ProductsPage.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [search, setSearch] = useState("");

const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    let url = "/api/products";
    if (category) url += `?category=${category}`;
    axios.get(url).then(res => setProducts(res.data));
  }, [location.search]);

  return (
    <div className="products-page">
      <div className="products-container">
        <h1>Productos</h1>
        <p>Encuentra los mejores productos aquí</p>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        
      </div>
      <div className="products-list">
        {filteredProducts.map(prod => (
          <ProductCard key={prod._id} product={prod} />
        ))}
      </div>
    </div>
  );
}