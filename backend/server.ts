import dotenv from "dotenv";
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";
import restaurantsRoutes from "./routes/restaurantsRoutes.ts";
import dishesRoutes from "./routes/dishesRoutes.ts";
import GoogleAuthRoute from "./routes/GoogleAuthRoute.ts";
import ProtectedUserRoute from "./routes/ProtectedUserRoute.ts";
import AuthUserRoute from "./routes/AuthUserRoute.ts";
import userRoute from "./routes/userRoute.ts";
import ArticlesRoute from "./routes/ArticlesRoute.ts";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  })
);
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

app.listen(PORT, (err?: Error) => {
  err ? console.log(err) : console.log(`Server is running on port ${PORT}`);
});
