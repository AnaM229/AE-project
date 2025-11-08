import { Response } from "express";
import { CartItem, Product } from "../models";
import { AuthRequest } from "../middleware/auth";

// GET /cart
export async function getCart(req: AuthRequest, res: Response) {
    const items = await CartItem.findAll({
        where: { UserId: req.user!.id },
        include: [Product]
    });
    res.json(items);
}

// POST /cart/add – create
export async function addToCart(req: AuthRequest, res: Response) {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existing = await CartItem.findOne({
        where: { UserId: req.user!.id, ProductId: productId }
    });

    if (existing) {
        existing.quantity += quantity;
        await existing.save();
        return res.json(existing);
    }

    const item = await CartItem.create({
        UserId: req.user!.id,
        ProductId: productId,
        quantity
    });

    res.status(201).json(item);
}

// PUT /cart/:id – update
export async function updateCartItem(req: AuthRequest, res: Response) {
    const id = Number(req.params.id);
    const { quantity } = req.body;

    const item = await CartItem.findByPk(id);
    if (!item || item.UserId !== req.user!.id)
        return res.status(404).json({ message: "Cart item not found" });

    item.quantity = quantity;
    await item.save();
    res.json(item);
}

// DELETE /cart/:id – delete
export async function removeCartItem(req: AuthRequest, res: Response) {
    const id = Number(req.params.id);
    const item = await CartItem.findByPk(id);
    if (!item || item.UserId !== req.user!.id)
        return res.status(404).json({ message: "Cart item not found" });

    await item.destroy();
    res.status(204).send();
}
