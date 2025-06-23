import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", authRequired, isAdmin, createCategory);
router.put("/:id", authRequired, isAdmin, updateCategory);
router.delete("/:id", authRequired, isAdmin, deleteCategory);

export default router;