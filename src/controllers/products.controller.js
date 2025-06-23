import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import { productSchema } from "../schemas/product.schema.js";
import fs from "fs";
import path from "path";

// Crear producto (solo admin)
export const createProduct = async (req, res) => {
  try {
    // Validar datos
    const parsed = productSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }
    const { name, price, description, images, category } = parsed.data;

    // Validar que la categoría exista
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Categoría no encontrada" });
    }

    const product = new Product({
      images,
      name,
      price,
      description,
      category,
      createdBy: req.user.id
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    // Validar datos
    const parsed = productSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }
    const { name, price, description, images, category } = parsed.data;

    // Validar que la categoría exista (si se envía)
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: "Categoría no encontrada" });
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, images, category },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    // Eliminar imágenes del disco
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        const imgPath = path.join(process.cwd(), "uploads", img);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      }
    }

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const products = await Product.find(filter).populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};