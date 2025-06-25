import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function UserMenu() {
  const { user, logout, setUser } = useAuth();
  const { cart } = useCart();
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Cierra el menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  const handleDeleteAccount = async () => {
    if (window.confirm("¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      try {
        await axios.delete("/api/users/me", { withCredentials: true });
        setUser(null);
        logout();
        navigate("/");
      } catch (err) {
        alert("Error al eliminar la cuenta.");
        console.error("Error al eliminar la cuenta:", err);
      }
    }
  };

  return (
    <div className="auth-links">
      {!user ? (
        <>
          <Link to="/login" className="Links">Login</Link>
          <Link to="/register" className="Links">Registro</Link>
        </>
      ) : (
        <div className="user-dropdown" ref={profileRef}>
          <span className="Links" onClick={() => setProfileOpen((open) => !open)}>
            <p>Hola! {user.username}</p>
          </span>
          {profileOpen && (
            <div className="profile-menu">
              <p><b>Nombre:</b> {user.username}</p>
              <p><b>Email:</b> {user.email}</p>
              <p> <b>{user.role}</b> </p>
              {/* SOLO PARA ADMIN */}
              {user.role === "admin" && (
                <>
                  <button
                    onClick={() => {
                      navigate("/admin/products");
                      setProfileOpen(false);
                    }}
                  >
                    Publicar producto
                  </button>
                  <button
                    onClick={() => {
                      navigate("/admin/categories/new");
                      setProfileOpen(false);
                    }}
                  >
                    Crear categoría
                  </button>
                </>
              )}
              <button className="color" onClick={logout}>Cerrar sesión</button>
              <button className="color" onClick={handleDeleteAccount}>Eliminar cuenta</button>
            </div>
          )}
        </div>
      )}
      <Link to="/cart" className="Links">
        <i className="bi bi-cart"></i>
        <span className="cart-count">{cart.length}</span>
      </Link>
    </div>
  );
}