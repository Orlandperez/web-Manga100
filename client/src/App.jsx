import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage  from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductFormPage from "./pages/ProductFormPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CategoryFormPage from "./pages/CategoryFormPage.jsx";
import Footer from "./components/Footer.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CartPage from "./pages/CartPage.jsx";

import "./App.css"; // Importa tu archivo CSS principal

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin/products" element={<ProductFormPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/admin/categories/new" element={<CategoryFormPage />} />
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}