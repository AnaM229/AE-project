import { sequelize } from "../config/db";
import { User } from "./User";
import { Product } from "./Product";
import { CartItem } from "./CartItem";

User.hasMany(CartItem, { onDelete: "CASCADE" });
CartItem.belongsTo(User);

Product.hasMany(CartItem, { onDelete: "CASCADE" });
CartItem.belongsTo(Product);

export { sequelize, User, Product, CartItem };
