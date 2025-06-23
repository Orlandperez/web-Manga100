import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./style-pages/LoginPage.css"; 

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // <-- Estado para el error
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); // Limpia el error anterior
    try {
      const res = await axios.post("/api/login", form, { withCredentials: true });
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError("Usuario o contraseña incorrectos."); // Mensaje de error
    }
  };

  return (
    <div className="login-conteiner">
      <h1>Bienvenido</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" required onChange={handleChange} />
        <button type="submit">Iniciar sesión</button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
}