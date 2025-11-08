import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface UserAttributes {
    id: number;
    email: string;
    passwordHash: string;
    role: "user" | "admin";
}

type UserCreation = Optional<UserAttributes, "id" | "role">;

export class User extends Model<UserAttributes, UserCreation> implements UserAttributes {
    public id!: number;
    public email!: string;
    public passwordHash!: string;
    public role!: "user" | "admin";
}

User.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" }
    },
    { sequelize, modelName: "User" }
);
