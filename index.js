import express from "express";
import cors from "cors";
import sequelize from "./config/db.js"; 

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (err) {
    console.error("Error al sincronizar modelos:", err.message);
  }
});

