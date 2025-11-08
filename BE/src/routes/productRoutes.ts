import { Router } from "express";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, getProducts);
router.post("/", requireAuth, requireAdmin, createProduct);
router.put("/:id", requireAuth, requireAdmin, updateProduct);
router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

export default router;
