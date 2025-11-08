import app from "./app";
import { connectDB } from "./config/db";
import { sequelize } from "./models";

const PORT = process.env.PORT || 4000;

(async () => {
    await connectDB();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})();
