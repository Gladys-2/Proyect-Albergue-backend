import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log("Conexión a PostgreSQL exitosa");
} catch (error) {
  console.error("Error de conexión:", error.message);
}

export default sequelize;