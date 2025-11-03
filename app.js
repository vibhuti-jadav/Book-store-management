import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import bookRoutes from "./routers/bookRoutes.js";
import connectDb from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/books", bookRoutes);
app.get("/", (req, res) => res.redirect("/books"));

const startServer = async () => {
  try {
    const connect = await connectDb();

    if (!connect) {
      throw new Error("Failed to connect to the database");
    }

    console.log("✅ Database connected");

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

startServer();
