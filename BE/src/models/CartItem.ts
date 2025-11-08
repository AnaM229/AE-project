import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface CartItemAttributes {
    id: number;
    quantity: number;
    UserId: number;
    ProductId: number;
}

type CartItemCreation = Optional<CartItemAttributes, "id">;

export class CartItem extends Model<CartItemAttributes, CartItemCreation> implements CartItemAttributes {
    public id!: number;
    public quantity!: number;
    public UserId!: number;
    public ProductId!: number;
}

CartItem.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        UserId: { type: DataTypes.INTEGER, allowNull: false },
        ProductId: { type: DataTypes.INTEGER, allowNull: false }
    },
    { sequelize, modelName: "CartItem" }
);

