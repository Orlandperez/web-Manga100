import React from "react";
import { useCart } from "../context/CartContext";
import "./style-pages/CartPage.css";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calcular el total
  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleCheckout = () => {
    clearCart();
    alert("Productos comprados");
  };

  return (
    <div className="cartPage">
      <h1>Carrito de compras</h1>
      {cart.length === 0 ? (
        <div className="empty-cart" style={{height: "70vh"}}>
          <p>El carrito está vacío.</p>
        </div>
        
      ) : (
        <>
          <div className="cartPage-container">
            <div className="cartPage-all">
              {cart.map((item, id) => (
                <div key={id} className="cart-item">
                  {item.images && item.images.length > 0 && (
                    <img
                      src={`/uploads/${item.images[0]}`}
                      alt={item.name}
                      className="cart-img"
                    />
                  )}
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Precio: ${item.price}</p>
                    <p>{item.description}</p>
                    <p>Categoría: {item.category?.name}</p>
                    <button
                      onClick={() => removeFromCart(id)}
                      className="remove-btn"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total-section">
            <h2>Resumen de tu compra</h2>
            <h3>Total: ${total}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>Finalizar compra</button>
            </div>
          </div>
          
        </>
      )}
    </div>
  );
}

export default CartPage;