import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
} from "../controllers/cartController";

const router = Router();

router.use(requireAuth);
router.get("/", getCart);
router.post("/add", addToCart);
router.put("/:id", updateCartItem);
router.delete("/:id", removeCartItem);

export default router;
