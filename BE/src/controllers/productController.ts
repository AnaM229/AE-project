import { Request, Response } from "express";
import { Product } from "../models";

// GET /products 
export async function getProducts(_req: Request, res: Response) {
    const products = await Product.findAll({ order: [["id", "ASC"]] });
    res.json(products);
}

// POST /products – create
export async function createProduct(req: Request, res: Response) {
    const { title, price, stock, currency } = req.body;
    if (!title || !price) return res.status(400).json({ message: "Missing fields" });

    const product = await Product.create({ title, price, stock, currency });
    res.status(201).json(product);
}

// PUT /products/:id – update
export async function updateProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.update(req.body);
    res.json(product);
}

// DELETE /products/:id – delete
export async function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  await product.destroy();
  res.status(204).send();
}
