import React from "react";
import "./style-component/ProductCard.css"
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
const { addToCart } = useCart();
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      {product.images && product.images.length > 0 ? (
        product.images.map((img, i) => (
          <img
            key={img || i}
            src={`/uploads/${img}`}
            alt={product.name}
          />
        ))
      ) : (
        <img
          src="/ruta/a/imagen-default.jpg"
          alt="Sin imagen"
        />
      )}
      <p>Precio: ${product.price}</p>
      <p>{product.description}</p>
      <p>Categoría: {product.category?.name}</p>
      <button onClick={() => addToCart(product)}>
      Agregar al carrito
      </button>
    </div>
  );
}