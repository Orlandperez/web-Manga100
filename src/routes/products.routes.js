import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/products.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { upload } from "../middlewares/uploadImages.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post(
  "/",
  authRequired,
  isAdmin,
  upload.array("images", 5),
  (req, res, next) => {
    req.body.images = req.files ? req.files.map(file => file.filename) : [];
    next();
  },
  createProduct
);

router.put(
  "/:id",
  authRequired,
  isAdmin,
  upload.array("images", 5),
  (req, res, next) => {
    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map(file => file.filename);
    }
    next();
  },
  updateProduct
);

router.delete("/:id", authRequired, isAdmin, deleteProduct);

export default router;