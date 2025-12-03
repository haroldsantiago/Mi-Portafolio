import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {supabase} from "./db.js";

// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/reviews", async (req, res) => {
  try {
    const { data, error } = await supabase.from("reviews").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("🔥 Error en GET /api/reviews:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST: crear review
app.post("/api/reviews", async (req, res) => {
  const { name, comment, rating } = req.body;
  const { data, error } = await supabase
    .from("reviews")
    .insert([{ name, comment, rating }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Servidor en https://mi-portafolio-1tok.onrender.com/${PORT}`));