import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";

export default function UserMenu() {
  const { user, logout, setUser } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (window.confirm("¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      try {
        await axios.delete("/api/users/me", { withCredentials: true });
        setUser(null);
        logout();
        navigate("/");
      } catch (err) {
        alert("Error al eliminar la cuenta.");
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
        <div className="user-dropdown">
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
                      setProfileOpen(false); // <-- Cierra el menú
                    }}
                  >
                    Publicar producto
                  </button>
                  <button
                    onClick={() => {
                      navigate("/admin/categories/new");
                      setProfileOpen(false); // <-- Cierra el menú
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
        <span className="cart-count">0</span>
      </Link>
    </div>
  );
}