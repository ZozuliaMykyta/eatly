import dotenv from "dotenv";
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";
import restaurantsRoutes from "./routes/restaurantsRoutes.ts";
import dishesRoutes from "./routes/dishesRoutes.ts";
import GoogleAuthRoute from "./routes/GoogleAuthRoute.ts";
import GoogleUserRoute from "./routes/GoogleUserRoute.ts";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(restaurantsRoutes);
app.use(dishesRoutes);
app.use("/api/auth", GoogleAuthRoute);
app.use("/api/user", GoogleUserRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to the Google OAuth 2.0 + JWT Node.js app!");
});

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (err?: Error) => {
  err ? console.log(err) : console.log(`Server is running on port ${PORT}`);
});
