import "dotenv/config";

import express from "express";
import cors from "cors";
import importRoutes from "./routes/import.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/import", importRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 GrowEasy AI CSV Importer Backend Running",
    version: "1.0.0",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});