import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (req, res) => res.json({ msg: "API funcionando" }));
app.use("/api", routes);

// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

export default app;
