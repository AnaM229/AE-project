import { sequelize } from "../config/db";
import { User } from "./User";
import { Product } from "./Product";
import { CartItem } from "./CartItem";


User.hasMany(CartItem, {
    foreignKey: "UserId",
    onDelete: "CASCADE",
});
CartItem.belongsTo(User, {
    foreignKey: "UserId",
});

Product.hasMany(CartItem, {
    foreignKey: "ProductId",
    onDelete: "CASCADE",
});
CartItem.belongsTo(Product, {
    foreignKey: "ProductId",
});

export { sequelize, User, Product, CartItem };
