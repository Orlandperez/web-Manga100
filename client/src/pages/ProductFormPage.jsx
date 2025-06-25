import React, { useEffect, useState } from "react";
import axios from "axios";
import CategorySelect from "../components/CategorySelect";
import { useNavigate, useParams } from "react-router-dom";
import './style-pages/ProductFormPage.css' // Asegúrate de tener este archivo CSS

export default function ProductFormPage() {
  const [form, setForm] = useState({ name: "", price: "", description: "", category: "", images: [] });
  const [deleteForm, setDeleteForm] = useState({ name: "", category: "" });
  const [deleteError, setDeleteError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Cargar producto si hay id (modo edición)
  useEffect(() => {
    if (id) {
      axios.get(`/api/products/${id}`).then(res => {
        const { name, price, description, category, images } = res.data;
        setForm({ name, price, description, category: category?._id || "", images: images || [] });
      });
    }
  }, [id]);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = e => setForm({ ...form, images: e.target.files });

  const handleSubmit = async e => {
  e.preventDefault();
  const data = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    if (key === "images") {
      for (let file of value) data.append("images", file);
    } else if (key === "price") {
      data.append("price", Number(value)); // <-- convierte a número
    } else {
      data.append(key, value);
    }
  });
    if (id) {
      await axios.put(`/api/products/${id}`, data, { withCredentials: true });
    } else {
      await axios.post("/api/products", data, { withCredentials: true });
    }
    navigate("/products");
  };

  // NUEVO: Borrar producto por nombre y categoría
  const handleDelete = async e => {
    e.preventDefault();
    setDeleteError("");
    try {
      // Buscar el producto por nombre y categoría
      const res = await axios.get("/api/products");
      const prod = res.data.find(
        p => p.name === deleteForm.name && p.category?._id === deleteForm.category
      );
      if (!prod) {
        setDeleteError("Producto no encontrado con ese nombre y categoría.");
        return;
      }
      // Confirmar y borrar
      if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
        await axios.delete(`/api/products/${prod._id}`, { withCredentials: true });
        navigate("/products");
      }
    } catch (err) {
      setDeleteError(err.response?.data?.message || JSON.stringify(err.response?.data?.errors) || "Error al crear el producto.");
    }
  };

  return (
    <section className="product-form-page">
      {/* Formulario crear/editar */}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="product-form">
        <h2>{id ? "Editar producto" : "Crear producto"}</h2>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} required />
        <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
        <CategorySelect value={form.category} onChange={cat => setForm({ ...form, category: cat })} />
        <input name="images" type="file" multiple onChange={handleFileChange} />
        <button type="submit">{id ? "Actualizar" : "Guardar"} producto</button>
      </form>

      {/* Formulario borrar */}
      <form onSubmit={handleDelete} className="delete-product-form">
        <h2>Eliminar producto</h2>
        <input
          name="name"
          placeholder="Nombre del producto"
          value={deleteForm.name}
          onChange={e => setDeleteForm({ ...deleteForm, name: e.target.value })}
          required
        />
        <CategorySelect
          value={deleteForm.category}
          onChange={cat => setDeleteForm({ ...deleteForm, category: cat })}
        />
        <button type="submit">
          Eliminar producto
        </button>
        {deleteError && <p>{deleteError}</p>}
      </form>
    </section>
  );
}