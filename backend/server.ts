import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import restaurantsRoutes from "./routes/restaurantsRoutes.ts";
import dishesRoutes from "./routes/dishesRoutes.ts";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(restaurantsRoutes);
app.use(dishesRoutes);

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (err?: Error) => {
  err ? console.log(err) : console.log(`Server is running on port ${PORT}`);
});
