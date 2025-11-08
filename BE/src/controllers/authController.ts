import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models";

export async function register(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        if (!email || !password)
        return res.status(400).json({ message: "Email and password required" });

        const existing = await User.findOne({ where: { email } });
        if (existing)
        return res.status(409).json({ message: "Email already registered" });

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, passwordHash });
        return res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: { id: user.id, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
