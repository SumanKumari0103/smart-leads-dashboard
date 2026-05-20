import leadRoutes from "./routes/leadRoutes";
import { authorizeRoles } from "./middleware/roleMiddleware";
import { protect } from "./middleware/authMiddleware";
import authRoutes from "./routes/authRoutes";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
  });
});
app.get(
  "/api/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});