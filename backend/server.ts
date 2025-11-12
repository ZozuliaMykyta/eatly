import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import restaurantsRoutes from "./routes/restaurantsRoutes";
import dishesRoutes from "./routes/dishesRoutes";
import GoogleAuthRoute from "./routes/GoogleAuthRoute";
import ProtectedUserRoute from "./routes/ProtectedUserRoute";
import AuthUserRoute from "./routes/AuthUserRoute";
import userRoute from "./routes/userRoute";
import ArticlesRoute from "./routes/ArticlesRoute";

dotenv.config();

const PORT = parseInt(process.env.PORT || "10000", 10);

const app = express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  process.env.FRONTEND_URL,
  "https://moved-duckling-hip.ngrok-free.app",
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Eatly Backend is running!" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use(restaurantsRoutes);
app.use(dishesRoutes);
app.use(userRoute);
app.use("/api/auth", GoogleAuthRoute);
app.use("/api/user", ProtectedUserRoute);
app.use("/api", AuthUserRoute);
app.use(ArticlesRoute);

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
