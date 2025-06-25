import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style-pages/CategoryFormPage.css"; 

export default function CategoryFormPage() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [deleteCat, setDeleteCat] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios.get("/api/category").then(res => setCategories(res.data));
  }, []);

  const handleCreate = async e => {
    e.preventDefault();
    await axios.post("/api/category", { name }, { withCredentials: true });
    setName("");
    const res = await axios.get("/api/category");
    setCategories(res.data);
    window.location.reload(); // <-- Esto recarga la app y actualiza el navbar
  };

  const handleDelete = async e => {
  e.preventDefault();
  setDeleteError("");
  setSuccess("");
  try {
    const cat = categories.find(c => c._id === deleteCat);
    if (!cat) {
      setDeleteError("Categoría no encontrada.");
      return;
    }
    if (window.confirm(`¿Seguro que quieres eliminar la categoría "${cat.name}"?`)) {
      await axios.delete(`/api/category/${cat._id}`, { withCredentials: true });
      setSuccess("Categoría eliminada correctamente.");
      // Vuelve a cargar las categorías desde la API:
      const res = await axios.get("/api/category");
      setCategories(res.data);
      setDeleteCat("");
      window.location.reload();
    }
  } catch (err) {
    setDeleteError("Error al eliminar la categoría.");
    console.error("Error al eliminar la categoría:", err);
  }
};

  return (
    <div className="category-form-container">
      {/* Formulario crear categoría */}
      <form onSubmit={handleCreate}>
        <h2>Crear categoría</h2>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nombre de la categoría"
          required
        />
        <button type="submit">Crear</button>
      </form>

      {/* Formulario eliminar categoría */}
      <form onSubmit={handleDelete}>
        <h2>Eliminar categoría</h2>
        <select 
          value={deleteCat}
          onChange={e => setDeleteCat(e.target.value)}
          required
        >
          <option  value="">Selecciona una categoría</option>
          {categories.map(cat => (
            <option  key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <button type="submit">
          Eliminar categoría
        </button>
        {deleteError && <p>{deleteError}</p>}
        {success && <p>{success}</p>}
      </form>
    </div>
  );
}