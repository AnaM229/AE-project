import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
} from "../controllers/cartController";

const router = Router();

router.use(requireAuth);
router.get("/", getCart);
router.post("/add", addToCart);
router.put("/:id", updateCartItem);
router.delete("/:id", removeCartItem);
router.delete("/", clearCart);

export default router;
