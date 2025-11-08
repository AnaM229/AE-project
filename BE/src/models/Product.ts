import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface ProductAttributes {
    id: number;
    title: string;
    price: number;
    stock: number;
    currency: string;
}

type ProductCreation = Optional<ProductAttributes, "id" | "stock" | "currency">;

export class Product extends Model<ProductAttributes, ProductCreation> implements ProductAttributes {
    public id!: number;
    public title!: string;
    public price!: number;
    public stock!: number;
    public currency!: string;
}

Product.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        currency: { type: DataTypes.STRING, allowNull: false, defaultValue: "RON" }
    },
    { sequelize, modelName: "Product" }
);
