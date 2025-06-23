import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";
import cors from 'cors';
import productsRoutes from "./routes/products.routes.js";
import categoriesRoutes from "./routes/category.routes.js";

const app= express();

app.use(cors({origin: 'http://localhost:5173'})); //permite peticiones desde el front
app.use(morgan('dev')); //muestra peticiones por consola
app.use(express.json()); //convierte los datos en Json por express
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/category", categoriesRoutes);
app.use("/uploads", express.static("uploads"));

export default app;

  
