/*import mysql from "mysql2/promise";*/
import dotenv from "dotenv";
import {createClient} from "@supabase/supabase-js";
dotenv.config();

// Crear pool de conexiones con mysql2

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
