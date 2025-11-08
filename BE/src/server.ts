import app from "./app";
import { connectDB } from "./config/db";
import { sequelize } from "./models";
import bcrypt from "bcryptjs";
import { User } from "./models";

const PORT = process.env.PORT || 4000;

(async () => {
    await connectDB();
    await sequelize.sync({ alter: true });

    // test admin user creation
    const adminEmail = "admin@test.com";
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });

    if (!existingAdmin) {
        const passwordHash = await bcrypt.hash("admin123", 10);
        await User.create({
            email: adminEmail,
            passwordHash,
            role: "admin",
        });
        console.log("Admin user created:", adminEmail, "/ password: admin123");
    } else {
        console.log("Admin already exists:", adminEmail);
    }


    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})();
