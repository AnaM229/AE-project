import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
    logging: false
});

export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}
